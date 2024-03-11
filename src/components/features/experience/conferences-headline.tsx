import { motion } from 'framer-motion';

import { LocationTag } from '~ui/atoms/location-tag';
import { Typography, TypographyProps } from '~ui/atoms/typography';

import { cn } from '~utils/style';

const conferences = [
  { name: 'SFI', place: 'Poland', href: 'https://sfi.pl' },
  { name: 'React Day', place: 'Berlin', href: 'https://reactday.berlin' },
  {
    name: 'WeAreDevelopers',
    place: 'Berlin',
    href: 'https://www.wearedevelopers.com',
  },
];

export interface ConferencesHeadlineProps extends TypographyProps {}

export const ConferencesHeadline = ({
  className,
  ...rest
}: ConferencesHeadlineProps) => (
  <Typography
    variant='body'
    className={cn('text-center', className)}
    asChild
    {...rest}
  >
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.8 }}
    >
      {
        'I enjoy traveling, and exchanging experience in person on tech conferences. '
      }

      <span className='text-[1em] text-primary-highlighted'>
        Recently I’ve been to{' '}
        {conferences.map(({ name, place, href }, index) => (
          <>
            <LocationTag key={name} name={name} place={place} href={href} />

            {index < conferences.length - 1 && ', '}
          </>
        ))}
      </span>

      {'. Looking forward to attending more in the future!'}
    </motion.h2>
  </Typography>
);
