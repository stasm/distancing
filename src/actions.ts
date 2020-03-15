import {Has} from "./components/com_index.js";
import {Game} from "./game.js";
import {scene_stage} from "./scenes/sce_stage.js";

export const enum Action {
    SetPopulation,
    SetDistancingRatio,
}

export function dispatch(game: Game, action: Action, args: unknown) {
    switch (action) {
        case Action.SetPopulation: {
            let population = args as number;
            game.Population = population;
            requestAnimationFrame(() => scene_stage(game));
            break;
        }
        case Action.SetDistancingRatio: {
            let ratio = args as number;
            game.DistancingRatio = ratio;
            let partition_index = game.Population * game.DistancingRatio;
            requestAnimationFrame(() => {
                for (let e = 0; e < game.World.Mask.length; e++) {
                    if (game.World.Mask[e] & Has.ControlBall) {
                        if (e < partition_index) {
                            game.World.Mask[e] &= ~Has.Move;
                        } else {
                            game.World.Mask[e] |= Has.Move;
                        }
                    }
                }
            });
            break;
        }
    }
}
