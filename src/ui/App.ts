import {Action} from "../actions.js";
import {Game} from "../game.js";
import {DistancingRatio} from "./DistancingRatio.js";
import {html} from "./html.js";
import {MoveSpeed} from "./MoveSpeed.js";
import {Population} from "./Population.js";
import {RecoveryTime} from "./RecoveryTime.js";

export function App(game: Game) {
    return html`
        <div
            style="
                display: flex;
                justify-content: space-between;
                padding: 5px;
                font: 13px Arial, sans-serif;
            "
        >
            <div style="flex: 1; display: flex; flex-wrap: wrap;">
                ${Population(game)} ${RecoveryTime(game)} ${MoveSpeed(game)}
                ${DistancingRatio(game)}
            </div>
            <button onclick="$(${Action.SetPopulation}, ${game.Population})">
                Restart
            </button>
        </div>
    `;
}
