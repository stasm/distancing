import {Action} from "../actions.js";
import {Game} from "../game.js";
import {html} from "./html.js";

export function RecoveryTime(game: Game) {
    return html`
        <label style="display: flex; align-items: center;">
            Recovery Time: ${game.RecoveryTime}s
            <input
                type="range"
                min="1"
                max="30"
                value="${game.RecoveryTime}"
                onchange="$(${Action.SetRecoveryTime}, parseInt(this.value))"
                style="margin-left: 10px;"
            />
        </label>
    `;
}
