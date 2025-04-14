export function useThrottle(fn, delay = 300) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      return fn.apply(this, args);
    }
  };
}