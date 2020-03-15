import {Entity, Game} from "../game.js";
import {Has} from "./com_index.js";

export type Draw = DrawCircle;

export const enum DrawKind {
    Circle,
}

export interface DrawCircle {
    Kind: DrawKind.Circle;
    Radius: number;
    Color: string;
}

export function draw_circle(radius: number, color: string) {
    return (game: Game, entity: Entity) => {
        game.World.Mask[entity] |= Has.Draw;
        game.World.Draw[entity] = {
            Kind: DrawKind.Circle,
            Radius: radius,
            Color: color,
        };
    };
}
