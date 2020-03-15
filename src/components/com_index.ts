const enum Component {
    Draw,
    Move,
    Transform2D,
}

export const enum Has {
    Draw = 1 << Component.Draw,
    Move = 1 << Component.Move,
    Transform2D = 1 << Component.Transform2D,
}
