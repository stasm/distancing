import {Action} from "../actions.js";
import {Game} from "../game.js";
import {html} from "./html.js";

export function DistancingRatio(game: Game) {
    return html`
        <label style="display: flex; align-items: center; margin-right: 30px;">
            Distancing: ${Math.round(game.DistancingRatio * 100)}%
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value="${game.DistancingRatio}"
                onchange="$(${Action.SetDistancingRatio}, parseFloat(this.value))"
                style="margin-left: 10px;"
            />
        </label>
    `;
}
