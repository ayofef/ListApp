import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import Box from '@material-ui/core/Box';
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
} from '../../../../../../../components/Dialog/styled';
import FormControl from '../../../../../../../components/forms/_common/FormControl';
import PaymentFlowList from './PaymentFlowList';
import { initialValues, validationSchema, FIELDS_MAP } from './formSettings';
import CloseButton from '../../../../../../../components/Dialog/CloseButton';

const ID = 'select-payment-flow-id';

const SelectFlowDialog = ({ handleSubmit, isOpen, toggleIsOpen, linkedPaymentFlows, paymentFlowLoading }) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount
      enableReinitialize
    >
      <Form>
        <StyledDialog
          open={isOpen}
          scroll="paper"
          maxWidth="sm"
          PaperComponent={StyledPaper}
          onClose={toggleIsOpen}
          aria-labelledby={ID}
        >
          <CloseButton onClick={toggleIsOpen} />

          <StyledDialogTitle padding="20px 32px" id={`${ID}-title`} disableTypography>
            {t('Payment History')}
          </StyledDialogTitle>

          <StyledDialogContent px="27px 0 32px">
            <Box minWidth="420px" pb="24px" mt="16px">
              <PaymentFlowList
                name={FIELDS_MAP.flowId}
                linkedPaymentFlows={linkedPaymentFlows}
                paymentFlowLoading={paymentFlowLoading}
              />
            </Box>
          </StyledDialogContent>

          <StyledDialogActions>
            <FormControl toggleIsOpen={toggleIsOpen} primaryText="Import" />
          </StyledDialogActions>
        </StyledDialog>
      </Form>
    </Formik>
  );
};

SelectFlowDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  linkedPaymentFlows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  paymentFlowLoading: PropTypes.bool.isRequired,
};

export default SelectFlowDialog;
