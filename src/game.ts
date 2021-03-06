import {State} from "./actions.js";
import {loop_start, loop_stop} from "./core.js";
import {read_from_url, SimulationParams} from "./params.js";
import {sys_bounce} from "./systems/sys_bounce.js";
import {sys_collide} from "./systems/sys_collide.js";
import {sys_draw_histogram} from "./systems/sys_draw_histogram.js";
import {sys_draw_scene} from "./systems/sys_draw_scene.js";
import {sys_framerate} from "./systems/sys_framerate.js";
import {sys_health} from "./systems/sys_health.js";
import {sys_move} from "./systems/sys_move.js";
import {sys_snapshot} from "./systems/sys_snapshot.js";
import {sys_transform2d} from "./systems/sys_transform2d.js";
import {sys_ui} from "./systems/sys_ui.js";
import {sys_wander} from "./systems/sys_wander.js";
import {World} from "./world.js";

export type Entity = number;

export class Game {
    World = new World();

    UI = document.querySelector("#controls")!;
    CanvasScene = document.querySelector("canvas#scene")! as HTMLCanvasElement;
    ContextScene = this.CanvasScene.getContext("2d")!;
    CanvasHisto = document.querySelector("canvas#histo")! as HTMLCanvasElement;
    ContextHisto = this.CanvasHisto.getContext("2d")!;

    ClearColor = "#e2ddc3";
    ColorVulnerable = "#fafafa";
    ColorInfected = "#ce6a12";
    ColorRecovered = "#9582dd";

    Statistics: Array<[number, number, number]> = [];
    State: State = {...SimulationParams};

    constructor() {
        document.addEventListener("visibilitychange", () =>
            document.hidden ? loop_stop() : loop_start(this)
        );

        this.CanvasHisto.width = 800;
        this.CanvasHisto.height = 100;
        this.CanvasScene.width = 800;
        this.CanvasScene.height = 600;

        read_from_url(this.State);
    }

    FrameUpdate(delta: number) {
        let now = performance.now();
        sys_move(this, delta);
        sys_bounce(this, delta);
        sys_wander(this, delta);
        sys_transform2d(this, delta);
        sys_collide(this, delta);
        sys_health(this, delta);
        sys_snapshot(this, delta);
        sys_draw_scene(this, delta);
        sys_draw_histogram(this, delta);
        sys_ui(this, delta);
        sys_framerate(this, delta, performance.now() - now);
    }
}
