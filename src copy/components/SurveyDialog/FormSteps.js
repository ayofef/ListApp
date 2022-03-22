import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Close from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import { useTranslation } from 'react-i18next';
import { StyledDialogActions, StyledDialogTitle } from './styled';
import FormControl from './FormControl';
import { STEPS } from './formSettings';
import { useDialogContext } from './DialogContext';
import { useStepsContext } from './StepsContext';
import StyledLinearProgress from '../styled/StyledLinearProgress';
import { StyledIconButton } from '../atoms/Buttons/StyledIconButton';

const FormSteps = ({ id }) => {
  const { t } = useTranslation();
  const { handleClose } = useDialogContext();
  const { currentStep } = useStepsContext();
  const stepSettings = STEPS[currentStep];
  const field = stepSettings?.field;
  const width = stepSettings?.width;
  const Component = field?.component;
  const props = field?.props;
  const progress = stepSettings?.progress;

  return (
    <>
      <StyledDialogTitle id={`${id}-title`} disableTypography>
        <Box
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p="8px 16px"
          borderBottom="1px solid rgba(193, 195, 198, 0.3)"
        >
          <Box display="flex" alignItems="center" height="40px" maxWidth="184px" flexGrow="1">
            <StyledLinearProgress variant="determinate" value={progress} />
          </Box>

          <Box position="absolute" top="8px" right="16px">
            <StyledIconButton type="button" onClick={handleClose}>
              <Close />
            </StyledIconButton>
          </Box>
        </Box>

        {stepSettings && (
          <Box display="flex" flexDirection="column" alignItems="center" mt="40px" lineHeight="24px">
            <Box component="h3" m="0" fontSize="16px">
              {t(stepSettings.questions)}
            </Box>

            <Box component="p" m="0" color="#787f88">
              {t(stepSettings.tip)}
            </Box>
          </Box>
        )}
      </StyledDialogTitle>

      <DialogContent>
        <Box display="flex" justifyContent="center" mt="24px">
          {Component && props ? (
            <Box minWidth="152px" maxWidth="312px" width={width}>
              <Component name={currentStep} {...props} />
            </Box>
          ) : null}
        </Box>
      </DialogContent>

      <StyledDialogActions disableSpacing>
        <FormControl getNextStep={stepSettings?.getNextStep} />
      </StyledDialogActions>
    </>
  );
};

FormSteps.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FormSteps;
