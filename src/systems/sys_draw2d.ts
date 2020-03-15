import {Draw, DrawKind} from "../components/com_draw.js";
import {Has} from "../components/com_index.js";
import {Game} from "../game.js";

const QUERY = Has.Transform2D | Has.Draw;

export function sys_draw2d(game: Game, delta: number) {
    game.Context2D.resetTransform();
    game.Context2D.fillStyle = game.ClearColor;
    game.Context2D.fillRect(0, 0, game.ViewportWidth, game.ViewportHeight);

    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            let transform = game.World.Transform2D[i];
            game.Context2D.setTransform(
                transform.World[0],
                transform.World[1],
                transform.World[2],
                transform.World[3],
                transform.World[4],
                transform.World[5]
            );

            let draw = game.World.Draw[i];
            switch (draw.Kind) {
                case DrawKind.Circle:
                    draw_circle(game, draw);
                    break;
            }
        }
    }
}

function draw_circle(game: Game, draw: Draw) {
    game.Context2D.fillStyle = draw.Color;
    game.Context2D.beginPath();
    game.Context2D.arc(0, 0, draw.Radius, 0, 2 * Math.PI);
    game.Context2D.closePath();
    game.Context2D.fill();
}
