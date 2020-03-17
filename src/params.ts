import {clamp} from "../common/number.js";

export interface SimulationParams {
    Population: number;
    DotRadius: number;
    RecoveryTime: number;
    MoveSpeed: number;
    Distancing: number;
}

export function read_from_url(params: SimulationParams) {
    let search = new URL(document.location.href).searchParams;
    let value;

    value = search.get("Population");
    if (value !== null) {
        value = parseInt(value);
        if (!Number.isNaN(value)) {
            params.Population = clamp(value, 1, 1000);
        }
    }

    value = search.get("DotRadius");
    if (value !== null) {
        value = parseInt(value);
        if (!Number.isNaN(value)) {
            params.DotRadius = clamp(value, 1, 10);
        }
    }

    value = search.get("RecoveryTime");
    if (value !== null) {
        value = parseInt(value);
        if (!Number.isNaN(value)) {
            params.RecoveryTime = clamp(value, 1, 30);
        }
    }

    value = search.get("MoveSpeed");
    if (value !== null) {
        value = parseInt(value);
        if (!Number.isNaN(value)) {
            params.MoveSpeed = clamp(value, 1, 100);
        }
    }

    value = search.get("Distancing");
    if (value !== null) {
        value = parseInt(value);
        if (!Number.isNaN(value)) {
            params.Distancing = clamp(value, 0, 1);
        }
    }
}

export function write_to_url(params: SimulationParams) {
    let url = new URL(document.location.href);
    url.searchParams.set("Population", params.Population.toString());
    url.searchParams.set("DotRadius", params.DotRadius.toString());
    url.searchParams.set("RecoveryTime", params.RecoveryTime.toString());
    url.searchParams.set("MoveSpeed", params.MoveSpeed.toString());
    url.searchParams.set("Distancing", (params.Distancing * 100).toFixed(0));
    history.replaceState(params, "Distancing", "?" + url.searchParams.toString());
}
