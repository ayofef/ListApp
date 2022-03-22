import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import { string, bool, shape, func } from 'prop-types';
import Box from '@material-ui/core/Box';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import NewRequestForm from '../../../components/forms/GenerateForm';
import { generateFormFields, isDefined } from '../../../utils/helpers';
import { useGlobalContext } from '../../../containers/App/context';
import ConnectionFormSkeleton from './ConnectionFormSkeleton';
import { CUSTOM_BUTTON_PROPS, APM_KEY, WT_CONNECTION_FORM_ID } from './constant';
import { StyledDialog, StyledDialogActions, StyledDialogContent, StyledPaper } from '../../../components/Dialog/styled';
import { initialValues, validationSchema } from './PaymentMethodDialog/formSettings';
import { useSetPaymentMethods } from '../hooks/useSetPaymentMethods';
import { useFeature } from '../../../hooks/useFeature';
import { FEATURE_TOGGLES_KEYS } from '../../../constants/featureToggles';
import ConnectionFormModalHeader from './ConnectionFormModalHeader';

const ConnectionFormModal = ({
  connectData,
  connectionDetails,
  toggleModalShown,
  modalShown,
  handleConnectionForm,
  connectionLogo,
  loading,
  redirectUrl,
  avoidRedirect,
  handleCallback,
  setConnectData,
  goBack,
}) => {
  const [multipleFlowEnabled] = useFeature(FEATURE_TOGGLES_KEYS.MULTIPLE_FLOW);
  const { push } = useHistory();
  const { globalLoading, setGlobalLoading } = useGlobalContext();
  const { handleSetPaymentMethods } = useSetPaymentMethods({ connectionId: connectData?.id });
  const connectionDetailsRef = useRef(null);

  const connection = useMemo(() => connectionDetailsRef?.current ?? connectionDetails ?? {}, [connectionDetails]);

  const connectionCategory = connection?.company?.categories?.[0] ?? '';

  useEffect(() => {
    if (connectionDetails?.id) {
      connectionDetailsRef.current = connectionDetails;
    }
  }, [connectionDetails]);

  const dataRequest = useMemo(
    () =>
      connectData?.currentStep?.form === APM_KEY
        ? {
            form: APM_KEY,
            supportedPaymentMethods: connection?.supportedPaymentMethods,
            initialValues,
            validationSchema,
          }
        : generateFormFields(connectData.id, connectData),
    [connectData, connection?.supportedPaymentMethods]
  );

  const isApmForm = multipleFlowEnabled && dataRequest?.form === APM_KEY;
  const connectionTitle = connection?.company?.name;

  const handleDisallowBubbling = (e) => {
    e.stopPropagation();
  };

  const handleRedirect = useCallback(() => {
    if (redirectUrl) {
      if (!avoidRedirect) {
        push(redirectUrl);
      }
      handleCallback(connectData?.id);
    }
  }, [redirectUrl, avoidRedirect, handleCallback, connectData?.id, push]);

  const handleGoBack = () => {
    goBack();
    handleRedirect();
  };

  const handleClose = useCallback(() => {
    toggleModalShown();
    handleRedirect();
  }, [toggleModalShown, handleRedirect]);

  const handleApmSubmit = ({ methods }) => {
    setGlobalLoading('connectionApmForm', true);
    handleSetPaymentMethods({
      methods,
      callback: () => {
        setGlobalLoading('connectionApmForm', false);
        const configForm = connectData?.steps?.find((el) => el?.type === 'NEEDS_CONFIG');
        //Has configForm ? update connect data
        if (isDefined(configForm)) {
          setConnectData((prevState) => {
            return {
              ...prevState,
              currentStep: {
                form: configForm?.form,
              },
            };
          });

          return;
        }
        handleClose();
      },
    });
  };

  return (
    <StyledDialog
      scroll="paper"
      maxWidth="xl"
      $height="700px"
      PaperComponent={StyledPaper}
      aria-labelledby={WT_CONNECTION_FORM_ID}
      onClick={handleDisallowBubbling}
      open={modalShown}
      onClose={handleClose}
    >
      {loading ? (
        <ConnectionFormSkeleton />
      ) : (
        <>
          <ConnectionFormModalHeader id={WT_CONNECTION_FORM_ID} handleClose={handleClose} handleGoBack={handleGoBack} />

          <StyledDialogContent px="0 0 32px">
            <Formik
              validationSchema={dataRequest.validationSchema}
              initialValues={dataRequest.initialValues}
              enableReinitialize
              displayName={dataRequest.displayName}
              onSubmit={isApmForm ? handleApmSubmit : handleConnectionForm}
            >
              {(props) => {
                return (
                  <Form autoComplete="off">
                    <Box width="1040px">
                      <NewRequestForm
                        {...props}
                        data={dataRequest}
                        setShowModal={toggleModalShown}
                        loading={globalLoading}
                        animatedLabel={false}
                        customButtonProps={CUSTOM_BUTTON_PROPS}
                        isConnectionForm
                        connectionName={connectionTitle}
                        connectionLogo={connection.company?.logo ?? connectionLogo}
                        handleClose={handleClose}
                        multipleFlowEnabled={multipleFlowEnabled}
                        connectionCategory={connectionCategory}
                      />
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </StyledDialogContent>

          <StyledDialogActions px="24px" py="42px" $borderTop>
            &nbsp;
          </StyledDialogActions>
        </>
      )}
    </StyledDialog>
  );
};

ConnectionFormModal.propTypes = {
  connectData: shape({
    id: string,
  }).isRequired,
  connectionDetails: shape({
    name: string,
    company: shape({
      name: string,
    }),
  }),
  toggleModalShown: func.isRequired,
  modalShown: bool.isRequired,
  handleConnectionForm: func.isRequired,
  connectionLogo: string,
  loading: bool,
  redirectUrl: string,
  avoidRedirect: bool.isRequired,
  handleCallback: func.isRequired,
  setConnectData: func.isRequired,
  goBack: func.isRequired,
};
ConnectionFormModal.defaultProps = {
  connectionDetails: {},
  connectionLogo: '',
  loading: false,
  redirectUrl: null,
};
export default ConnectionFormModal;
