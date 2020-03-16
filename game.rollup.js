(function () {
    'use strict';

    let seed = 1;
    function set_seed(new_seed) {
        seed = 198706 * new_seed;
    }
    function rand() {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    }
    function float(min = 0, max = 1) {
        return rand() * (max - min) + min;
    }

    function bounce() {
        return (game, entity) => {
            game.World.Mask[entity] |= 1 /* Bounce */;
        };
    }

    function collide(radius) {
        return (game, entity) => {
            game.World.Mask[entity] |= 2 /* Collide */;
            game.World.Collide[entity] = {
                EntityId: entity,
                Radius: radius,
                Center: [0, 0],
                Collisions: [],
            };
        };
    }

    function draw_circle(radius) {
        return (game, entity) => {
            game.World.Mask[entity] |= 4 /* Draw */;
            game.World.Draw[entity] = {
                Kind: 0 /* Circle */,
                Radius: radius,
                Color: game.ColorVulnerable,
            };
        };
    }

    function health() {
        return (game, entity) => {
            game.World.Mask[entity] |= 8 /* Health */;
            game.World.Health[entity] = {
                State: "vulnerable",
                SinceInfection: 0,
            };
        };
    }

    function move(Speed) {
        return (game, entity) => {
            game.World.Mask[entity] |= 16 /* Move */;
            game.World.Move[entity] = {
                Speed,
            };
        };
    }

    function wander() {
        return (game, entity) => {
            game.World.Mask[entity] |= 64 /* Wander */;
        };
    }

    function create() {
        return [1, 0, 0, 1, 0, 0];
    }
    function invert(out, a) {
        let aa = a[0], ab = a[1], ac = a[2], ad = a[3];
        let atx = a[4], aty = a[5];
        let det = aa * ad - ab * ac;
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        out[0] = ad * det;
        out[1] = -ab * det;
        out[2] = -ac * det;
        out[3] = aa * det;
        out[4] = (ac * aty - ad * atx) * det;
        out[5] = (ab * atx - aa * aty) * det;
        return out;
    }
    function multiply(out, a, b) {
        let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
        let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
        out[0] = a0 * b0 + a2 * b1;
        out[1] = a1 * b0 + a3 * b1;
        out[2] = a0 * b2 + a2 * b3;
        out[3] = a1 * b2 + a3 * b3;
        out[4] = a0 * b4 + a2 * b5 + a4;
        out[5] = a1 * b4 + a3 * b5 + a5;
        return out;
    }
    function from_translation(out, v) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        out[4] = v[0];
        out[5] = v[1];
        return out;
    }
    function rotate(out, a, rad) {
        let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
        let s = Math.sin(rad);
        let c = Math.cos(rad);
        out[0] = a0 * c + a2 * s;
        out[1] = a1 * c + a3 * s;
        out[2] = a0 * -s + a2 * c;
        out[3] = a1 * -s + a3 * c;
        out[4] = a4;
        out[5] = a5;
        return out;
    }
    function scale(out, a, v) {
        let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
        let v0 = v[0], v1 = v[1];
        out[0] = a0 * v0;
        out[1] = a1 * v0;
        out[2] = a2 * v1;
        out[3] = a3 * v1;
        out[4] = a4;
        out[5] = a5;
        return out;
    }
    function get_translation(out, a) {
        out[0] = a[4];
        out[1] = a[5];
        return out;
    }

    function transform2d(Translation = [0, 0], Rotation = 0, Scale = [1, 1]) {
        return (game, EntityId) => {
            game.World.Mask[EntityId] |= 32 /* Transform2D */;
            game.World.Transform2D[EntityId] = {
                EntityId,
                World: create(),
                Self: create(),
                Translation,
                Rotation,
                Scale,
                Children: [],
                Dirty: true,
            };
        };
    }

    const MAX_ENTITIES = 10000;
    let raf = 0;
    function loop_start(game) {
        let last = performance.now();
        let tick = (now) => {
            let delta = (now - last) / 1000;
            game.FrameUpdate(delta);
            last = now;
            raf = requestAnimationFrame(tick);
        };
        loop_stop();
        tick(last);
    }
    function loop_stop() {
        cancelAnimationFrame(raf);
    }
    function create$1(world, mask = 0) {
        for (let i = 0; i < MAX_ENTITIES; i++) {
            if (!world.Mask[i]) {
                world.Mask[i] = mask;
                return i;
            }
        }
        throw new Error("No more entities available.");
    }
    function instantiate(game, { Translation, Rotation, Scale, Using = [], Children = [] }) {
        let entity = create$1(game.World);
        transform2d(Translation, Rotation, Scale)(game, entity);
        for (let mixin of Using) {
            mixin(game, entity);
        }
        let entity_transform = game.World.Transform2D[entity];
        for (let subtree of Children) {
            let child = instantiate(game, subtree);
            let child_transform = game.World.Transform2D[child];
            child_transform.Parent = entity_transform;
            entity_transform.Children.push(child_transform);
        }
        return entity;
    }

    class World {
        constructor() {
            // Component flags
            this.Mask = [];
            // Component data
            this.Collide = [];
            this.Draw = [];
            this.Health = [];
            this.Move = [];
            this.Transform2D = [];
        }
    }

    function scene_stage(game) {
        game.World = new World();
        game.Statistics = [];
        set_seed(Date.now());
        for (let i = 0; i < game.Population - 1; i++) {
            instantiate(game, {
                Translation: [float(0, game.CanvasScene.width), float(0, game.CanvasScene.height)],
                Rotation: float(0, Math.PI * 2),
                Using: [draw_circle(3), collide(3), move(50), bounce(), wander(), health()],
            });
        }
        let patient0 = instantiate(game, {
            Translation: [float(0, game.CanvasScene.width), float(0, game.CanvasScene.height)],
            Rotation: float(0, Math.PI * 2),
            Using: [draw_circle(3), collide(3), move(50), bounce(), wander(), health()],
        });
        game.World.Health[patient0].State = "infected";
        game.World.Draw[patient0].Color = game.ColorInfected;
        for (let e = 0; e < game.Population * game.DistancingRatio; e++) {
            if (game.World.Mask[e] & 1 /* Bounce */) {
                game.World.Mask[e] &= ~16 /* Move */;
            }
        }
    }

    function dispatch(game, action, args) {
        switch (action) {
            case 0 /* SetPopulation */: {
                let population = args;
                game.Population = population;
                requestAnimationFrame(() => scene_stage(game));
                break;
            }
            case 1 /* SetDistancingRatio */: {
                let ratio = args;
                game.DistancingRatio = ratio;
                let partition_index = game.Population * game.DistancingRatio;
                requestAnimationFrame(() => {
                    for (let e = 0; e < game.World.Mask.length; e++) {
                        if (game.World.Mask[e] & 1 /* Bounce */) {
                            if (e < partition_index) {
                                game.World.Mask[e] &= ~16 /* Move */;
                            }
                            else {
                                game.World.Mask[e] |= 16 /* Move */;
                            }
                        }
                    }
                });
                break;
            }
            case 2 /* SetRecoveryTime */: {
                let time = args;
                game.RecoveryTime = time;
                break;
            }
        }
    }

    const QUERY = 32 /* Transform2D */ | 1 /* Bounce */;
    function sys_bounce(game, delta) {
        for (let i = 0; i < game.World.Mask.length; i++) {
            if ((game.World.Mask[i] & QUERY) == QUERY) {
                update(game, i);
            }
        }
    }
    function update(game, entity) {
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

    function distance_squared(a, b) {
        let x = b[0] - a[0];
        let y = b[1] - a[1];
        return x * x + y * y;
    }

    const QUERY$1 = 32 /* Transform2D */ | 2 /* Collide */;
    function sys_collide(game, delta) {
        // Collect all colliders.
        let all_colliders = [];
        for (let i = 0; i < game.World.Mask.length; i++) {
            if ((game.World.Mask[i] & QUERY$1) === QUERY$1) {
                let transform = game.World.Transform2D[i];
                let collider = game.World.Collide[i];
                // Prepare the collider for this tick.
                collider.Collisions = [];
                get_translation(collider.Center, transform.World);
                all_colliders.push(collider);
            }
        }
        for (let i = 0; i < all_colliders.length; i++) {
            check_collisions(all_colliders[i], all_colliders, i + 1);
        }
    }
    function check_collisions(collider, colliders, offset) {
        for (let i = offset; i < colliders.length; i++) {
            let other = colliders[i];
            if (other !== collider && intersect(collider, other)) {
                collider.Collisions.push(other);
                other.Collisions.push(collider);
            }
        }
    }
    function intersect(a, b) {
        return distance_squared(a.Center, b.Center) < (a.Radius + b.Radius) ** 2;
    }

    let w = 1;
    function sys_draw_histogram(game, delta) {
        game.ContextHisto.fillStyle = "#f8f8f8";
        game.ContextHisto.fillRect(0, 0, game.CanvasHisto.width, game.CanvasHisto.height);
        for (let i = 0; i < game.Statistics.length; i++) {
            let count = game.Statistics[i];
            let vulnerable = (count[0] / game.Population) * game.CanvasHisto.height;
            let infected = (count[1] / game.Population) * game.CanvasHisto.height;
            let recovered = (count[2] / game.Population) * game.CanvasHisto.height;
            game.ContextHisto.fillStyle = game.ColorRecovered;
            game.ContextHisto.fillRect(i * w, 0, w, recovered);
            game.ContextHisto.fillStyle = game.ColorVulnerable;
            game.ContextHisto.fillRect(i * w, recovered, w, vulnerable);
            game.ContextHisto.fillStyle = game.ColorInfected;
            game.ContextHisto.fillRect(i * w, recovered + vulnerable, w, infected);
        }
    }

    const QUERY$2 = 32 /* Transform2D */ | 4 /* Draw */;
    function sys_draw_scene(game, delta) {
        game.ContextScene.resetTransform();
        game.ContextScene.fillStyle = game.ClearColor;
        game.ContextScene.fillRect(0, 0, game.CanvasScene.width, game.CanvasScene.height);
        for (let i = 0; i < game.World.Mask.length; i++) {
            if ((game.World.Mask[i] & QUERY$2) == QUERY$2) {
                let transform = game.World.Transform2D[i];
                game.ContextScene.setTransform(transform.World[0], transform.World[1], transform.World[2], transform.World[3], transform.World[4], transform.World[5]);
                let draw = game.World.Draw[i];
                switch (draw.Kind) {
                    case 0 /* Circle */:
                        draw_circle$1(game, draw);
                        break;
                }
            }
        }
    }
    function draw_circle$1(game, draw) {
        game.ContextScene.fillStyle = draw.Color;
        game.ContextScene.beginPath();
        game.ContextScene.arc(0, 0, draw.Radius, 0, 2 * Math.PI);
        game.ContextScene.closePath();
        game.ContextScene.fill();
    }

    let update_span = document.getElementById("update");
    let delta_span = document.getElementById("delta");
    let fps_span = document.getElementById("fps");
    function sys_framerate(game, delta, update) {
        if (update_span) {
            update_span.textContent = update.toFixed(1);
        }
        if (delta_span) {
            delta_span.textContent = (delta * 1000).toFixed(1);
        }
        if (fps_span) {
            fps_span.textContent = (1 / delta).toFixed();
        }
    }

    const QUERY$3 = 8 /* Health */ | 2 /* Collide */;
    function sys_health(game, delta) {
        for (let i = 0; i < game.World.Mask.length; i++) {
            if ((game.World.Mask[i] & QUERY$3) == QUERY$3) {
                update$1(game, i, delta);
            }
        }
    }
    function update$1(game, entity, delta) {
        let health = game.World.Health[entity];
        if (health.State === "infected") {
            health.SinceInfection += delta;
            if (health.SinceInfection > game.RecoveryTime) {
                health.State = "recovered";
                game.World.Draw[entity].Color = game.ColorRecovered;
                game.World.Mask[entity] &= ~2 /* Collide */;
                return;
            }
            let collide = game.World.Collide[entity];
            for (let i = 0; i < collide.Collisions.length; i++) {
                let other = collide.Collisions[i];
                let health = game.World.Health[other.EntityId];
                if (health.State === "vulnerable") {
                    game.World.Health[other.EntityId].State = "infected";
                    game.World.Draw[other.EntityId].Color = game.ColorInfected;
                }
            }
        }
    }

    const QUERY$4 = 32 /* Transform2D */ | 16 /* Move */;
    function sys_move(game, delta) {
        for (let i = 0; i < game.World.Mask.length; i++) {
            if ((game.World.Mask[i] & QUERY$4) == QUERY$4) {
                update$2(game, i, delta);
            }
        }
    }
    let forward = [0, 0];
    function update$2(game, entity, delta) {
        let transform = game.World.Transform2D[entity];
        let move = game.World.Move[entity];
        forward[0] = transform.World[0];
        forward[1] = transform.World[1];
        transform.Translation[0] += forward[0] * move.Speed * delta;
        transform.Translation[1] += forward[1] * move.Speed * delta;
        transform.Dirty = true;
    }

    const QUERY$5 = 8 /* Health */;
    let since_last = 0;
    function sys_snapshot(game, delta) {
        since_last += delta;
        if (since_last > 0.06) {
            since_last = 0;
            let counts = [0, 0, 0];
            for (let i = 0; i < game.World.Mask.length; i++) {
                if ((game.World.Mask[i] & QUERY$5) == QUERY$5) {
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

    const QUERY$6 = 32 /* Transform2D */;
    function sys_transform2d(game, delta) {
        for (let i = 0; i < game.World.Mask.length; i++) {
            if ((game.World.Mask[i] & QUERY$6) === QUERY$6) {
                update$3(game.World.Transform2D[i]);
            }
        }
    }
    function update$3(transform) {
        if (transform.Dirty) {
            transform.Dirty = false;
            set_children_as_dirty(transform);
            from_translation(transform.World, transform.Translation);
            rotate(transform.World, transform.World, transform.Rotation);
            scale(transform.World, transform.World, transform.Scale);
            if (transform.Parent) {
                multiply(transform.World, transform.Parent.World, transform.World);
            }
            invert(transform.Self, transform.World);
        }
    }
    function set_children_as_dirty(transform) {
        for (let child of transform.Children) {
            child.Dirty = true;
            set_children_as_dirty(child);
        }
    }

    function shift(values) {
        let value = values.shift();
        if (typeof value === "boolean" || value == undefined) {
            return "";
        }
        else if (Array.isArray(value)) {
            return value.join("");
        }
        else {
            return value;
        }
    }
    function html(strings, ...values) {
        return strings.reduce((out, cur) => out + shift(values) + cur);
    }

    function DistancingRatio(game) {
        return html `
        <label style="display: flex; align-items: center; margin-right: 30px;">
            Distancing: ${Math.round(game.DistancingRatio * 100)}%
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value="${game.DistancingRatio}"
                onchange="$(${1 /* SetDistancingRatio */}, parseFloat(this.value))"
                style="margin-left: 10px;"
            />
        </label>
    `;
    }

    function Population(game) {
        return html `
        <label style="display: flex; align-items: center; margin-right: 30px;">
            Population: ${game.Population}
            <input
                type="range"
                min="1"
                max="1000"
                value="${game.Population}"
                onchange="$(${0 /* SetPopulation */}, parseInt(this.value))"
                style="margin-left: 10px;"
            />
        </label>
    `;
    }

    function RecoveryTime(game) {
        return html `
        <label style="display: flex; align-items: center;">
            Recovery Time: ${game.RecoveryTime}s
            <input
                type="range"
                min="1"
                max="30"
                value="${game.RecoveryTime}"
                onchange="$(${2 /* SetRecoveryTime */}, parseInt(this.value))"
                style="margin-left: 10px;"
            />
        </label>
    `;
    }

    function App(game) {
        return html `
        <div
            style="
                display: flex;
                justify-content: space-between;
                padding: 5px;
                font: 12px monospace;
            "
        >
            <div style="flex: 1; display: flex; flex-wrap: wrap;">
                ${Population(game)} ${DistancingRatio(game)} ${RecoveryTime(game)}
            </div>
            <button
                onclick="$(${0 /* SetPopulation */}, ${game.Population})"
                style="margin-left: 30px;"
            >
                Restart
            </button>
        </div>
    `;
    }

    let prev;
    function sys_ui(game, delta) {
        let next = App(game);
        if (next !== prev) {
            game.UI.innerHTML = prev = next;
        }
    }

    const QUERY$7 = 32 /* Transform2D */ | 64 /* Wander */;
    function sys_wander(game, delta) {
        for (let i = 0; i < game.World.Mask.length; i++) {
            if ((game.World.Mask[i] & QUERY$7) == QUERY$7) {
                update$4(game, i);
            }
        }
    }
    function update$4(game, entity) {
        let transform = game.World.Transform2D[entity];
        // Randomize the direction slightly to avoid linear paths.
        transform.Rotation += float(-0.1, 0.1);
        transform.Dirty = true;
    }

    class Game {
        constructor() {
            this.World = new World();
            this.UI = document.querySelector("nav");
            this.CanvasScene = document.querySelector("canvas#scene");
            this.ContextScene = this.CanvasScene.getContext("2d");
            this.CanvasHisto = document.querySelector("canvas#histo");
            this.ContextHisto = this.CanvasHisto.getContext("2d");
            this.ClearColor = "#e2ddc3";
            this.ColorVulnerable = "#fff";
            this.ColorInfected = "#ce6a12";
            this.ColorRecovered = "#9582dd";
            this.Population = 750;
            this.DistancingRatio = 0.0;
            this.RecoveryTime = 20;
            this.Statistics = [];
            document.addEventListener("visibilitychange", () => document.hidden ? loop_stop() : loop_start(this));
            this.CanvasScene.width = this.CanvasScene.clientWidth;
            this.CanvasScene.height = this.CanvasScene.clientHeight;
            this.CanvasHisto.width = this.CanvasHisto.clientWidth;
            this.CanvasHisto.height = this.CanvasHisto.clientHeight;
        }
        FrameUpdate(delta) {
            let now = performance.now();
            sys_move(this, delta);
            sys_bounce(this);
            sys_wander(this);
            sys_transform2d(this);
            sys_collide(this);
            sys_health(this, delta);
            sys_snapshot(this, delta);
            sys_draw_scene(this);
            sys_draw_histogram(this);
            sys_ui(this);
            sys_framerate(this, delta, performance.now() - now);
        }
    }

    let game = new Game();
    scene_stage(game);
    loop_start(game);
    // @ts-ignore
    window.game = game;
    // @ts-ignore
    window.$ = dispatch.bind(null, game);

}());
