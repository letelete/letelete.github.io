import { ComponentPropsWithoutRef } from 'react';

import {
  LaptopEmoji,
  ManClimbingEmoji,
  MicrophoneEmoji,
  ThinkingFaceEmoji,
  TrophyEmoji,
  VideoCameraEmoji,
} from '~ui/atoms/emojis';
import {
  ExperienceSegment,
  ExperienceSegmentProps,
} from '~ui/molecules/experience-segment';

import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * ExperienceHistory
 * -----------------------------------------------------------------------------------------------*/

interface ExperienceHistoryProps extends ComponentPropsWithoutRef<'div'> {}

const ExperienceHistory = ({ className, ...rest }: ExperienceHistoryProps) => (
  <figure
    className={cn(
      'flex w-full flex-col items-center justify-center gap-y-4 sm:gap-y-6',
      className
    )}
    {...rest}
  >
    {experience.map(
      ({ id, leading, title, subtitle, startDate, endDate }, index) => (
        <ExperienceSegment
          key={id}
          style={{
            opacity: index === experience.length - 1 ? 0.34 : undefined,
          }}
          leading={leading}
          title={title}
          subtitle={subtitle}
          startDate={startDate}
          endDate={endDate}
        />
      )
    )}
  </figure>
);

/* -----------------------------------------------------------------------------------------------*/

const experience = [
  {
    id: getRandomUUID(),
    leading: <ManClimbingEmoji />,
    title: 'The Beginning of the Journey',
    subtitle: 'Wrote my first "Hello, World!"',
    startDate: parseDate('2015-05-01'),
    endDate: undefined,
  },
  {
    id: getRandomUUID(),
    leading: <LaptopEmoji />,
    title: 'Android Developer',
    subtitle: 'Mobile-Wallet @ Mifos Initiative',
    startDate: parseDate('2018-10-01'),
    endDate: parseDate('2019-01-01'),
  },
  {
    id: getRandomUUID(),
    leading: <TrophyEmoji />,
    title: 'Google Code-In Winner',
    subtitle: 'International coding contest',
    startDate: parseDate('2019-01-01'),
    endDate: undefined,
  },
  {
    id: getRandomUUID(),
    leading: <LaptopEmoji />,
    title: 'Freelance Full-Stack Developer',
    subtitle: undefined,
    startDate: parseDate('2020-12-01'),
    endDate: parseDate('2022-02-01'),
  },
  {
    id: getRandomUUID(),
    leading: <LaptopEmoji />,
    title: 'UI Engineer',
    subtitle: '@ upsidelab.io',
    startDate: parseDate('2022-03-01'),
    endDate: parseDate('2024-09-01'),
  },
  {
    id: getRandomUUID(),
    leading: <LaptopEmoji />,
    title: 'Technical Recruiter (part-time)',
    subtitle: '@ upsidelab.io',
    startDate: parseDate('2022-07-01'),
    endDate: parseDate('2025-05-01'),
  },
  {
    id: getRandomUUID(),
    leading: <MicrophoneEmoji />,
    title: 'Public Speaker',
    subtitle: '"Animating the Web" @ SFI',
    startDate: parseDate('2023-03-01'),
    endDate: undefined,
  },
  {
    id: getRandomUUID(),
    leading: <MicrophoneEmoji />,
    title: 'Webinar Speaker',
    subtitle:
      '"Animating the UI with performance in mind using React" @ dev.js summit',
    startDate: parseDate('2023-10-01'),
    endDate: undefined,
  },
  {
    id: getRandomUUID(),
    leading: <MicrophoneEmoji />,
    title: 'Public Speaker',
    subtitle: '"Rethinking UI building strategies" @ SFI',
    startDate: parseDate('2024-04-01'),
    endDate: undefined,
  },
  {
    id: getRandomUUID(),
    leading: <VideoCameraEmoji />,
    title: 'YouTube Content Creator',
    subtitle: '@brunokawka',
    startDate: parseDate('2024-03-01'),
    endDate: 'Now',
  },
  {
    id: getRandomUUID(),
    leading: <LaptopEmoji />,
    title: 'Senior UI Engineer',
    subtitle: '@ upsidelab.io',
    startDate: parseDate('2024-09-01'),
    endDate: parseDate('2025-05-01'),
  },
  {
    id: getRandomUUID(),
    leading: <LaptopEmoji />,
    title: 'Software Engineer',
    subtitle: '@ Google',
    startDate: parseDate('2025-05-01'),
    endDate: 'Now',
  },
  {
    id: getRandomUUID(),
    leading: <ThinkingFaceEmoji />,
    title: 'Soon',
    subtitle: undefined,
    startDate: new Date(),
    endDate: undefined,
  },
] satisfies ExperienceSegmentProps[];

function parseDate(date: string) {
  return new Date(Date.parse(date));
}

function getRandomUUID() {
  return crypto.randomUUID();
}

/* -----------------------------------------------------------------------------------------------*/

export { ExperienceHistory };
export type { ExperienceHistoryProps };
