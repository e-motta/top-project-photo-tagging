export const getElapsedTime = (start: number, stop: number | null) => {
  if (!stop) return new Date().getTime() - start;
  return stop - start;
};

export const splitTime = (time: number) => {
  let msec = time;
  const hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  const mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  const ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  return { hh, mm, ss, msec };
};
