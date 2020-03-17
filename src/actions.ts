import {Has} from "./components/com_index.js";
import {Game} from "./game.js";
import {scene_stage} from "./scenes/sce_stage.js";

export const enum Action {
    SetPopulation,
    SetRecoveryTime,
    SetMoveSpeed,
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
        case Action.SetRecoveryTime: {
            let time = args as number;
            game.RecoveryTime = time;
            break;
        }
        case Action.SetMoveSpeed: {
            let speed = args as number;
            game.MoveSpeed = speed;
            requestAnimationFrame(() => {
                for (let e = 0; e < game.World.Mask.length; e++) {
                    if (game.World.Move[e]) {
                        game.World.Move[e].Speed = game.MoveSpeed;
                    }
                }
            });
            break;
        }
        case Action.SetDistancingRatio: {
            let ratio = args as number;
            game.DistancingRatio = ratio;
            let partition_index = game.Population * game.DistancingRatio;
            requestAnimationFrame(() => {
                for (let e = 0; e < game.World.Mask.length; e++) {
                    if (game.World.Mask[e] & Has.Bounce) {
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
