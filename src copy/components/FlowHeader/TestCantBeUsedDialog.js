import React from 'react';
import { bool, func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { StyledDialog, StyledDialogActions, StyledPaper } from '../Dialog/styled';
import THEME from '../../constants/theme';
import { ButtonRounded, P14 } from '../atoms';
import { L16B } from '../atoms/Typography/L16B';

const TestCantBeUsedDialog = ({ open, setOpen }) => {
  const { t } = useTranslation();

  return (
    <StyledDialog
      open={open}
      scroll="paper"
      maxWidth="xs"
      PaperComponent={StyledPaper}
      aria-labelledby="TestCantBeUsedDialog"
      width="337px"
    >
      <Box padding="24px">
        <L16B padding="0 0 12px 0">{t('Testing is not available')}</L16B>
        <P14 color={THEME.greyColors.grey11} padding="0 0 24px 0">
          {t('Testing is not currently available for Payment Instruct Automations')}
        </P14>
        <StyledDialogActions $justifyContent="flex-end" px="0" py="0">
          <ButtonRounded type="button" variant="contained" color="primary" onClick={() => setOpen(false)}>
            {t('Back to Build')}
          </ButtonRounded>
        </StyledDialogActions>
      </Box>
    </StyledDialog>
  );
};

TestCantBeUsedDialog.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default TestCantBeUsedDialog;
