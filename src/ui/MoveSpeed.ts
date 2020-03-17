import {Action} from "../actions.js";
import {Game} from "../game.js";
import {html} from "./html.js";

export function MoveSpeed(game: Game) {
    return html`
        <label>
            <span>
                Movement: ${game.MoveSpeed}px/s
            </span>
            <input
                type="range"
                min="1"
                max="100"
                value="${game.MoveSpeed}"
                onchange="$(${Action.SetMoveSpeed}, parseFloat(this.value))"
            />
        </label>
    `;
}
