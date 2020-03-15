import {float, set_seed} from "../../common/random.js";
import {collide} from "../components/com_collide.js";
import {control_ball} from "../components/com_control_ball.js";
import {draw_circle} from "../components/com_draw.js";
import {health} from "../components/com_health.js";
import {move} from "../components/com_move.js";
import {instantiate} from "../core.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();
    set_seed(Date.now());

    for (let i = 0; i < 1000; i++) {
        instantiate(game, {
            Translation: [float(0, game.ViewportWidth), float(0, game.ViewportHeight)],
            Using: [
                draw_circle(5),
                collide(5),
                move(100),
                control_ball(float(0, Math.PI * 2)),
                health(),
            ],
        });
    }

    let patient0 = instantiate(game, {
        Translation: [float(0, game.ViewportWidth), float(0, game.ViewportHeight)],
        Using: [
            draw_circle(5),
            collide(5),
            move(100),
            control_ball(float(0, Math.PI * 2)),
            health(),
        ],
    });
    game.World.Health[patient0].State = "infected";
    game.World.Draw[patient0].Color = "red";
}
