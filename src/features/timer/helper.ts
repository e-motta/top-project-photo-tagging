export const getElapsedTime = (start: number, stop: number | null) => {
  if (!stop) return new Date().getTime() - start;
  return stop - start;
};
