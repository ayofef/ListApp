import React, { useMemo, useState, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';

import { StyledBox } from './styled';

import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
  StyledScrollIndicator,
} from '../../../../components/Dialog/styled';
import WhenThenLogo from '../../../../assets/img/WhenThenLogo.png';
import { Connect } from '../../../../assets/icons';
import CircleImage from '../../../../components/table/CircleImage';
import { H2, P14 } from '../../../../components/atoms';
import THEME from '../../../../constants/theme';
import PaymentMethods from '../PaymentMethods';
import { validationSchema, initialValues, FIELDS } from './formSettings';
import Actions from './Actions';
import { COMMON_STYLES, ID, SCROLL_INDICATOR_OFFSET, TITLE, DESC } from './constant';
import { useSetPaymentMethods } from '../../hooks/useSetPaymentMethods';
import { UI_ROUTES } from '../../../../constants/routes';
import CloseButton from '../../../../components/Dialog/CloseButton';
import { handleScrollIndicator } from '../../../../components/Dialog/handleScrollIndicator';

const PaymentMethodDialog = ({ connection, toggleIsOpen, connectData, handleCallback, avoidRedirect }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const connectionTitle = useMemo(() => connection?.company?.name, [connection?.company?.name]);
  const { handleSetPaymentMethods } = useSetPaymentMethods({ connectionId: connectData?.id });
  const [scroll, setScroll] = useState(true);
  const toggleScrollIndicator = useCallback(() => setScroll((prevState) => !prevState), []);

  const handleContentScroll = useCallback(
    (e) => {
      handleScrollIndicator(e, scroll, toggleScrollIndicator, SCROLL_INDICATOR_OFFSET);
    },
    [scroll, toggleScrollIndicator]
  );

  const handleClose = useCallback(() => {
    toggleIsOpen();
  }, [toggleIsOpen]);

  const handleDisallowBubbling = (e) => {
    e.stopPropagation();
  };

  const onSubmitCallback = () => {
    /**
     * On submit -> close the modal handle redirect and callback
     * Note: Logic here must match what we have in handleListener function (on success)
     * in connectionsHooks
     * */

    if (!avoidRedirect) {
      history.push(`${UI_ROUTES.connectionDetails}/${connectData?.id}`);
    }
    if (typeof handleCallback === 'function') {
      handleCallback(connectData?.id);
    }
    toggleIsOpen();
  };

  const handleSubmit = ({ methods }, actions) => {
    actions.setSubmitting(true);
    handleSetPaymentMethods({
      methods,
      callback: () => {
        actions.setSubmitting(false);
        onSubmitCallback();
      },
    });
  };
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
          open={true}
          scroll="paper"
          maxWidth="xl"
          PaperComponent={StyledPaper}
          onClose={handleClose}
          aria-labelledby={ID}
          onClick={handleDisallowBubbling}
        >
          <CloseButton onClick={handleClose} top="34px" />

          <StyledDialogTitle padding="30px 24px" id={`${ID}-title`} disableTypography>
            <Box display="flex" alignItems="center">
              <CircleImage text="WhenThen" logo={WhenThenLogo} size={44} />
              <Box mx="16px">
                <Connect />
              </Box>
              <CircleImage text={connectionTitle} logo={connection?.company?.logo ?? ''} size={44} />
            </Box>
          </StyledDialogTitle>

          <StyledDialogContent px="0 0 32px">
            <Box width="1060px">
              <Box display="flex" height="480px">
                <Box {...COMMON_STYLES} borderRight="1px solid rgba(193, 195, 198, 0.2)" pl="0">
                  <H2 fontWeight="700" margin="0 0 24px 0" width="369px">
                    {t(TITLE)}
                  </H2>
                  <P14 margin="0 0 16px 0" color={THEME.greyColors.grey11} width="369px">
                    {t(DESC)}
                  </P14>
                  <P14 color={THEME.greyColors.grey11} width="369px">
                    {t(DESC)}
                  </P14>
                </Box>

                <Box {...COMMON_STYLES} pr="0" py="0" position="relative">
                  <StyledBox overflow="auto" width="100%" onScroll={handleContentScroll} py="40px" pr="32px">
                    <PaymentMethods
                      name={FIELDS.methods}
                      supportedPaymentMethods={connection?.supportedPaymentMethods}
                      enabledPaymentMethods={connection?.enabledPaymentMethods}
                    />
                  </StyledBox>
                  <StyledScrollIndicator scrollEnd={!scroll}>&nbsp;</StyledScrollIndicator>
                </Box>
              </Box>
            </Box>
          </StyledDialogContent>
          <StyledDialogActions px="24px" py="32px" $borderTop $justifyContent="flex-end">
            <Actions toggleIsOpen={handleClose} />
          </StyledDialogActions>
        </StyledDialog>
      </Form>
    </Formik>
  );
};

PaymentMethodDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
  connectData: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  connection: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
      logo: PropTypes.string,
    }),
    supportedPaymentMethods: PropTypes.arrayOf(PropTypes.string),
    enabledPaymentMethods: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  handleCallback: PropTypes.func,
  avoidRedirect: PropTypes.bool.isRequired,
};

PaymentMethodDialog.defaultProps = {
  handleCallback: undefined,
};

export default PaymentMethodDialog;
