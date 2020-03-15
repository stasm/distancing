import {Has} from "../components/com_index.js";
import {Game} from "../game.js";

const QUERY = Has.Health;

let since_last = 0;

export function sys_snapshot(game: Game, delta: number) {
    since_last += delta;
    if (since_last > 0.06) {
        since_last = 0;

        let counts: [number, number, number] = [0, 0, 0];
        for (let i = 0; i < game.World.Mask.length; i++) {
            if ((game.World.Mask[i] & QUERY) == QUERY) {
                let health = game.World.Health[i];
                switch (health.State) {
                    case "vulnerable":
                        counts[0]++;
                        break;
                    case "infected":
                        counts[1]++;
                        break;
                    case "recovered":
                        counts[2]++;
                        break;
                }
            }
        }

        game.Statistics.push(counts);
    }
}
