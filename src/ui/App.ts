import {Action} from "../actions.js";
import {Game} from "../game.js";
import {html} from "./html.js";

export function App(game: Game) {
    return html`
        <div
            style="
                position: absolute;
                padding: 5px;
                background: black;
                color: white;
                font: 12px monospace;
            "
        >
            <label style="display: flex; align-items: center;">
                Population: ${game.Population}
                <input
                    type="range"
                    min="1"
                    max="1000"
                    value="${game.Population}"
                    onchange="$(${Action.SetPopulation}, this.value)"
                    style="margin-left: 10px;"
                />
            </label>
        </div>
    `;
}
