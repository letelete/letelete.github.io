import Link from 'next/link';

import { SOCIALS_URLS } from '~constants/index';

import { Button } from '~ui/atoms/button';
import { Icon, IconProps } from '~ui/atoms/icon';
import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export const ContactSection = () => {
  return (
    <div className='layout-width-limiter layout-padding flex min-h-screen w-full flex-col items-center justify-center'>
      <figure className='flex flex-col justify-center'>
        <Typography asChild>
          <h2>
            {'Get in touch. Follow me. '}
            <span className='text-primary-highlighted'>Let’s talk!</span>
          </h2>
        </Typography>

        <div className='mt-8 flex flex-col gap-y-4'>
          {socials.map((social) => (
            <div key={social.id} className='flex gap-x-1'>
              <Typography variant='body-sm'>
                <Icon
                  className='mr-2 inline'
                  name={social.icon.name}
                  color={social.icon.color}
                />
                {social.content.map(({ text, highlighted, cta }) => {
                  if (cta) {
                    return (
                      <Button
                        key={text}
                        className={cn(
                          'font-normal',
                          highlighted
                            ? 'text-primary-highlighted'
                            : 'text-primary'
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
                      <span key={text} className='text-primary-highlighted'>
                        {text}
                      </span>
                    );
                  }
                  return text;
                })}{' '}
                <Button
                  className='font-normal text-primary'
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
    </div>
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
      href: SOCIALS_URLS.youtube,
      label: '@brunokawka',
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
      href: SOCIALS_URLS.twitter,
      label: '@bruno_kawka',
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
      href: SOCIALS_URLS.github,
      label: '@letelete',
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
      href: SOCIALS_URLS.linkedin,
      label: 'in/brunokawka',
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
      href: `mailto:${SOCIALS_URLS.mail}`,
      label: 'brunokawka@gmail.com',
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
      href: SOCIALS_URLS.telegram,
      label: 'me/letelete',
    },
  },
];
