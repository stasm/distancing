import {Action, State} from "../actions.js";
import {html} from "./html.js";

export function Population(state: State) {
    return html`
        <label>
            <span>
                Population: ${state.Population}
            </span>
            <input
                type="range"
                min="1"
                max="1000"
                value="${state.Population}"
                onchange="$(${Action.SetPopulation}, parseInt(this.value))"
            />
        </label>
    `;
}
