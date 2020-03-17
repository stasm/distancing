import {Action} from "../actions.js";
import {Game} from "../game.js";
import {html} from "./html.js";

export function DotRadius(game: Game) {
    return html`
        <label style="display: flex; align-items: center; margin-right: 30px;">
            Dot Radius: ${game.DotRadius}px
            <input
                type="range"
                min="1"
                max="10"
                value="${game.DotRadius}"
                onchange="$(${Action.SetDotRadius}, parseFloat(this.value))"
                style="margin-left: 10px;"
            />
        </label>
    `;
}
