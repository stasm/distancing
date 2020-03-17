import {Action} from "../actions.js";
import {Game} from "../game.js";
import {html} from "./html.js";

export function RecoveryTime(game: Game) {
    return html`
        <label>
            <span>
                Recovery Time: ${game.RecoveryTime}s
            </span>
            <input
                type="range"
                min="1"
                max="30"
                value="${game.RecoveryTime}"
                onchange="$(${Action.SetRecoveryTime}, parseInt(this.value))"
            />
        </label>
    `;
}
