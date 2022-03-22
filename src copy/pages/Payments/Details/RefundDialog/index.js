import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import Box from '@material-ui/core/Box';
import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { useParams } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import FullRefundToggle from './FullRefundToggle';
import RefundAmountInput from './RefundAmountInput';
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
} from '../../../../components/Dialog/styled';
import { usePaymentsDetailsContext } from '../../../DataTables/PaymentDetails/PaymentDetailsContext';

import FormControl from '../../../../components/forms/_common/FormControl';
import { validationSchema } from './formSettings';
import { REFUND_PAYMENT } from '../../../../utils/queries/payments/paymentsMutation';
import SuccessScreen from './SuccessScreen';
import ReasonInput from './ReasonInput';
import { isDefined } from '../../../../utils/helpers';
import CloseButton from '../../../../components/Dialog/CloseButton';

const ID = 'refund-payment';
const TOAST_TIMEOUT = 5000;

const RefundDialog = ({ isOpen, toggleIsOpen }) => {
  const { t } = useTranslation();
  const [successScreen, setSuccessScreen] = useState(false);

  const [refundPaymentInternal] = useMutation(REFUND_PAYMENT, {
    context: { skipGlobalHandling: true },
  });
  const { pageContentData, pageContentRefetch } = usePaymentsDetailsContext();

  const currency = useMemo(() => pageContentData?.currency?.value, [pageContentData]);
  const params = useParams();
  const toggleSuccessScreen = useCallback(() => {
    setSuccessScreen((prevState) => !prevState);
  }, []);

  const onSubmit = useCallback(
    ({ amount, reason, fullRefund }, actions) => {
      const refundAmount = fullRefund ? undefined : amount;

      refundPaymentInternal({
        variables: {
          id: params?.detailsId,
          amount: refundAmount,
          reason,
        },
      })
        .then((res) => {
          if (!isEmpty(res?.errors)) {
            NotificationManager.error(
              t(res.errors[0]?.message?.replaceAll(':', '_')), //react-i18next parses ":" and only returns the text after
              t('Refund Payment Error'),
              TOAST_TIMEOUT
            );
            return;
          }

          if (isDefined(res?.data?.refundPaymentInternal?.id)) {
            toggleSuccessScreen();
            pageContentRefetch();
          }
        })
        .catch((e) => {
          return NotificationManager.error(e?.message, e?.name, TOAST_TIMEOUT);
        })
        .finally(() => {
          actions.setSubmitting(false);
          actions.resetForm();
        });
    },
    [pageContentRefetch, t, refundPaymentInternal, params, toggleSuccessScreen]
  );

  return (
    <StyledDialog
      open={isOpen}
      scroll="paper"
      maxWidth="xs"
      PaperComponent={StyledPaper}
      onClose={toggleIsOpen}
      aria-labelledby={ID}
      width="496px"
    >
      <CloseButton onClick={toggleIsOpen} />

      <SuccessScreen showSuccess={successScreen} toggleSuccessScreen={toggleSuccessScreen} />

      <Formik
        initialValues={{ fullRefund: true }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur
        enableReinitialize
      >
        <Form>
          <StyledDialogTitle id={`${ID}-title`} disableTypography>
            {t('Refund')}
          </StyledDialogTitle>
          <StyledDialogContent>
            <Box pb="24px" mt="16px">
              <FullRefundToggle />
              <RefundAmountInput currency={currency} />
              <ReasonInput />
            </Box>
          </StyledDialogContent>

          <StyledDialogActions>
            <FormControl toggleIsOpen={toggleIsOpen} primaryText="Refund" />
          </StyledDialogActions>
        </Form>
      </Formik>
    </StyledDialog>
  );
};

RefundDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
};

export default RefundDialog;
