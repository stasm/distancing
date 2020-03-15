import {draw_circle} from "../components/com_draw.js";
import {move} from "../components/com_move.js";
import {instantiate} from "../core.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();

    instantiate(game, {
        Translation: [game.ViewportWidth / 2, game.ViewportHeight / 2],
        Using: [draw_circle(10, "red"), move(50)],
    });
}
