import {Action} from "../actions.js";
import {Game} from "../game.js";
import {DistancingRatio} from "./DistancingRatio.js";
import {html} from "./html.js";
import {Population} from "./Population.js";

export function App(game: Game) {
    return html`
        <div
            style="
                display: flex;
                justify-content: space-between;
                padding: 5px;
                font: 12px monospace;
            "
        >
            <div style="display: flex;">
                ${Population(game)} ${DistancingRatio(game)}
            </div>
            <button onclick="$(${Action.SetPopulation}, ${game.Population})">
                Restart
            </button>
        </div>
    `;
}
