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
