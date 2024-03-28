import { BLOG_PATH } from '~constants/index';

import { Footer, FooterProps } from '~ui/molecules/footer';
import { GoBackButton } from '~ui/molecules/go-back-button';

export interface BlogContentFooterProps extends FooterProps {}

export const BlogContentFooter = ({ ...props }: BlogContentFooterProps) => {
  return (
    <Footer {...props}>
      <GoBackButton className='py-4' href={BLOG_PATH} />
    </Footer>
  );
};
