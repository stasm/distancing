import {Game} from "./game.js";
import {scene_stage} from "./scenes/sce_stage.js";

export const enum Action {
    SetPopulation,
}

export function dispatch(game: Game, action: Action, args: unknown) {
    switch (action) {
        case Action.SetPopulation: {
            let population = args as number;
            game.Population = population;
            requestAnimationFrame(() => scene_stage(game));
            break;
        }
    }
}
