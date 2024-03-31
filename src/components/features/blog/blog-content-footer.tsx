import { BLOG_PATH } from '~constants/index';

import { GoBackButton } from '~ui/molecules/buttons/go-back-button';
import { Footer, FooterProps } from '~ui/molecules/footer';

export interface BlogContentFooterProps extends FooterProps {}

export const BlogContentFooter = ({ ...props }: BlogContentFooterProps) => {
  return (
    <Footer {...props}>
      <GoBackButton className='py-4' href={BLOG_PATH} />
    </Footer>
  );
};
