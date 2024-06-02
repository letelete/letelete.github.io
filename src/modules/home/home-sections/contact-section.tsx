'use client';

import Link from 'next/link';

import { SOCIALS } from '~constants/index';

import { Button } from '~ui/atoms/button';
import { Icon, IconProps } from '~ui/atoms/icon';
import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export const ContactSection = () => {
  return (
    <section className='layout-width-limiter layout-padding flex w-full flex-col items-center justify-center'>
      <figure className='flex flex-col justify-center'>
        <Typography asChild>
          <h2>
            {'Get in touch. Follow me. '}
            <span className='text-foreground-primary'>Let’s talk!</span>
          </h2>
        </Typography>

        <div className='mt-8 flex flex-col gap-y-4'>
          {socials.map((social) => (
            <div key={social.id} className='flex gap-x-2'>
              <Icon
                className='relative mt-1'
                name={social.icon.name}
                color={social.icon.color}
              />

              <Typography variant='body-sm'>
                {social.content.map(({ text, highlighted, cta }) => {
                  if (cta) {
                    return (
                      <Button
                        key={text}
                        className={cn(
                          'font-normal',
                          highlighted
                            ? 'text-foreground-primary'
                            : 'text-foreground-secondary'
                        )}
                        variant='link'
                        size='inline'
                        asChild
                      >
                        <Link href={social.link.href}>{text}</Link>
                      </Button>
                    );
                  }
                  if (highlighted) {
                    return (
                      <span key={text} className='text-foreground-primary'>
                        {text}
                      </span>
                    );
                  }
                  return text;
                })}{' '}
                <Button
                  className='font-normal text-foreground-secondary'
                  variant='link'
                  size='inline'
                  asChild
                >
                  <Link href={social.link.href}>{social.link.label}</Link>
                </Button>
              </Typography>
            </div>
          ))}
        </div>
      </figure>
    </section>
  );
};

interface Social {
  id: string;
  icon: {
    name: IconProps['name'];
    color: IconProps['color'];
  };
  content: { text: string; highlighted?: boolean; cta?: boolean }[];
  link: {
    href: string;
    label: string;
  };
}

const socials: Social[] = [
  {
    id: 'youtube',
    icon: {
      name: 'youtube',
      color: 'red',
    },
    content: [
      { text: 'Follow', cta: true },
      { text: ' me on ' },
      { text: 'YouTube', highlighted: true },
      { text: ' for a dose of Frontend Engineering knowledge:' },
    ],
    link: {
      href: SOCIALS.youtube.url,
      label: SOCIALS.youtube.handle,
    },
  },
  {
    id: 'twitter',
    icon: {
      name: 'twitter',
      color: undefined,
    },
    content: [
      { text: 'Be up-to-date', cta: true },
      { text: ' with my Frontend findings on ' },
      { text: 'X (Twitter):', highlighted: true },
    ],
    link: {
      href: SOCIALS.twitter.url,
      label: SOCIALS.twitter.handle,
    },
  },
  {
    id: 'github',
    icon: {
      name: 'github',
      color: undefined,
    },
    content: [
      { text: 'Code review', cta: true },
      { text: ' my projects on ' },
      { text: 'GitHub:', highlighted: true },
    ],
    link: {
      href: SOCIALS.github.url,
      label: SOCIALS.github.handle,
    },
  },
  {
    id: 'linkedin',
    icon: {
      name: 'linkedin',
      color: undefined,
    },
    content: [
      { text: 'Check', cta: true },
      { text: ' my ' },
      { text: 'LinkedIn:', highlighted: true },
    ],
    link: {
      href: SOCIALS.linkedin.url,
      label: SOCIALS.linkedin.handle,
    },
  },
  {
    id: 'email',
    icon: {
      name: 'mail',
      color: undefined,
    },
    content: [
      { text: 'Send', cta: true },
      { text: ' me an ' },
      { text: 'Email:', highlighted: true },
    ],
    link: {
      href: `mailto:${SOCIALS.mail.url}`,
      label: SOCIALS.mail.handle,
    },
  },
  {
    id: 'telegram',
    icon: {
      name: 'send',
      color: undefined,
    },
    content: [
      { text: 'Chat', cta: true },
      { text: ' on ' },
      { text: 'Telegram:', highlighted: true },
    ],
    link: {
      href: SOCIALS.telegram.url,
      label: SOCIALS.telegram.handle,
    },
  },
];
