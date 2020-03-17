import {Has} from "./components/com_index.js";
import {Game} from "./game.js";
import {params_write} from "./params.js";
import {scene_stage} from "./scenes/sce_stage.js";

export const enum Action {
    SetPopulation,
    SetDotRadius,
    SetRecoveryTime,
    SetMoveSpeed,
    SetDistancing,
    WriteParams,
}

export function dispatch(game: Game, action: Action, args: unknown) {
    switch (action) {
        case Action.SetPopulation: {
            let population = args as number;
            game.Population = population;
            requestAnimationFrame(() => scene_stage(game));
            break;
        }
        case Action.SetDotRadius: {
            let radius = args as number;
            game.DotRadius = radius;
            requestAnimationFrame(() => {
                for (let e = 0; e < game.World.Mask.length; e++) {
                    if (game.World.Mask[e] & Has.Draw) {
                        game.World.Draw[e].Radius = game.DotRadius;
                    }
                    if (game.World.Mask[e] & Has.Collide) {
                        game.World.Collide[e].Radius = game.DotRadius;
                    }
                }
            });
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
        case Action.SetDistancing: {
            let ratio = args as number;
            game.Distancing = ratio;
            let partition_index = game.Population * game.Distancing;
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
        case Action.WriteParams: {
            let url = params_write(game);
            history.pushState({}, "Distancing", "?" + url.searchParams.toString());
        }
    }
}
