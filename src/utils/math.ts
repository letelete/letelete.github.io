export interface Point {
  x: number;
  y: number;
}

export const distanceEuclidean = (p: Point, q: Point) => {
  const dx = Math.abs(p.x - q.x);
  const dy = Math.abs(p.y - q.y);

  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};

export const distanceManhattan = (p: Point, q: Point) => {
  return Math.abs(p.x - q.x + (p.y - q.y));
};

export const map1DimTo2Dim = (index: number, columns: number): Point => {
  const y = Math.floor(index / columns);
  const x = index % columns;

  return { y, x };
};

export const isInRange = (
  value: number,
  ...ranges: [min: number, max: number][]
) => {
  return ranges.some(([min, max]) => min >= value && max <= value);
};
