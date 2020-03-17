export function lerp(from: number, to: number, progress: number) {
    return from + progress * (to - from);
}

export function clamp(n: number, min: number, max: number) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
}
