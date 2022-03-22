import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import { CircularLoader } from '../../../../../components/atoms';
import { StyledDialog, StyledDialogTitle, StyledPaper } from '../../../../../components/Dialog/styled';
import VideoPlayer from '../../../../../components/VideoPlayer';
import ORCHESTRATE_IMAGE from '../../../../../assets/img/orchestrate-sample.png';
import { StyledVideoWrapper } from './styled';
import THEME from '../../../../../constants/theme';
import { isDefined } from '../../../../../utils/helpers';
import { useGetAutomationTemplates } from '../../../../FlowDetailsPage/hooks/useGetAutomationTemplates';
import CloseButton from '../../../../../components/Dialog/CloseButton';

const ID = 'flow-editor-preview-automation';

const PreviewAutomationTemplateDialog = ({ isOpen, toggleIsOpen }) => {
  const { t } = useTranslation();
  const params = useParams();
  const [videoError, setVideoError] = useState(null);
  const { templates, loading } = useGetAutomationTemplates();

  const currentTemplate = templates?.find((template) => template.template?.id === params.templateId);

  const handleVideoStateChange = (state) => {
    setVideoError(state?.error);
  };

  return (
    <StyledDialog
      open={isOpen}
      scroll="paper"
      maxWidth="lg"
      PaperComponent={StyledPaper}
      onClose={toggleIsOpen}
      aria-labelledby={ID}
    >
      <CloseButton onClick={toggleIsOpen} top="20px" />

      <StyledDialogTitle padding="24px 24px" id={`${ID}-title`} disableTypography $noborder>
        {t(currentTemplate?.name)}
      </StyledDialogTitle>

      <Box
        width="100%"
        height="500px"
        position="relative"
        overflow="hidden"
        boxSizing="border-box"
        display="flex"
        justifyContent="center"
        alignItems="center"
        margin="0 auto"
        bgcolor={THEME.greyColors.grey12}
      >
        {loading && <CircularLoader />}
        {/* Show image is theres an error on the video or if the video url is undefined or null */}
        {!loading && (isDefined(videoError) || !isDefined(currentTemplate?.videoOnWebApp)) && (
          <Box src={currentTemplate?.imageWebApp || ORCHESTRATE_IMAGE} component="img" alt={ID} width="100%" />
        )}

        {/* when video url is undefined or null, it doesn't trigger error state so only show video when url is defined and no errors  */}
        {!loading && !isDefined(videoError) && isDefined(currentTemplate?.videoOnWebApp) && (
          <StyledVideoWrapper>
            <VideoPlayer
              src={currentTemplate?.videoOnWebApp}
              handleVideoStateChange={handleVideoStateChange}
              hideControl
              disableButton
              autoPlay
              muted
              fluid
            />
          </StyledVideoWrapper>
        )}
      </Box>
    </StyledDialog>
  );
};

PreviewAutomationTemplateDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
};

export default PreviewAutomationTemplateDialog;
