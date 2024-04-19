export const pipe =
  <T>(...fns: ((arg: T) => T)[]) =>
  (value: T) =>
    fns.reduce((acc, fn) => fn(acc), value);
