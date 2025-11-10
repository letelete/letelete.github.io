import dayjs from 'dayjs';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import getReadingTime from 'reading-time';

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

export const monthNameAndYearDate = (date: Date) => {
  return dayjs(date).format("MMM 'YY");
};

export const dayMonthNameAndYearDate = (date: Date) => {
  return dayjs(date).format("DD MMM 'YY");
};

export const compactNumber = (num: number) => {
  return largeNumbersFormatter.format(num);
};

export const readingTime = (text: string) => {
  return getReadingTime(text).text;
};

export const truncateMiddle = (text: string, limit: number) => {
  if (text.length <= limit) {
    return text;
  }
  if (limit <= 3) {
    return text.slice(0, limit);
  }
  const ellipsis = '...';
  const keep = limit - ellipsis.length;
  const front = Math.ceil(keep / 2);
  const back = Math.floor(keep / 2);
  return `${text.slice(0, front)}${ellipsis}${text.slice(text.length - back)}`;
};
