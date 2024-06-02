import { ComponentPropsWithoutRef } from 'react';

import {
  LaptopEmoji,
  MicrophoneEmoji,
  TrophyEmoji,
  VideoCameraEmoji,
  WhiteQuestionMarkEmoji,
} from '~ui/atoms/emojis';
import { StickyHeaderSection } from '~ui/atoms/sticky-header-section';
import { Typography } from '~ui/atoms/typography';
import { ExperienceSegment } from '~ui/molecules/experience-segment';

import { cn } from '~utils/style';

export interface HistorySectionProps extends ComponentPropsWithoutRef<'div'> {}

export const HistorySection = ({ className, ...rest }: HistorySectionProps) => (
  <StickyHeaderSection
    header={
      <Typography className='layout-width-limiter layout-padding' asChild>
        <h2>
          {
            'I was working on some awesome projects, collaborating with amazing people, and creating my own things. '
          }
          <span className='text-foreground-primary'>
            I gathered the most valuable experiences and listed them
            chronologically.
          </span>
        </h2>
      </Typography>
    }
    body={
      <figure
        className={cn(
          'layout-width-limiter layout-padding flex w-full flex-col items-center justify-center gap-y-4',
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
    }
    bodyClassName='mt-28'
  />
);

const experience = [
  {
    id: 'exp-history__android-developer-at-mifos-initiative',
    leading: <LaptopEmoji />,
    title: 'Android Developer',
    subtitle: 'Mobile-Wallet @ Mifos Initiative',
    startDate: new Date(Date.parse('2018-10-01')),
    endDate: new Date(Date.parse('2019-01-01')),
  },
  {
    id: 'exp-history__google-code-in-winner',
    leading: <TrophyEmoji />,
    title: 'Google Code-In Winner',
    subtitle: 'International coding contest',
    startDate: new Date(Date.parse('2019-01-01')),
    endDate: undefined,
  },
  {
    id: 'exp-history__freelance-full-stack-developer',
    leading: <LaptopEmoji />,
    title: 'Freelance Full-Stack Developer',
    subtitle: undefined,
    startDate: new Date(Date.parse('2020-12-01')),
    endDate: new Date(Date.parse('2022-02-01')),
  },
  {
    id: 'exp-history__frontend-engineer-upside',
    leading: <LaptopEmoji />,
    title: 'Frontend Engineer',
    subtitle: '@ Upsidelab',
    startDate: new Date(Date.parse('2022-03-01')),
    endDate: 'Now',
  },
  {
    id: 'exp-history__technical-recruiter-upside',
    leading: <LaptopEmoji />,
    title: 'Technical Recruiter',
    subtitle: '@ Upsidelab',
    startDate: new Date(Date.parse('2022-07-01')),
    endDate: 'Now',
  },
  {
    id: 'exp-history__public-speaker-animating-the-web-sfi',
    leading: <MicrophoneEmoji />,
    title: 'Public Speaker',
    subtitle: '"Animating the Web" @ SFI',
    startDate: new Date(Date.parse('2023-03-01')),
    endDate: undefined,
  },
  {
    id: 'exp-history__webinar-speaker-animating-the-ui-with-performance-in-mind-using-react',
    leading: <MicrophoneEmoji />,
    title: 'Webinar Speaker',
    subtitle:
      '"Animating the UI with performance in mind using React" @ dev.js summit',
    startDate: new Date(Date.parse('2023-10-01')),
    endDate: undefined,
  },
  {
    id: 'exp-history__youtube-content-creator',
    leading: <VideoCameraEmoji />,
    title: 'YouTube content creator',
    subtitle: '@brunokawka',
    startDate: new Date(Date.parse('2024-03-01')),
    endDate: 'Now',
  },
  {
    id: 'exp-history__public-speaker-rethinking-ui-building-strategies-sfi',
    leading: <MicrophoneEmoji />,
    title: 'Public Speaker',
    subtitle: '"Rethinking UI building strategies" @ SFI',
    startDate: new Date(Date.parse('2024-04-01')),
    endDate: undefined,
  },
  {
    id: 'exp-history__soon',
    leading: <WhiteQuestionMarkEmoji />,
    title: 'Soon',
    subtitle: undefined,
    startDate: new Date(),
    endDate: undefined,
  },
] as const;
