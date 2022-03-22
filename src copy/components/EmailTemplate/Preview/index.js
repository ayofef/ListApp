import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { P14B } from '../../atoms';
import Email from '../Email';
import { StyledPreview, StyledButton } from './styled';
import PreviewModal from './PreviewModal';

const EmailPreview = ({ template, brandInfo, we, editorProperties }) => {
  const [modal, setModal] = useState(false);
  const { t } = useTranslation();
  const handleModal = useCallback(() => setModal((prevState) => !prevState), []);

  return (
    <Box width="220px" maxHeight="370px" color="#787F88" mb="48px" mr="30px">
      <Box mb="16px">
        <P14B>{template?.name}</P14B>
      </Box>
      <StyledPreview>
        <Email
          brandInfo={brandInfo}
          we={we}
          editorContent={template?.content}
          editorProperties={editorProperties}
          preview
          buttonText={template.actionText}
          buttonLink={template.actionLink}
        />

        <Box display="flex" justifyContent="center">
          <StyledButton color="inherit" variant="outlined" type="button" onClick={handleModal}>
            {t(`Preview`)}
          </StyledButton>
        </Box>
      </StyledPreview>
      <PreviewModal isOpen={modal} toggleIsOpen={handleModal} title={template?.name}>
        <Email
          boxShadow="none"
          brandInfo={brandInfo}
          we={we}
          editorContent={template?.content}
          editorProperties={editorProperties}
          preview
          previewModal
          buttonText={template.actionText}
          buttonLink={template.actionLink}
        />
      </PreviewModal>
    </Box>
  );
};

EmailPreview.propTypes = {
  we: PropTypes.string.isRequired,
  template: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    subject: PropTypes.string,
    content: PropTypes.string,
    actionText: PropTypes.string,
    actionLink: PropTypes.string,
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
  ),
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
};
EmailPreview.defaultProps = {
  editorProperties: [],
};

export default EmailPreview;
