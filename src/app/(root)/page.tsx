import { Suspense } from 'react';

import { Home } from '~features/home';
import { AboutSection } from '~features/home/about-section';
import { ContactSection } from '~features/home/contact-section';
import { ExperienceSection } from '~features/home/experience-section';
import { HeroSection } from '~features/home/hero-section';
import { TestimonialSection } from '~features/home/testimonial-section';

import { getAllContent } from '~lib/content/provider';
import { getAboutMeImages } from '~lib/images/provider';

export default async function HomePage() {
  const content = await getAllContent();
  const images = await getAboutMeImages();
  const brunoImages = images.map((src) => ({ src, alt: 'Bruno Kawka' }));

  return (
    <Suspense
      fallback={
        <div className='flex h-full w-full items-center justify-center'>
          Loading...
        </div>
      }
    >
      <Home
        content={content}
        brunoImages={brunoImages}
        hero={<HeroSection />}
        about={<AboutSection />}
        experience={<ExperienceSection />}
        contact={<ContactSection />}
        testimonial={<TestimonialSection />}
      />
    </Suspense>
  );
}
