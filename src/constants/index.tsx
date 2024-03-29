import { ContentType } from '~lib/content/provider';

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://kawka.me';

export const BLOG_PATH = '/blog';

export const TALKS_PATH = BLOG_PATH;

export const GOOGLE_CODE_IN_ARTICLE_PATH = `${BLOG_PATH}/winning-google-code-in-2018`;

export const SOCIALS = {
  telegram: {
    url: 'https://t.me/letelete',
    handle: 'me/letelete',
  },
  mail: {
    url: 'brunokawka@gmail.com',
    handle: 'brunokawka@gmail.com',
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/brunokawka/',
    handle: 'in/brunokawka',
  },
  github: {
    url: 'https://github.com/letelete',
    handle: '@letelete',
  },
  twitter: {
    url: 'https://twitter.com/BrunoKawka',
    handle: '@BrunoKawka',
  },
  youtube: {
    url: 'https://www.youtube.com/@brunokawka',
    handle: '@brunokawka',
  },
};

export const PORTFOLIO_GITHUB_REPOSITORY_URL =
  'https://github.com/letelete/letelete.github.io';

export const KNOWLEDGE_SHARING_HEADER: {
  content: string;
  type?: ContentType;
  className?: string;
}[] = [
  { content: 'I' },
  { content: 'write', type: 'article', className: 'ml-2' },
  { content: ',' },
  { content: 'record', type: 'youtube-video', className: 'ml-2' },
  { content: ', and' },
  { content: 'speak', type: 'talk', className: 'mx-2' },
  { content: 'about programming.' },
];
