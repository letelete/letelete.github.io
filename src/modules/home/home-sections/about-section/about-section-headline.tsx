import { useCallback } from 'react';

/* -------------------------------------------------------------------------------------------------
 * AboutSectionHeadline
 * -----------------------------------------------------------------------------------------------*/
import { SectionHeadline } from '~ui/molecules/section/section-headline';
import {
  HighlightedWithPopup,
  PopupVideoContent,
} from '~ui/organisms/highlighted-with-popup';

const AboutSectionHeadline = () => {
  const renderSFIPolandPopupContent = useCallback(
    () => <PopupVideoContent fileName='conference-sfi-poland' />,
    []
  );

  const renderReactDaysBerlinPopupContent = useCallback(
    () => <PopupVideoContent fileName='conference-react-days-berlin' />,
    []
  );
  const renderWeAreDevelopersBerlinPopupContent = useCallback(
    () => <PopupVideoContent fileName='conference-we-are-developers-berlin' />,
    []
  );

  return (
    <SectionHeadline>
      I enjoy traveling, and exchanging experience in person on tech
      conferences. Recently I’ve been to{' '}
      <HighlightedWithPopup
        popupContainerClassName='aspect-video w-48'
        renderPopupContent={renderSFIPolandPopupContent}
      >
        SFI
      </HighlightedWithPopup>
      @Poland{' (speaker), '}
      <HighlightedWithPopup
        popupContainerClassName='aspect-video w-48'
        renderPopupContent={renderReactDaysBerlinPopupContent}
      >
        ReactDays
      </HighlightedWithPopup>
      @Berlin, and{' '}
      <HighlightedWithPopup
        popupContainerClassName='aspect-video w-48'
        renderPopupContent={renderWeAreDevelopersBerlinPopupContent}
      >
        WeAreDevelopers
      </HighlightedWithPopup>
      @Berlin. Looking forward to attending more in the future.
    </SectionHeadline>
  );
};

AboutSectionHeadline.displayName = 'AboutSectionHeadline';

/* -----------------------------------------------------------------------------------------------*/

export { AboutSectionHeadline };
