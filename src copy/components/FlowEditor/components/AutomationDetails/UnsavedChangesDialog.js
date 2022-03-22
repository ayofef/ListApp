import React from 'react';
import { bool, func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { StyledDialog, StyledDialogActions, StyledPaper } from '../../../Dialog/styled';
import THEME from '../../../../constants/theme';
import { L16B } from '../../../atoms/Typography/L16B';
import { ButtonRounded, P14 } from '../../../atoms';
import { useFlowEditorContext } from '../../context';

const UnsavedChangesDialog = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { setSelectedElementId } = useFlowEditorContext();

  const handleLeave = () => {
    setSelectedElementId(null);
    setOpen(false);
  };

  return (
    <StyledDialog
      open={open}
      scroll="paper"
      maxWidth="xs"
      PaperComponent={StyledPaper}
      aria-labelledby="UnsavedChangesDialog"
      width="337px"
    >
      <Box padding="24px">
        <L16B padding="0 0 12px 0">{t('You Have Unsaved Changes')}</L16B>
        <P14 color={THEME.greyColors.grey11} padding="0 0 24px 0">
          {t('You‘ve already started configuring your node. Did you want to keep editing?')}
        </P14>
        <StyledDialogActions $justifyContent="flex-end" px="0" py="0">
          <ButtonRounded type="button" color="primary" onClick={handleLeave}>
            {t('Leave anyway')}
          </ButtonRounded>
          <ButtonRounded type="button" variant="contained" color="primary" onClick={() => setOpen(false)}>
            {t('Keep editing')}
          </ButtonRounded>
        </StyledDialogActions>
      </Box>
    </StyledDialog>
  );
};

UnsavedChangesDialog.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default UnsavedChangesDialog;
