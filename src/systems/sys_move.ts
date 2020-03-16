import {Vec2} from "../../common/math.js";
import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform2D | Has.Move;

export function sys_move(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

let forward: Vec2 = [0, 0];

function update(game: Game, entity: Entity, delta: number) {
    let transform = game.World.Transform2D[entity];
    let move = game.World.Move[entity];
    forward[0] = transform.World[0];
    forward[1] = transform.World[1];
    transform.Translation[0] += forward[0] * move.Speed * delta;
    transform.Translation[1] += forward[1] * move.Speed * delta;
    transform.Dirty = true;
}
