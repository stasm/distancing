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
        health.SinceInfection += delta;
        if (health.SinceInfection > game.RecoveryTime) {
            health.State = "recovered";
            game.World.Draw[entity].Color = game.ColorRecovered;
            game.World.Mask[entity] &= ~Has.Collide;
            return;
        }

        let collide = game.World.Collide[entity];
        for (let i = 0; i < collide.Collisions.length; i++) {
            let other = collide.Collisions[i];
            let health = game.World.Health[other.EntityId];
            if (health.State === "vulnerable") {
                game.World.Health[other.EntityId].State = "infected";
                game.World.Draw[other.EntityId].Color = game.ColorInfected;
            }
        }
    }
}
