import {Action} from "../actions.js";
import {Game} from "../game.js";
import {html} from "./html.js";

export function DotRadius(game: Game) {
    return html`
        <label>
            <span>
                Dot Radius: ${game.DotRadius}px
            </span>
            <input
                type="range"
                min="1"
                max="10"
                value="${game.DotRadius}"
                onchange="$(${Action.SetDotRadius}, parseFloat(this.value))"
            />
        </label>
    `;
}
