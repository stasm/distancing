import {Action} from "../actions.js";
import {Game} from "../game.js";
import {html} from "./html.js";

export function DistancingRatio(game: Game) {
    return html`
        <label>
            <span>
                Distancing: ${Math.round(game.Distancing * 100)}%
            </span>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value="${game.Distancing}"
                onchange="$(${Action.SetDistancing}, parseFloat(this.value))"
            />
        </label>
    `;
}
