import {loop_start, loop_stop} from "./core.js";
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

    InputState: Record<string, number> = {};
    InputDelta: Record<string, number> = {};

    UI = document.querySelector("nav")!;
    CanvasScene = document.querySelector("canvas#scene")! as HTMLCanvasElement;
    ContextScene = this.CanvasScene.getContext("2d")!;
    CanvasHisto = document.querySelector("canvas#histo")! as HTMLCanvasElement;
    ContextHisto = this.CanvasHisto.getContext("2d")!;

    ClearColor = "#222";
    ColorVulnerable = "#666";
    ColorInfected = "#f00";
    ColorRecovered = "#0f0";

    Population = 750;
    DistancingRatio = 0.0;
    RecoveryTime = 20;
    Statistics: Array<[number, number, number]> = [];

    constructor() {
        document.addEventListener("visibilitychange", () =>
            document.hidden ? loop_stop() : loop_start(this)
        );

        window.addEventListener("keydown", evt => {
            if (!evt.repeat) {
                this.InputState[evt.code] = 1;
                this.InputDelta[evt.code] = 1;
            }
        });
        window.addEventListener("keyup", evt => {
            this.InputState[evt.code] = 0;
            this.InputDelta[evt.code] = -1;
        });
        this.UI.addEventListener("mousedown", evt => {
            this.InputState[`Mouse${evt.button}`] = 1;
            this.InputDelta[`Mouse${evt.button}`] = 1;
        });
        this.UI.addEventListener("mouseup", evt => {
            this.InputState[`Mouse${evt.button}`] = 0;
            this.InputDelta[`Mouse${evt.button}`] = -1;
        });
        this.UI.addEventListener("mousemove", evt => {
            this.InputState.MouseX = evt.offsetX;
            this.InputState.MouseY = evt.offsetY;
            this.InputDelta.MouseX = evt.movementX;
            this.InputDelta.MouseY = evt.movementY;
        });
        this.UI.addEventListener("wheel", evt => {
            this.InputDelta.WheelY = evt.deltaY;
        });

        this.CanvasScene.width = this.CanvasScene.clientWidth;
        this.CanvasScene.height = this.CanvasScene.clientHeight;
        this.CanvasHisto.width = this.CanvasHisto.clientWidth;
        this.CanvasHisto.height = this.CanvasHisto.clientHeight;
    }

    FrameReset() {
        for (let name in this.InputDelta) {
            this.InputDelta[name] = 0;
        }
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
