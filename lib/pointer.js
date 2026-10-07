// Shared, framework-free pointer state. Written by a single window listener,
// read inside useFrame so React never re-renders on mouse move.
export const pointer = { x: 0, y: 0, speed: 0, _px: 0, _py: 0 };
let ready = false;

export function initPointer() {
  if (ready || typeof window === 'undefined') return;
  ready = true;
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    { passive: true }
  );
}

// Call once per frame. `speed` is a smoothed, normalised mouse velocity (~0..1.5).
export function tickPointer(dt) {
  const d = Math.hypot(pointer.x - pointer._px, pointer.y - pointer._py);
  const v = Math.min(d / Math.max(dt, 0.001) / 6, 1.5);
  pointer.speed += (v - pointer.speed) * Math.min(1, dt * 8);
  pointer._px = pointer.x;
  pointer._py = pointer.y;
}
