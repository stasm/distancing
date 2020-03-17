import {Action} from "../actions.js";
import {Game} from "../game.js";
import {html} from "./html.js";

export function Population(game: Game) {
    return html`
        <label>
            <span>
                Population: ${game.Population}
            </span>
            <input
                type="range"
                min="1"
                max="1000"
                value="${game.Population}"
                onchange="$(${Action.SetPopulation}, parseInt(this.value))"
            />
        </label>
    `;
}
