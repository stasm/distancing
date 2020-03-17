import {Game} from "../game.js";

let w = 1;

export function sys_draw_histogram(game: Game, delta: number) {
    game.ContextHisto.fillStyle = "#f8f8f8";
    game.ContextHisto.fillRect(0, 0, game.CanvasHisto.width, game.CanvasHisto.height);

    for (let i = 0; i < game.Statistics.length; i++) {
        let count = game.Statistics[i];

        let vulnerable = (count[0] / game.State.Population) * game.CanvasHisto.height;
        let infected = (count[1] / game.State.Population) * game.CanvasHisto.height;
        let recovered = (count[2] / game.State.Population) * game.CanvasHisto.height;

        game.ContextHisto.fillStyle = game.ColorRecovered;
        game.ContextHisto.fillRect(i * w, 0, w, recovered);

        game.ContextHisto.fillStyle = game.ColorVulnerable;
        game.ContextHisto.fillRect(i * w, recovered, w, vulnerable);

        game.ContextHisto.fillStyle = game.ColorInfected;
        game.ContextHisto.fillRect(i * w, recovered + vulnerable, w, infected);
    }
}
