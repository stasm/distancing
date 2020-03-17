import {set_seed} from "../../common/random.js";
import {blu_dot} from "../blueprints/blu_dot.js";
import {Has} from "../components/com_index.js";
import {instantiate} from "../core.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();
    game.Statistics = [];
    set_seed(Date.now());

    for (let i = 0; i < game.Population - 1; i++) {
        instantiate(game, blu_dot(game));
    }

    let patient0 = instantiate(game, blu_dot(game));
    game.World.Health[patient0].State = "infected";
    game.World.Draw[patient0].Color = game.ColorInfected;

    for (let e = 0; e < game.Population * game.Distancing; e++) {
        if (game.World.Mask[e] & Has.Bounce) {
            game.World.Mask[e] &= ~Has.Move;
        }
    }
}
