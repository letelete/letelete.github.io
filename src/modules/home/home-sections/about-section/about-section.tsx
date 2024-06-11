'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { GOOGLE_CODE_IN_ARTICLE_PATH } from '~constants/index';

import { AboutAuthorPortraitsGalleryCard } from '~modules/home/home-sections/about-section/about-author-portrait-gallery-card';
import { AboutSectionHeadline } from '~modules/home/home-sections/about-section/about-section-headline';

import { Button } from '~ui/atoms/button';
import { ForMobile, ForNonMobile } from '~ui/atoms/responsive';
import { Typography } from '~ui/atoms/typography';
import { SectionContainer } from '~ui/molecules/section/section-container';
import { SectionHeader } from '~ui/molecules/section/section-header';
import { AuthorSign } from '~ui/widgets/author-sign';
import { InterestsSpotlight } from '~ui/widgets/interests-spotlight';

/* -------------------------------------------------------------------------------------------------
 * AboutSection
 * -----------------------------------------------------------------------------------------------*/

const MotionLink = motion(Link);

const AboutSection = () => {
  return (
    <div>
      <SectionContainer>
        <SectionHeader title='About' />

        <AboutSectionHeadline />

        <div className='flex justify-between gap-x-8 md:gap-x-24'>
          <div className='flex-1'>
            <Typography balance>
              I got into programming at the age of 14 - discovered I could
              leverage Lua and C++ to gain an edge in video games.{' '}
              <b>
                At the age of 17 I won the international programming contest
                organized by Google.
              </b>
            </Typography>

            <Button className='mt-6' asChild>
              <MotionLink href={GOOGLE_CODE_IN_ARTICLE_PATH}>
                Read my story
              </MotionLink>
            </Button>
          </div>

          <div className='flex-1 '>
            <Typography>
              I’m passionate about software engineering, and UI/UX design.
              Frontend development allows me to experience the best of both
              worlds.
            </Typography>

            <AuthorSign className='mt-14 w-[80%] sm:w-[60%]' />
          </div>

          <ForNonMobile>
            <AboutAuthorPortraitsGalleryCard />
          </ForNonMobile>
        </div>

        <ForMobile>
          <AboutAuthorPortraitsGalleryCard className='mt-24' />
        </ForMobile>
      </SectionContainer>

      <InterestsSpotlight className='mt-24' />
    </div>
  );
};

AboutSection.displayName = 'AboutSection';

/* -----------------------------------------------------------------------------------------------*/

export { AboutSection };
