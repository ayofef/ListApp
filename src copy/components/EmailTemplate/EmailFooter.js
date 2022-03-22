import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { LanguageSharp } from '@material-ui/icons';
import isEmpty from 'lodash/isEmpty';
import { P12 } from '../atoms';
import EmailSection from './EmailSection';
import { StyledSocials } from './styled';
import PropertyTextEditor from '../PropertyTextEditor';

const DEFAULT_INVALID = 'https://#';

const EmailFooter = ({ defaultTab, footerText, socialNetworks, isBrandCenter, handleSaveFooterText, preview }) => {
  return (
    <EmailSection title="footer" tab={4} defaultTab={defaultTab} preview={preview}>
      <Box bgcolor="#F5F6F7" padding="32px 64px" borderRadius="8px" margin="0 16px" textAlign="center !important">
        {!isBrandCenter || preview ? (
          <P12 color="#787F88" textAlign="center" dangerouslySetInnerHTML={{ __html: footerText }} />
        ) : (
          <PropertyTextEditor
            showToolbar={false}
            initialEditorText={footerText}
            handleSave={handleSaveFooterText}
            properties={[]}
            minHeight="30px"
            isFooter
            isBrandCenter={isBrandCenter}
          />
        )}
        <StyledSocials color="#787F88" mt="16px" display="flex" justifyContent="center" alignItems="center">
          {!isEmpty(socialNetworks) &&
            socialNetworks?.map((el) =>
              el?.linkUrl && el?.linkUrl !== DEFAULT_INVALID ? (
                <a
                  href={el?.linkUrl?.includes('https://') ? el?.linkUrl : `https://${el?.linkUrl}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  key={el?.id}
                >
                  {el?.iconUrl && el?.iconUrl?.length > 1 ? (
                    <img src={el?.iconUrl} alt="social-links" />
                  ) : (
                    <LanguageSharp />
                  )}
                </a>
              ) : (
                <LanguageSharp />
              )
            )}
        </StyledSocials>
      </Box>
    </EmailSection>
  );
};

EmailFooter.propTypes = {
  defaultTab: PropTypes.bool,
  preview: PropTypes.bool.isRequired,
  isBrandCenter: PropTypes.bool.isRequired,
  footerText: PropTypes.string.isRequired,
  handleSaveFooterText: PropTypes.func.isRequired,
  socialNetworks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      iconUrl: PropTypes.string,
      linkUrl: PropTypes.string,
    })
  ),
};
EmailFooter.defaultProps = {
  defaultTab: false,
  socialNetworks: [],
};
export default EmailFooter;
