import {Action, State} from "../actions.js";
import {html} from "./html.js";

export function MoveSpeed(state: State) {
    return html`
        <label>
            <span>
                Movement: ${state.MoveSpeed}px/s
            </span>
            <input
                type="range"
                min="1"
                max="100"
                value="${state.MoveSpeed}"
                onchange="$(${Action.SetMoveSpeed}, parseFloat(this.value))"
            />
        </label>
    `;
}
