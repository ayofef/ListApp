import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useLocation } from 'react-router-dom';
import { UI_ROUTES } from '../../constants/routes';

import EmailLogo from './EmailLogo';
import EmailContent from './EmailContent';
import EmailFooter from './EmailFooter';
import EmailSignOff from './EmailSignOff';
import EmptyBlock from './EmptyBlock';
import ActionButton from './EmptyBlock/ActionButton';

const initialFooterText = `PS: If not now then WhenThen`;

const Email = ({
  brandInfo,
  we,
  editorContent,
  handleEmailContentSave,
  editorProperties,
  handleLogoConfig,
  handleSaveFooterText,
  handleSaveSignOffContent,
  handleLogoText,
  preview,
  buttonLink,
  buttonText,
  editorMinHeight,
  previewModal,
  boxShadow,
}) => {
  const { pathname } = useLocation();
  const isBrandCenter = pathname === UI_ROUTES.brandCenter;

  const logoHandler = {
    logoText: brandInfo?.templateConfig?.logoText,
    logoType: brandInfo?.templateConfig?.logoType ?? 'IMG',
    logoSize: brandInfo?.templateConfig?.logoSize ?? 'MEDIUM',
    logoPosition: brandInfo?.templateConfig?.logoPosition ?? 'LEFT',
    handleChange: handleLogoConfig,
  };

  return (
    <Box width="100%" boxShadow={boxShadow} bgcolor="#fff" borderRadius="8px" padding="40px" boxSizing="border-box">
      <EmailLogo
        defaultTab={isBrandCenter}
        brandColor={brandInfo?.accentColor}
        admin={we}
        logo={brandInfo?.logoUrl || ''}
        logoHandler={logoHandler}
        preview={preview}
        handleLogoText={handleLogoText}
        logoTextEditable={!!isBrandCenter}
        previewModal={previewModal}
      />
      <EmailContent
        defaultTab={!isBrandCenter}
        handleSave={handleEmailContentSave}
        properties={editorProperties}
        initialEditorText={editorContent}
        isBrandCenter={isBrandCenter}
        preview={preview}
        previewModal={previewModal}
        editorMinHeight={editorMinHeight}
      />
      {!isBrandCenter ? (
        <EmptyBlock
          brandColor={brandInfo?.accentColor}
          buttonType={brandInfo?.actionButton}
          buttonText={buttonText}
          buttonLink={buttonLink}
          preview={preview}
          previewModal={previewModal}
        />
      ) : (
        <Box margin="0 16px">
          <ActionButton type={brandInfo?.actionButton} brandColor={brandInfo?.accentColor} target="_self" />
        </Box>
      )}
      <EmailSignOff
        signOffContent={brandInfo?.templateConfig?.signOffContent}
        isBrandCenter={isBrandCenter}
        we={we}
        handleSaveSignOffContent={handleSaveSignOffContent}
        preview={preview}
      />
      <EmailFooter
        footerText={brandInfo?.templateConfig?.footerText || initialFooterText}
        socialNetworks={brandInfo?.socialNetworks}
        isBrandCenter={isBrandCenter}
        handleSaveFooterText={handleSaveFooterText}
        preview={preview}
      />
    </Box>
  );
};

Email.propTypes = {
  we: PropTypes.string.isRequired,
  handleEmailContentSave: PropTypes.func,
  editorContent: PropTypes.string.isRequired,
  handleLogoConfig: PropTypes.func,
  handleSaveFooterText: PropTypes.func,
  handleSaveSignOffContent: PropTypes.func,
  handleLogoText: PropTypes.func,
  preview: PropTypes.bool,
  buttonLink: PropTypes.string,
  buttonText: PropTypes.string,
  editorMinHeight: PropTypes.string,
  previewModal: PropTypes.bool,
  boxShadow: PropTypes.string,

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
      logoText: PropTypes.string,
    }),
  }).isRequired,
  editorProperties: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string,
      properties: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};

Email.defaultProps = {
  handleEmailContentSave: () => {},
  handleLogoConfig: () => {},
  handleSaveFooterText: () => {},
  handleSaveSignOffContent: () => {},
  handleLogoText: () => {},
  preview: false,
  buttonLink: '',
  buttonText: '',
  editorMinHeight: '100px',
  previewModal: false,
  boxShadow: '0px 0px 0px 2px rgba(155, 159, 171, 0.11)',
};

export default Email;
