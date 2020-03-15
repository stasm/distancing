import {float} from "../../common/random.js";
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
    let bounced = false;

    if (transform.Translation[0] < 0) {
        transform.Translation[0] = 0;
        control.Direction[0] = -control.Direction[0];
        bounced = true;
    }

    if (transform.Translation[0] > game.CanvasScene.width) {
        transform.Translation[0] = game.CanvasScene.width;
        control.Direction[0] = -control.Direction[0];
        bounced = true;
    }

    if (transform.Translation[1] < 0) {
        transform.Translation[1] = 0;
        control.Direction[1] = -control.Direction[1];
        bounced = true;
    }

    if (transform.Translation[1] > game.CanvasScene.height) {
        transform.Translation[1] = game.CanvasScene.height;
        control.Direction[1] = -control.Direction[1];
        bounced = true;
    }

    if (!bounced) {
        // Randomize the direction slightly to avoid linear paths.
        control.Direction[0] += float(-0.1, 0.1);
        control.Direction[1] += float(-0.1, 0.1);
        normalize(control.Direction, control.Direction);
    }

    let move = game.World.Move[entity];
    move.Direction[0] = control.Direction[0];
    move.Direction[1] = control.Direction[1];
    normalize(move.Direction, move.Direction);
}
