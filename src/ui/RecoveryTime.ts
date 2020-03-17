import {Action, State} from "../actions.js";
import {html} from "./html.js";

export function RecoveryTime(state: State) {
    return html`
        <label>
            <span>
                Recovery Time: ${state.RecoveryTime}s
            </span>
            <input
                type="range"
                min="1"
                max="30"
                value="${state.RecoveryTime}"
                onchange="$(${Action.SetRecoveryTime}, parseInt(this.value))"
            />
        </label>
    `;
}
