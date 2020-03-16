import {Collide} from "./components/com_collide.js";
import {Draw} from "./components/com_draw.js";
import {Health} from "./components/com_health.js";
import {Move} from "./components/com_move.js";
import {Transform2D} from "./components/com_transform2d.js";

export class World {
    // Component flags
    Mask: Array<number> = [];
    // Component data
    Collide: Array<Collide> = [];
    Draw: Array<Draw> = [];
    Health: Array<Health> = [];
    Move: Array<Move> = [];
    Transform2D: Array<Transform2D> = [];
}
