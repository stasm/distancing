const enum Component {
    Bounce,
    Collide,
    Draw,
    Health,
    Move,
    Transform2D,
    Wander,
}

export const enum Has {
    Bounce = 1 << Component.Bounce,
    Collide = 1 << Component.Collide,
    Draw = 1 << Component.Draw,
    Health = 1 << Component.Health,
    Move = 1 << Component.Move,
    Transform2D = 1 << Component.Transform2D,
    Wander = 1 << Component.Wander,
}
