import {Action} from "../actions.js";
import {Game} from "../game.js";
import {html} from "./html.js";

export function Population(game: Game) {
    return html`
        <label style="display: flex; align-items: center;">
            Population: ${game.Population}
            <input
                type="range"
                min="1"
                max="1000"
                value="${game.Population}"
                onchange="$(${Action.SetPopulation}, parseInt(this.value))"
                style="margin-left: 10px;"
            />
        </label>
    `;
}
