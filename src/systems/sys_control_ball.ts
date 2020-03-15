import {normalize} from "../../common/vec2.js";
import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform2D | Has.ControlBall | Has.Move;

export function sys_control_ball(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let control = game.World.ControlBall[entity];
    let transform = game.World.Transform2D[entity];

    if (transform.Translation[0] < 0) {
        transform.Translation[0] = 0;
        control.Direction[0] = -control.Direction[0];
    }

    if (transform.Translation[0] > game.ViewportWidth) {
        transform.Translation[0] = game.ViewportWidth;
        control.Direction[0] = -control.Direction[0];
    }

    if (transform.Translation[1] < 0) {
        transform.Translation[1] = 0;
        control.Direction[1] = -control.Direction[1];
    }

    if (transform.Translation[1] > game.ViewportHeight) {
        transform.Translation[1] = game.ViewportHeight;
        control.Direction[1] = -control.Direction[1];
    }

    let move = game.World.Move[entity];
    move.Direction[0] = control.Direction[0];
    move.Direction[1] = control.Direction[1];
    normalize(move.Direction, move.Direction);
}
