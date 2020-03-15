import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Health | Has.Collide;

export function sys_health(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let health = game.World.Health[entity];
    if (health.State === "infected") {
        let collide = game.World.Collide[entity];
        for (let i = 0; i < collide.Collisions.length; i++) {
            let other = collide.Collisions[i];
            game.World.Health[other.EntityId].State = "infected";
            game.World.Draw[other.EntityId].Color = "red";
        }
    }
}
