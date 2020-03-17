import {Action, State} from "../actions.js";
import {html} from "./html.js";

export function DistancingRatio(state: State) {
    return html`
        <label>
            <span>
                Distancing: ${Math.round(state.Distancing * 100)}%
            </span>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value="${state.Distancing}"
                onchange="$(${Action.SetDistancing}, parseFloat(this.value))"
            />
        </label>
    `;
}
