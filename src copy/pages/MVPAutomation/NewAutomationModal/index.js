import React, { useState } from 'react';
import { bool, func, string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { StyledDialog, StyledPaper } from '../../../components/Dialog/styled';
import BlankOrTemplateScreen from './BlankOrTemplateScreen';
import ChooseTemplateScreen from './ChooseTemplateScreen';
import { UI_ROUTES } from '../../../constants/routes';
import CloseButton from '../../../components/Dialog/CloseButton';

const ID = 'new-automation-modal';

const NewAutomationModal = ({ isOpen, toggleIsOpen, templateId, flowId }) => {
  const [shouldShowTemplates, setShouldShowTemplates] = useState(false);
  const { push } = useHistory();
  const handleSelection = (_shouldShowTemplates) => {
    if (_shouldShowTemplates) {
      setShouldShowTemplates(true);
    } else {
      push(`${UI_ROUTES.automationsTemplatesBasic}/${templateId}/${flowId}`);
    }
  };
  return (
    <StyledDialog
      open={isOpen}
      scroll="paper"
      maxWidth="xl"
      PaperComponent={StyledPaper}
      onClose={toggleIsOpen}
      aria-labelledby={ID}
    >
      <CloseButton onClick={toggleIsOpen} />
      {!shouldShowTemplates ? <BlankOrTemplateScreen handleSelection={handleSelection} /> : <ChooseTemplateScreen />}
    </StyledDialog>
  );
};
NewAutomationModal.propTypes = {
  isOpen: bool.isRequired,
  toggleIsOpen: func.isRequired,
  templateId: string.isRequired,
  flowId: string.isRequired,
};

export default NewAutomationModal;
