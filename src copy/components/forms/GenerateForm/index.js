/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, capitalize } from '@material-ui/core';
import { useCopyToClipboard } from 'react-use';
import { NotificationManager } from 'react-notifications';
import PaymentMethodForm from './components/PaymentMethodForm';
import { APM_KEY } from '../../../pages/ConnectionsPage/components/constant';
import { Button, ButtonRounded, CircularLoader } from '../../atoms';
import { FlexContainer } from '../../atoms/flex/FlexContainer';
import useGenerateBlock from './hook/useGenerateBlock';
import ConnectionForm from './components/ConnectionForm';
import { getConnectionModalDescription } from './constant';

const FormNewRequestForm = ({
  values,
  errors,
  handleChange,
  handleBlur,
  data,
  handleSubmit,
  setShowModal,
  loading,
  isModal,
  setFieldValue,
  action,
  animatedLabel,
  customButtonProps,
  isConnectionForm,
  connectionName,
  connectionLogo,
  handleClose,
  multipleFlowEnabled,
  connectionCategory,
}) => {
  const { t } = useTranslation();
  const { blocks = [], form = '', supportedPaymentMethods = [] } = data;

  const [showErrors, setShowErrors] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard();

  const { generateBlockFn } = useGenerateBlock({
    copyToClipboard,
    showErrors,
    setShowErrors,
    values,
    setFieldValue,
    errors,
    handleChange,
    handleBlur,
  });

  const description = getConnectionModalDescription(connectionName, connectionCategory);

  useEffect(() => {
    if (state?.value) {
      NotificationManager.success('Link copied to the clipboard', t('uiMessages.great'), 5000);
    }
  }, [state, t]);

  const handleSubmitHandler = () => {
    setShowErrors(true);
    handleSubmit();
  };

  const generateButton = () => {
    if (animatedLabel) {
      return (
        <>
          <Button
            type="button"
            margin={`${isModal ? '40px' : 0} 16px 0 0`}
            onClick={handleSubmitHandler}
            loading={loading}
            className="blue"
            disabled={loading}
          >
            {t(`buttonsText.confirmAction.${action}`)}
          </Button>

          {data.closeBtn && (
            <Button likeDisabled onClick={setShowModal}>
              {capitalize(t('buttonsText.Close') ?? '')}
            </Button>
          )}
        </>
      );
    }
    return (
      <FlexContainer justifyContent="flex-end" width="100%">
        {!data.hideClose && data.closeBtn && (
          <Box mr="16px">
            <ButtonRounded type="button" variant="contained" color="secondary" onClick={setShowModal}>
              {capitalize(t('buttonsText.Close') ?? '')}
            </ButtonRounded>
          </Box>
        )}
        {!data.hideSubmit && (
          <ButtonRounded
            type="button"
            disabled={loading}
            variant="contained"
            color="primary"
            onClick={data.isComplete ? handleClose : handleSubmitHandler}
          >
            {loading ? (
              <CircularLoader size={20} bgcolor="#fff" />
            ) : (
              capitalize(t(data.isComplete ? 'Complete' : 'Continue') ?? '')
            )}
          </ButtonRounded>
        )}
      </FlexContainer>
    );
  };

  const isApmForm = form === APM_KEY && multipleFlowEnabled;

  return (
    <>
      {isApmForm && <PaymentMethodForm supportedPaymentMethods={supportedPaymentMethods} />}

      {isConnectionForm && !isApmForm && (
        <ConnectionForm
          copyToClipboard={copyToClipboard}
          connectionName={connectionName}
          connectionLogo={connectionLogo}
          description={description}
          form={blocks}
          values={values}
          showErrors={showErrors}
          setShowErrors={setShowErrors}
          errors={errors}
          setFieldValue={setFieldValue}
          handleChange={handleChange}
          handleBlur={handleBlur}
          animatedLabel={animatedLabel}
        />
      )}

      {!isConnectionForm && (
        <Box>
          {blocks.map((item, index) => (
            <Box key={`${item.type}-${item.block_id}-${index}`}>{generateBlockFn(item)}</Box>
          ))}
        </Box>
      )}

      <Box
        display="flex"
        width="100%"
        margin={isModal ? 'auto' : '20px 0 0'}
        {...(customButtonProps && { ...customButtonProps })}
      >
        {generateButton()}
      </Box>
    </>
  );
};

FormNewRequestForm.propTypes = {
  values: shape({}).isRequired,
  errors: shape({}).isRequired,
  data: shape({}).isRequired,
  handleChange: func.isRequired,
  handleBlur: func.isRequired,
  handleSubmit: func.isRequired,
  setShowModal: func.isRequired,
  setFieldValue: func.isRequired,
  loading: bool,
  isModal: bool,
  action: string,
  animatedLabel: bool,
  customButtonProps: shape({}),
  isConnectionForm: bool,
  connectionName: string,
  connectionLogo: string,
  handleClose: func,
  multipleFlowEnabled: bool,
  connectionCategory: string,
};

FormNewRequestForm.defaultProps = {
  loading: false,
  isModal: false,
  action: 'submit',
  animatedLabel: true,
  customButtonProps: undefined,
  isConnectionForm: false,
  connectionName: '',
  connectionLogo: null,
  handleClose: () => {},
  multipleFlowEnabled: false,
  connectionCategory: '',
};

export default withRouter(FormNewRequestForm);
