import React from 'react';
import { bool, func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { StyledDialog, StyledDialogActions, StyledPaper } from '../Dialog/styled';
import THEME from '../../constants/theme';
import { ButtonRounded, P14 } from '../atoms';
import { L16B } from '../atoms/Typography/L16B';
import { ExternalLink } from '../../pages/FlowDetailsPage/Sidebar/styled';
import ArrowUpRight from '../../assets/icons/ArrowUpRight';

const BlankAutomationDialog = ({ open, setOpen }) => {
  const { t } = useTranslation();

  return (
    <StyledDialog
      open={open}
      scroll="paper"
      maxWidth="xs"
      PaperComponent={StyledPaper}
      aria-labelledby="BlankAutomationDialog"
      width="337px"
    >
      <Box padding="24px">
        <L16B padding="0 0 12px 0">{t(`Can't Start an Empty Automation`)}</L16B>
        <P14 color={THEME.greyColors.grey11} padding="0 0 24px 0">
          {t('Please build an awesome automation before starting. You can learn about how to use our no-code canvas ')}
          <ExternalLink
            href="https://documentation.whenthen.com/no-code-wiki"
            target="_blank"
            noUnderline
            fontSize="10px"
            color={THEME.greyColors.grey11}
            $lineHeight="14px"
          >
            {t('here')}
            <ArrowUpRight />
          </ExternalLink>
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

BlankAutomationDialog.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default BlankAutomationDialog;
