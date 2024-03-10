import dayjs from 'dayjs';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(dayjsRelativeTime);

const largeNumbersFormatter = Intl.NumberFormat('en', {
  notation: 'compact',
  maximumSignificantDigits: 3,
});

export const relativeTime = (date: Date) => {
  return dayjs(dayjs(date)).fromNow();
};

export const shortDate = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const compactNumber = (num: number) => {
  return largeNumbersFormatter.format(num);
};
