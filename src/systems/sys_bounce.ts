import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform2D | Has.Bounce;

export function sys_bounce(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let transform = game.World.Transform2D[entity];

    if (transform.Translation[0] < 0) {
        transform.Translation[0] = 0;
        transform.Rotation = Math.PI - transform.Rotation;
        transform.Dirty = true;
    }

    if (transform.Translation[0] > game.CanvasScene.width) {
        transform.Translation[0] = game.CanvasScene.width;
        transform.Rotation = Math.PI - transform.Rotation;
        transform.Dirty = true;
    }

    if (transform.Translation[1] < 0) {
        transform.Translation[1] = 0;
        transform.Rotation = -transform.Rotation;
        transform.Dirty = true;
    }

    if (transform.Translation[1] > game.CanvasScene.height) {
        transform.Translation[1] = game.CanvasScene.height;
        transform.Rotation = -transform.Rotation;
        transform.Dirty = true;
    }
}
