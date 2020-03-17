import {Action} from "../actions.js";
import {Game} from "../game.js";
import {DistancingRatio} from "./DistancingRatio.js";
import {DotRadius} from "./DotRadius.js";
import {html} from "./html.js";
import {MoveSpeed} from "./MoveSpeed.js";
import {Population} from "./Population.js";
import {RecoveryTime} from "./RecoveryTime.js";

export function App(game: Game) {
    return html`
        <div>
            <div>
                ${Population(game)} ${DotRadius(game)} ${RecoveryTime(game)} ${MoveSpeed(game)}
                ${DistancingRatio(game)}
            </div>
            <div style="margin-top: 20px;">
                <button onclick="$(${Action.SetPopulation}, ${game.Population})">
                    Restart Simulation
                </button>
            </div>
        </div>
    `;
}
