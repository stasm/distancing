import {DrawCircle, DrawKind} from "../components/com_draw.js";
import {Has} from "../components/com_index.js";
import {Game} from "../game.js";

const QUERY = Has.Transform2D | Has.Draw;

export function sys_draw_scene(game: Game, delta: number) {
    game.ContextScene.resetTransform();
    game.ContextScene.fillStyle = game.ClearColor;
    game.ContextScene.fillRect(0, 0, game.CanvasScene.width, game.CanvasScene.height);

    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            let transform = game.World.Transform2D[i];
            game.ContextScene.setTransform(
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

function draw_circle(game: Game, draw: DrawCircle) {
    game.ContextScene.fillStyle = draw.Color;
    game.ContextScene.beginPath();
    game.ContextScene.arc(0, 0, draw.Radius, 0, 2 * Math.PI);
    game.ContextScene.closePath();
    game.ContextScene.fill();
}
