import { Suspense } from 'react';

import { Home } from '~features/home';
import { AboutSection } from '~features/home/about-section';
import { ContactSection } from '~features/home/contact-section';
import { ExperienceSection } from '~features/home/experience-section';
import { HeroSection } from '~features/home/hero-section';
import { TestimonialSection } from '~features/home/testimonial-section';

import { getAllContent } from '~lib/content/provider';

export default async function HomePage() {
  const content = await getAllContent();

  return (
    <Suspense
      fallback={
        <div className='flex h-full w-full items-center justify-center'>
          Loading...
        </div>
      }
    >
      <Home
        hero={<HeroSection />}
        about={<AboutSection />}
        experience={<ExperienceSection content={content} />}
        contact={<ContactSection />}
        testimonial={<TestimonialSection />}
      />
    </Suspense>
  );
}
