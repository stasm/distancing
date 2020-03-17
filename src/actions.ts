import {clamp} from "../common/number.js";
import {Has} from "./components/com_index.js";
import {Game} from "./game.js";
import {SimulationParams, write_to_url} from "./params.js";
import {scene_stage} from "./scenes/sce_stage.js";

export type State = typeof SimulationParams;
export const enum Action {
    SetPopulation,
    SetDotRadius,
    SetRecoveryTime,
    SetMoveSpeed,
    SetDistancing,
    Reset,
}

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.SetPopulation: {
            game.State.Population = clamp(payload as number, 1, 1000);
            write_to_url(game.State);
            requestAnimationFrame(() => scene_stage(game));
            break;
        }
        case Action.SetDotRadius: {
            game.State.DotRadius = clamp(payload as number, 1, 10);
            write_to_url(game.State);
            requestAnimationFrame(() => set_all_dot_radius(game));
            break;
        }
        case Action.SetRecoveryTime: {
            game.State.RecoveryTime = clamp(payload as number, 1, 30);
            write_to_url(game.State);
            break;
        }
        case Action.SetMoveSpeed: {
            game.State.MoveSpeed = clamp(payload as number, 1, 100);
            write_to_url(game.State);
            requestAnimationFrame(() => set_all_move_speed(game));
            break;
        }
        case Action.SetDistancing: {
            game.State.Distancing = clamp(payload as number, 0, 1);
            write_to_url(game.State);
            requestAnimationFrame(() => set_all_distancing(game));
            break;
        }
        case Action.Reset: {
            game.State = {...SimulationParams};
            write_to_url(game.State);
            requestAnimationFrame(() => scene_stage(game));
        }
    }
}

function set_all_dot_radius(game: Game) {
    for (let e = 0; e < game.World.Mask.length; e++) {
        if (game.World.Mask[e] & Has.Draw) {
            game.World.Draw[e].Radius = game.State.DotRadius;
        }
        if (game.World.Mask[e] & Has.Collide) {
            game.World.Collide[e].Radius = game.State.DotRadius;
        }
    }
}

function set_all_move_speed(game: Game) {
    for (let e = 0; e < game.World.Mask.length; e++) {
        if (game.World.Move[e]) {
            game.World.Move[e].Speed = game.State.MoveSpeed;
        }
    }
}

function set_all_distancing(game: Game) {
    let partition_index = game.State.Population * game.State.Distancing;
    for (let e = 0; e < game.World.Mask.length; e++) {
        if (game.World.Mask[e] & Has.Bounce) {
            if (e < partition_index) {
                game.World.Mask[e] &= ~Has.Move;
            } else {
                game.World.Mask[e] |= Has.Move;
            }
        }
    }
}
