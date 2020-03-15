import {Has} from "../components/com_index.js";
import {destroy} from "../core.js";
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
    let collide = game.World.Collide[entity];
    if (collide.Collisions.length > 0) {
        destroy(game.World, entity);
    }
}
