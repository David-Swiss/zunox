export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
export const lerp = (a, b, t) => a + (b - a) * t;
export const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export const keyOf = (x, y) => x + ":" + y;
export const sameCell = (a, b) => !!a && !!b && a.x === b.x && a.y === b.y;
export function now(){ return globalThis.performance?.now?.() ?? Date.now(); }
export function formatNumber(value){ return Math.floor(value).toLocaleString("de-CH"); }