export const timeInMs = {
  second: 1000,
  get minute() {
    return this.second * 60;
  },
  get hour() {
    return this.minute * 60;
  },
  get day() {
    return this.hour * 24;
  },
};

const fps = (time: number, fps: number) => {
  return time % Math.floor(1000 / fps) === 0;
};

export const checkFps60 = (time: number) => {
  return fps(time, 60);
};
