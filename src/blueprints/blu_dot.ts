import {float} from "../../common/random.js";
import {bounce} from "../components/com_bounce.js";
import {collide} from "../components/com_collide.js";
import {draw_circle} from "../components/com_draw.js";
import {health} from "../components/com_health.js";
import {move} from "../components/com_move.js";
import {wander} from "../components/com_wander.js";
import {Blueprint2D} from "../core.js";
import {Game} from "../game.js";

export function blu_dot(game: Game): Blueprint2D {
    return {
        Translation: [float(0, game.CanvasScene.width), float(0, game.CanvasScene.height)],
        Rotation: float(0, Math.PI * 2),
        Using: [
            draw_circle(game.State.DotRadius),
            collide(game.State.DotRadius),
            move(game.State.MoveSpeed),
            bounce(),
            wander(),
            health(),
        ],
    };
}
