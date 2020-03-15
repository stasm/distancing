import {Entity, Game} from "../game.js";
import {Has} from "./com_index.js";

export interface Health {
    State: "vulnerable" | "infected" | "recovered";
}

export function health() {
    return (game: Game, entity: Entity) => {
        game.World.Mask[entity] |= Has.Health;
        game.World.Health[entity] = {
            State: "vulnerable",
        };
    };
}
