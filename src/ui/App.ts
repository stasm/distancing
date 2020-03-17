import {Action, State} from "../actions.js";
import {DistancingRatio} from "./DistancingRatio.js";
import {DotRadius} from "./DotRadius.js";
import {html} from "./html.js";
import {MoveSpeed} from "./MoveSpeed.js";
import {Population} from "./Population.js";
import {RecoveryTime} from "./RecoveryTime.js";

export function App(state: State) {
    return html`
        <div>
            <div>
                ${Population(state)} ${DotRadius(state)} ${RecoveryTime(state)} ${MoveSpeed(state)}
                ${DistancingRatio(state)}
            </div>
            <div style="margin-top: 20px;">
                <button onclick="$(${Action.SetPopulation}, ${state.Population})">
                    Restart Simulation
                </button>
            </div>
        </div>
    `;
}
