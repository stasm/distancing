import {Collide} from "./components/com_collide.js";
import {ControlBall} from "./components/com_control_ball.js";
import {Draw} from "./components/com_draw.js";
import {Move} from "./components/com_move.js";
import {Transform2D} from "./components/com_transform2d.js";

export class World {
    // Component flags
    Mask: Array<number> = [];
    // Component data
    Collide: Array<Collide> = [];
    ControlBall: Array<ControlBall> = [];
    Draw: Array<Draw> = [];
    Move: Array<Move> = [];
    Transform2D: Array<Transform2D> = [];
}
