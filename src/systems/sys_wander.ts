import {float} from "../../common/random.js";
import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform2D | Has.Wander;

export function sys_wander(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let transform = game.World.Transform2D[entity];
    // Randomize the direction slightly to avoid linear paths.
    transform.Rotation += float(-0.1, 0.1);
    transform.Dirty = true;
}
