import {Action} from "../actions.js";
import {Game} from "../game.js";
import {html} from "./html.js";

export function MoveSpeed(game: Game) {
    return html`
        <label style="display: flex; align-items: center; margin-right: 30px;">
            Movement: ${game.MoveSpeed}px/s
            <input
                type="range"
                min="1"
                max="100"
                value="${game.MoveSpeed}"
                onchange="$(${Action.SetMoveSpeed}, parseFloat(this.value))"
                style="margin-left: 10px;"
            />
        </label>
    `;
}
