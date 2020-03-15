import {Action} from "../actions.js";
import {Game} from "../game.js";
import {DistancingRatio} from "./DistancingRatio.js";
import {html} from "./html.js";
import {Population} from "./Population.js";
import {RecoveryTime} from "./RecoveryTime.js";

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
            <div style="flex: 1; display: flex; flex-wrap: wrap;">
                ${Population(game)} ${DistancingRatio(game)} ${RecoveryTime(game)}
            </div>
            <button
                onclick="$(${Action.SetPopulation}, ${game.Population})"
                style="margin-left: 30px;"
            >
                Restart
            </button>
        </div>
    `;
}
