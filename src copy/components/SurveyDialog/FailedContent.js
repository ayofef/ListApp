import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import Close from '@material-ui/icons/Close';
import { P14 } from '../atoms';
import { StyledCheck } from './styled';
import Check from '../../assets/icons/FlowStages/Check';
import { useDialogContext } from './DialogContext';
import { StyledIconButton } from '../atoms/Buttons/StyledIconButton';

const PROGRESS_TEXTS = 'A WhenThen pay geek will be in touch to support you.';

const FailedContent = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const { setFieldValue, values, handleSubmit } = useFormikContext();
  const { handleClose } = useDialogContext();

  useEffect(() => {
    setFieldValue('failed', 'true');
    if (values?.failed === 'true' && !submitted) {
      handleSubmit();
      setSubmitted(true);
    }
  }, [setFieldValue, values, handleSubmit, submitted, setSubmitted]);

  return (
    <Box position="relative" display="flex" width="100%" height="100%" justifyContent="center" alignItems="center">
      <Box position="absolute" top="8px" right="16px">
        <StyledIconButton type="button" onClick={handleClose}>
          <Close />
        </StyledIconButton>
      </Box>
      <Box display="flex" width="100%" flexDirection="column" alignItems="center">
        <StyledCheck>
          <Check fill="#4e40ef" />
        </StyledCheck>

        <Box component="p" mt="39px" fontSize="18px" fontWeight="600">
          {t('Thanks!')}
        </Box>
        <Box maxWidth="600px">
          <P14>{PROGRESS_TEXTS}</P14>
        </Box>
      </Box>
    </Box>
  );
};

export default FailedContent;
