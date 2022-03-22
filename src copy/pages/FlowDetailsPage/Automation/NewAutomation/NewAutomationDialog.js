import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { Form, Formik } from 'formik';
import { initialValues, validationSchema } from './formSettings';
import NameField from './NameField';
import RunsSelectField from './RunsSelectField';
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
} from '../../../../components/Dialog/styled';
import FormActions from '../../../../components/forms/_common/FormControl';
import CloseButton from '../../../../components/Dialog/CloseButton';

const ID = 'new-substage-automation';

const NewAutomationDialog = ({ toggleIsOpen, isOpen, onSubmit }) => {
  const { t } = useTranslation();

  return (
    <StyledDialog
      open={isOpen}
      scroll="paper"
      maxWidth="sm"
      PaperComponent={StyledPaper}
      onClose={toggleIsOpen}
      aria-labelledby={ID}
    >
      <CloseButton onClick={toggleIsOpen} />
      <StyledDialogTitle id={`${ID}-title`} disableTypography>
        {t('Create new automation')}
      </StyledDialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
        enableReinitialize
      >
        <Form>
          <StyledDialogContent>
            <Box minWidth="400px">
              <NameField />
              <RunsSelectField />
            </Box>
          </StyledDialogContent>

          <StyledDialogActions>
            <FormActions toggleIsOpen={toggleIsOpen} primaryText="Create automation" />
          </StyledDialogActions>
        </Form>
      </Formik>
    </StyledDialog>
  );
};

NewAutomationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewAutomationDialog;
