import {get_translation} from "../../common/mat2d.js";
import {distance} from "../../common/vec2.js";
import {Collide} from "../components/com_collide.js";
import {Has} from "../components/com_index.js";
import {Game} from "../game.js";

const QUERY = Has.Transform2D | Has.Collide;

export function sys_collide(game: Game, delta: number) {
    // Collect all colliders.
    let all_colliders: Collide[] = [];
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) === QUERY) {
            let transform = game.World.Transform2D[i];
            let collider = game.World.Collide[i];

            // Prepare the collider for this tick.
            collider.Collisions = [];
            get_translation(collider.Center, transform.World);
            all_colliders.push(collider);
        }
    }

    for (let i = 0; i < all_colliders.length; i++) {
        check_collisions(all_colliders[i], all_colliders);
    }
}

function check_collisions(collider: Collide, colliders: Collide[]) {
    for (let i = 0; i < colliders.length; i++) {
        let other = colliders[i];
        if (other !== collider && intersect(collider, other)) {
            collider.Collisions.push(other);
        }
    }
}

function intersect(a: Collide, b: Collide) {
    return distance(a.Center, b.Center) < a.Radius + b.Radius;
}
