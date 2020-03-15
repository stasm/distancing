import {Game} from "../game.js";
import {DistancingRatio} from "./DistancingRatio.js";
import {html} from "./html.js";
import {Population} from "./Population.js";

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
            ${Population(game)} ${DistancingRatio(game)}
        </div>
    `;
}
