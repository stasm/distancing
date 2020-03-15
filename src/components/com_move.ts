import {Vec2} from "../../common/math.js";
import {Entity, Game} from "../game.js";
import {Has} from "./com_index.js";

export interface Move {
    Direction: Vec2;
    Speed: number;
}

export function move(Speed: number) {
    return (game: Game, entity: Entity) => {
        game.World.Mask[entity] |= Has.Move;
        game.World.Move[entity] = <Move>{
            Direction: [0, 0],
            Speed,
        };
    };
}
