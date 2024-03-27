'use client';

import { useCallback, useMemo, useState } from 'react';
import { Content, ContentType } from 'src/lib/content/provider';

import { KNOWLEDGE_SHARING_HEADER } from '~constants/index';

import { BlogContentList } from '~features/blog/blog-content-list';
import { BlogTwoPaneContainer } from '~features/blog/blog-two-pane-container';

import { Navbar } from '~ui/atoms/navbar';
import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export const NAVBAR_SCOPE_ID = 'blog-navigation';

export interface BlogProps {
  content: Content[];
}

export const Blog = ({ content }: BlogProps) => {
  const [currentSegment, setCurrentSegment] = useState(
    'article' as ContentType
  );
  const currentContent = useMemo(
    () => content.filter((content) => content.type === currentSegment),
    [content, currentSegment]
  );

  const handleSelectSegment = useCallback((segment: ContentType) => {
    setCurrentSegment(segment);
  }, []);

  return (
    <BlogTwoPaneContainer
      leading={
        <div>
          <Typography variant='hero' asChild>
            <h1>
              {
                'I believe knowledge sharing is a fundamental method to pursue expertise in a given field. '
              }
              <span className='text-primary-highlighted'>
                {KNOWLEDGE_SHARING_HEADER.map(
                  ({ content, type, className }) => {
                    if (!type) {
                      return (
                        <span key={content} className={className}>
                          {content}
                        </span>
                      );
                    }

                    return (
                      <nav
                        key={type}
                        className={cn('nav-card inline-flex', className)}
                      >
                        <Navbar.ItemInline
                          scopeId={NAVBAR_SCOPE_ID}
                          item={{ label: content, id: type }}
                          selected={currentSegment === type}
                          onClick={() => handleSelectSegment(type)}
                        />
                      </nav>
                    );
                  }
                )}
              </span>
            </h1>
          </Typography>
        </div>
      }
      trailing={<BlogContentList content={currentContent} />}
    />
  );
};
