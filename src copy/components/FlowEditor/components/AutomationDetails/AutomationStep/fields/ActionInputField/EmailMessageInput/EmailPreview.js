import React from 'react';
import PropTypes from 'prop-types';
import { useMeasure } from 'react-use';
import Box from '@material-ui/core/Box';
import { SCALE, StyledPreview } from '../../../../../../../EmailTemplate/Preview/styled';
import Email from '../../../../../../../EmailTemplate/Email';

const EmailPreview = ({ brandInfo, we, editorContent, actionText, actionLink }) => {
  const [ref, { height, width }] = useMeasure();

  return (
    <Box ml="1px" height={SCALE * height} width={SCALE * width}>
      <StyledPreview ref={ref}>
        <Email
          brandInfo={brandInfo}
          we={we}
          editorContent={editorContent}
          editorProperties={[]}
          preview
          buttonText={actionText}
          buttonLink={actionLink}
        />
        {/* last child is hack. check StyledPreview */}
        <Box component="i" className="last-child" />
      </StyledPreview>
    </Box>
  );
};

EmailPreview.propTypes = {
  brandInfo: PropTypes.shape({
    accentColor: PropTypes.string,
    actionButton: PropTypes.string,
    socialNetworks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        iconUrl: PropTypes.string,
        linkUrl: PropTypes.string,
      })
    ),
    logoUrl: PropTypes.string,
    faviconUrl: PropTypes.string,
    templateConfig: PropTypes.shape({
      signOffContent: PropTypes.string,
      footerText: PropTypes.string,
      logoType: PropTypes.string,
      logoPosition: PropTypes.string,
      logoSize: PropTypes.string,
    }),
  }).isRequired,
  we: PropTypes.string.isRequired,
  editorContent: PropTypes.string,
  actionText: PropTypes.string.isRequired,
  actionLink: PropTypes.string.isRequired,
};

EmailPreview.defaultProps = {
  editorContent: '',
};

export default EmailPreview;
