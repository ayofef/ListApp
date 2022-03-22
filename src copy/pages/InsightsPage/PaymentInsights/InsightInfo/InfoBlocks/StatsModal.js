import React from 'react';
import { bool, string, func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
} from '../../../../../components/Dialog/styled';
import CloseButton from '../../../../../components/Dialog/CloseButton';

const ID = 'insights-stats-modal';

const StatsModal = ({ name, isOpen, toggleIsOpen, children }) => {
  const { t } = useTranslation();

  return (
    <StyledDialog
      open={isOpen}
      scroll="paper"
      maxWidth="xs"
      width="496px"
      PaperComponent={StyledPaper}
      onClose={toggleIsOpen}
      aria-labelledby={ID}
    >
      <CloseButton onClick={toggleIsOpen} />

      <StyledDialogTitle id={`${ID}-title`} disableTypography>
        {t(name)}
      </StyledDialogTitle>

      <StyledDialogContent>
        <Box width="100%" minWidth="424px" pb="24px" mt="16px">
          {children}
        </Box>
      </StyledDialogContent>
    </StyledDialog>
  );
};

StatsModal.propTypes = {
  name: string.isRequired,
  isOpen: bool.isRequired,
  toggleIsOpen: func.isRequired,
};

export default StatsModal;
