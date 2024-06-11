import { useEffect, useMemo, useState } from 'react';

import { timeInMs } from '~utils/time';

/* -------------------------------------------------------------------------------------------------
 * useRelativeDayPart
 * -----------------------------------------------------------------------------------------------*/

const dayParts = ['morning', 'afternoon', 'evening', 'night'] as const;
const dayPartPhases = ['early', 'mid', 'late'] as const;

type DayPart = (typeof dayParts)[number];
type DayPartPhase = (typeof dayPartPhases)[number];

interface DayPartDefinition {
  startAt: number;
  endAt: number;
  part: DayPart;
}

interface RelativeDayPart extends DayPartDefinition {
  phase: DayPartPhase;
}

const getHourPhaseForDayPart = (
  hour: number,
  partStartAt: number,
  partEndAt: number
): DayPartPhase => {
  const partDuration = (partEndAt || 24) - partStartAt;
  const partCompletionPercentage =
    Math.floor((hour - partStartAt) / partDuration) * 100;

  if (partCompletionPercentage > 80) {
    return 'late';
  }
  if (partCompletionPercentage > 20) {
    return 'mid';
  }
  return 'early';
};

const startHoursDescending = [
  { startAt: 18, part: 'evening' },
  { startAt: 12, part: 'afternoon' },
  { startAt: 6, part: 'morning' },
  { startAt: 0, part: 'night' },
] satisfies { part: DayPart; startAt: number }[];

const dayPartsInfoDescending = startHoursDescending.map(
  ({ startAt, part }, index) => {
    const endAt =
      startHoursDescending[
        index > 0 ? index - 1 : startHoursDescending.length - 1
      ]?.startAt;

    if (endAt === undefined) {
      throw new Error('Cannot find endAt hour');
    }

    return {
      startAt,
      part,
      endAt,
    } satisfies DayPartDefinition;
  }
);

/* -----------------------------------------------------------------------------------------------*/

const DEFAULT_REFRESH_DELAY = timeInMs.minute;

const generateLatestTimestamp = () => {
  return new Date().getTime();
};

const useRelativeDayPart = (refreshDelay = DEFAULT_REFRESH_DELAY) => {
  const [latestTimestamp, setLatestTimestamp] = useState(
    generateLatestTimestamp()
  );

  useEffect(() => {
    const intervalId = setInterval(
      () => setLatestTimestamp(generateLatestTimestamp()),
      refreshDelay
    );

    return () => clearInterval(intervalId);
  }, [refreshDelay]);

  return useMemo<RelativeDayPart>(() => {
    const date = new Date(latestTimestamp);
    const hour = date.getHours();

    const info = dayPartsInfoDescending.find(({ startAt }) => startAt <= hour);
    if (!info) {
      throw new Error(
        'Cannot find information about the current part of the day'
      );
    }

    const phase = getHourPhaseForDayPart(hour, info.startAt, info.endAt);

    return { ...info, phase };
  }, [latestTimestamp]);
};

useRelativeDayPart.displayName = 'useRelativeDayPart';

/* -----------------------------------------------------------------------------------------------*/

export { useRelativeDayPart };
