import {Action, State} from "../actions.js";
import {html} from "./html.js";

export function DotRadius(state: State) {
    return html`
        <label>
            <span>
                Dot Radius: ${state.DotRadius}px
            </span>
            <input
                type="range"
                min="1"
                max="10"
                value="${state.DotRadius}"
                onchange="$(${Action.SetDotRadius}, parseFloat(this.value))"
            />
        </label>
    `;
}
