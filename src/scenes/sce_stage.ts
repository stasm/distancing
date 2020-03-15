import {float, set_seed} from "../../common/random.js";
import {collide} from "../components/com_collide.js";
import {control_ball} from "../components/com_control_ball.js";
import {draw_circle} from "../components/com_draw.js";
import {move} from "../components/com_move.js";
import {instantiate} from "../core.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();
    set_seed(Date.now());

    for (let i = 0; i < 200; i++) {
        instantiate(game, {
            Translation: [float(0, game.ViewportWidth), float(0, game.ViewportHeight)],
            Using: [
                draw_circle(10, "red"),
                collide(10),
                move(200),
                control_ball(float(0, Math.PI * 2)),
            ],
        });
    }
}
