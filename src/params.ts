import {clamp} from "../common/number.js";
import {Game} from "./game.js";

export interface SimulationParams {
    Population: number;
    DotRadius: number;
    RecoveryTime: number;
    MoveSpeed: number;
    Distancing: number;
}

declare global {
    interface URLSearchParams {
        [Symbol.iterator](): IterableIterator<[string, string]>;
    }
}

export function params_read(game: Game) {
    let url = new URL(document.location.href);
    for (let [name, value] of url.searchParams) {
        switch (name) {
            case "Population":
                game.Population = clamp(parseInt(value), 1, 1000);
                break;
            case "DotRadius":
                game.DotRadius = clamp(parseInt(value), 1, 10);
                break;
            case "RecoveryTime":
                game.RecoveryTime = clamp(parseInt(value), 1, 30);
                break;
            case "MoveSpeed":
                game.MoveSpeed = clamp(parseInt(value), 1, 100);
                break;
            case "Distancing":
                game.Distancing = clamp(parseInt(value), 0, 100) / 100;
                break;
        }
    }
}

export function params_write(game: Game) {
    let url = new URL(document.location.href);
    url.searchParams.set("Population", game.Population.toString());
    url.searchParams.set("DotRadius", game.DotRadius.toString());
    url.searchParams.set("RecoveryTime", game.RecoveryTime.toString());
    url.searchParams.set("MoveSpeed", game.MoveSpeed.toString());
    url.searchParams.set("Distancing", (game.Distancing * 100).toFixed(0));
    return url;
}
