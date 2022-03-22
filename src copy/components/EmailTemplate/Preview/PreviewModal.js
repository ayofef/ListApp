import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
} from '../../Dialog/styled';
import CloseButton from '../../Dialog/CloseButton';

const ID = 'email-template-preview';

const PreviewModal = ({ isOpen, toggleIsOpen, children, title }) => {
  return (
    <StyledDialog
      open={isOpen}
      scroll="paper"
      maxWidth="lg"
      PaperComponent={StyledPaper}
      onClose={toggleIsOpen}
      aria-labelledby={ID}
    >
      <CloseButton onClick={toggleIsOpen} />
      <StyledDialogTitle>{title}</StyledDialogTitle>
      <StyledDialogContent px="0">{children}</StyledDialogContent>
      <StyledDialogActions>&nbsp;</StyledDialogActions>
    </StyledDialog>
  );
};

PreviewModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
};

export default PreviewModal;
