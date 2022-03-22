import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import isEmpty from 'lodash/isEmpty';

import { useLocation, useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';
import compact from 'lodash/compact';
import omit from 'lodash/omit';
import { isDefined } from '../utils/helpers';
import { parseBoolean } from '../utils/parseBoolean';
import { useFeature } from './useFeature';
import { FEATURE_TOGGLES_KEYS } from '../constants/featureToggles';
import { useLocalStorageState } from './storage';
import { isValidUrl } from '../utils/isValidUrl';

import {
  GET_CONNECTIONS,
  GET_CONNECTION_DETAILS,
  GET_CONNECTION_FEE,
} from '../utils/queries/connections/connectionsQueries';
import {
  RECONNECT_CONNECTION,
  DISCONNECT_CONNECTION,
  CHANGE_CONNECTION_NAME,
  CONNECT_CONNECTION,
  SAVE_CREDENTIALS,
  SAVE_CONNECTION_FORM,
  SET_CONNECTION_FEE,
} from '../utils/queries/connections/connectionsMutations';
import { useGlobalContext } from '../containers/App/context';
import { globalLoadingConst } from '../constants/globalLoadingConsts';
import { UI_ROUTES } from '../constants/routes';
import useSearch from './useSearch';
import ConnectionFormModal from '../pages/ConnectionsPage/components/ConnectionFormModal';
import PlaidModal from '../pages/ConnectionsPage/components/PlaidModal';
import PaymentMethodDialog from '../pages/ConnectionsPage/components/PaymentMethodDialog';
import { getFirstErrorMessage } from '../utils/graphql';

const CONNECTION_STATUS = {
  CONNECTED: 'CONNECTED',
  DISCONNECTED: 'DISCONNECTED',
  BROKEN: 'BROKEN',
  ARCHIVED: 'ARCHIVED',
  NOT_CONNECTED: 'NOT_CONNECTED',
};

export const GET_CONNECTION_LIST_VARIABLES = {
  variables: {
    status: [
      CONNECTION_STATUS.CONNECTED,
      CONNECTION_STATUS.NOT_CONNECTED,
      CONNECTION_STATUS.BROKEN,
      CONNECTION_STATUS.ARCHIVED,
    ],
  },
};

const FEES_MUTATION_OPTION = (id) => ({
  refetchQueries: [{ query: GET_CONNECTION_FEE, variables: { id } }],
  awaitRefetchQueries: true,
  context: { skipGlobalHandling: true },
});

const getConnections = GET_CONNECTIONS.definitions[0].name.value;

/**ON Connect (saveForm) get updated connection list and connection details */
const CONNECT_FORM_MUTATION_OPTION = (id) => ({
  refetchQueries: [
    { query: GET_CONNECTIONS, ...GET_CONNECTION_LIST_VARIABLES },
    getConnections,
    ...(id ? [{ query: GET_CONNECTION_DETAILS, variables: { id } }] : []),
  ],
  update(cache) {
    cache.modify({
      fields: {
        getFlowStepLibrary(refs, { DELETE }) {
          return DELETE;
        },
        listConnections(refs, { DELETE }) {
          return DELETE;
        },
        getConnections(refs, { DELETE }) {
          return DELETE;
        },
      },
    });
  },
  awaitRefetchQueries: true,
});

/**To refetch connections list for oauth connections
 * On successful connection, either from connections list or connections details we redirect to connection details.
 * On successful connection, we need to update the connections list when user go back to the list screen
 */
const REFETCH_CONNECTIONS_LIST_FLAG = 'wt_refetch_connections';

const TOAST_TIMEOUT = 5000;

export const useGetConnectionsLists = () => {
  const { data, error, loading, refetch } = useQuery(GET_CONNECTIONS, {
    ...GET_CONNECTION_LIST_VARIABLES,
    update(cache) {
      cache.modify({
        fields: {
          getFlowStepLibrary(refs, { DELETE }) {
            return DELETE;
          },
          listConnections(refs, { DELETE }) {
            return DELETE;
          },
          getConnections(refs, { DELETE }) {
            return DELETE;
          },
        },
      });
    },
  });

  useEffect(() => {
    const refetchFlag = localStorage.getItem(REFETCH_CONNECTIONS_LIST_FLAG);
    if (refetchFlag && parseBoolean(refetchFlag)) {
      localStorage.removeItem(REFETCH_CONNECTIONS_LIST_FLAG);
      refetch();
    }
  }, [refetch]);

  const connections = useMemo(() => {
    if (!loading && isEmpty(error)) {
      const connectionsObject = {};
      const connectionsList = compact(data?.listConnections || []);

      connectionsList.forEach((item) => {
        if (item.status === CONNECTION_STATUS.CONNECTED) {
          connectionsObject.connected = [...(connectionsObject.connected || []), item];
        }

        if (item.status === CONNECTION_STATUS.BROKEN) {
          connectionsObject.connected = [...(connectionsObject.connected || []), item];
        }
        if (item.status === CONNECTION_STATUS.NOT_CONNECTED) {
          connectionsObject.notConnected = [...(connectionsObject.notConnected || []), item];
        }

        if (item.status === CONNECTION_STATUS.ARCHIVED) {
          connectionsObject.archived = [...(connectionsObject.archived || []), item];
        }
      });
      return connectionsObject;
    }
    return {};
  }, [error, data, loading]);

  return {
    connections,
    directoryConnections: [...(connections.notConnected || [])],
    error,
    loading,
    refetch,
  };
};

export const useUpdateConnectionData = (id) => {
  const [reconnect, { loading: reconnectLoading }] = useMutation(RECONNECT_CONNECTION);
  const [disconnect, { loading: disconnectLoading }] = useMutation(
    DISCONNECT_CONNECTION,
    CONNECT_FORM_MUTATION_OPTION(id)
  );

  const [changeName, { loading: nameChangeLoading }] = useMutation(
    CHANGE_CONNECTION_NAME,
    CONNECT_FORM_MUTATION_OPTION(id)
  );
  const [saveForm, { loading: saveFormLoading }] = useMutation(SAVE_CONNECTION_FORM, CONNECT_FORM_MUTATION_OPTION(id));
  const [connect, { loading: connectingLoading }] = useMutation(CONNECT_CONNECTION);
  const [setFees, { loading: feesLoading }] = useMutation(SET_CONNECTION_FEE, FEES_MUTATION_OPTION(id));

  const [saveCredentials, { loading: saveCredentialsLoading }] = useMutation(SAVE_CREDENTIALS, {
    context: { skipGlobalHandling: true },
  });
  const { setGlobalLoading } = useGlobalContext();

  useEffect(() => {
    if (
      reconnectLoading ||
      disconnectLoading ||
      nameChangeLoading ||
      connectingLoading ||
      saveCredentialsLoading ||
      saveFormLoading ||
      feesLoading
    ) {
      setGlobalLoading(globalLoadingConst.connectionUpdate, true);
    } else {
      setGlobalLoading(globalLoadingConst.connectionUpdate, false);
    }
  }, [
    setGlobalLoading,
    connectingLoading,
    reconnectLoading,
    disconnectLoading,
    nameChangeLoading,
    saveCredentialsLoading,
    saveFormLoading,
    feesLoading,
  ]);

  return {
    saveForm,
    connect,
    disconnect,
    reconnect,
    changeName,
    saveCredentials,
    setFees,
  };
};

const WT_OAUTH_KEY = 'wt-0auth-payload-key';
const STORAGE_CONNECTION_ID_KEY = 'wt-storage-connection-id-key';
const PAYPAL_APM_KEY = 'wt-apm';

export const useHandleConnectionConnect = ({ connection, callback, avoidRedirect = false, closeModal }) => {
  const [multipleFlowEnabled] = useFeature(FEATURE_TOGGLES_KEYS.MULTIPLE_FLOW);
  const { setGlobalLoading } = useGlobalContext();
  const [searchParams, setSearchParams] = useSearch();
  const { t } = useTranslation();
  const isPlaid = connection?.name?.toLowerCase() === 'plaid' && connection.canConnect === true;
  const { connect, reconnect, saveCredentials, saveForm } = useUpdateConnectionData(connection?.id);
  const [modalShown, toggleModalShown] = useToggle(false);
  const [childWindow, setChildWindow] = useState(undefined);
  const [redirectUrl, setRedirectUrl] = useState(undefined);

  const [connectData, setConnectData] = useState({});
  const [oAuthData, setOAuthData] = useState({});

  const [plaidConnectionData, setPlaidData] = useState({});
  const location = useLocation();
  const history = useHistory();

  const [paymentMethodDialog, setPaymentMethodDialog] = useState(false);
  const togglePaymentMethodDialog = useCallback(() => setPaymentMethodDialog((prevState) => !prevState), []);
  const [storageConnectionId, setStorageConnectionId, removeStorageConnectionId] = useLocalStorageState(
    STORAGE_CONNECTION_ID_KEY,
    ''
  );

  const togglePaymentsModals = () => {
    if (closeModal) {
      closeModal();
      if (modalShown) {
        toggleModalShown();
      }
    } else {
      toggleModalShown();
    }
  };

  const handleCallback = useCallback(
    (id) => {
      if (typeof callback === 'function') {
        callback(id);
        return true;
      }
      return true;
    },
    [callback]
  );

  const handleListener = useCallback(
    (e) => {
      if (e && typeof e?.data === 'string') {
        const payload = JSON.parse(e?.data);
        const id = payload?.res?.id;
        const connectionStep = payload?.res?.steps ?? [];
        const hasApmForm = isDefined(connectionStep?.find((el) => el?.type === 'APM'));

        const error = Array.isArray(payload?.errors)
          ? payload?.errors?.[0]?.message
          : payload?.errors?.split?.('_')?.join(' ');

        if (payload?.success && childWindow && payload?.key === WT_OAUTH_KEY && !error) {
          childWindow.close();

          localStorage.setItem(REFETCH_CONNECTIONS_LIST_FLAG, true);
          NotificationManager.success(
            `${connection?.name || connection?.company?.name} has been successfully connected`,
            'Connections',
            TOAST_TIMEOUT
          );

          if (multipleFlowEnabled && hasApmForm) {
            togglePaymentMethodDialog();
            setOAuthData(payload?.res);
            return;
          }

          if (!avoidRedirect) {
            setTimeout(() => history.push(`${UI_ROUTES.connectionDetails}/${id}`), 1000);
          }
          if (callback) {
            setTimeout(() => handleCallback(id), 1000);
          }
        }

        if (error) {
          childWindow.close();

          NotificationManager.error(
            t(`There was an error while connecting ${connection?.name || connection?.company?.name}`),
            'Connections',
            TOAST_TIMEOUT
          );
        }

        if (!payload?.success && childWindow && payload?.key === WT_OAUTH_KEY) {
          childWindow.close();

          NotificationManager.error(t(error ?? 'Server error'), 'Connections', TOAST_TIMEOUT);
        }
      }
    },
    [
      connection,
      childWindow,
      history,
      t,
      avoidRedirect,
      handleCallback,
      callback,
      multipleFlowEnabled,
      togglePaymentMethodDialog,
      setOAuthData,
    ]
  );

  useEffect(() => {
    window.addEventListener('message', handleListener);
    return () => window.removeEventListener('message', handleListener);
  }, [handleListener]);

  /**
   * Handling 0Auth Redirect
   */
  useEffect(() => {
    //unique searchParam to identify paypal
    const isPaypal = searchParams.merchantIdInPayPal;

    if ((window.opener || isPaypal) && searchParams?.error) {
      //handle paypal error with a toast
      if (isPaypal) {
        const errorMessage = searchParams?.error?.split?.('_')?.join(' ');
        NotificationManager.error(t(errorMessage ?? 'Server error'), 'Connections', TOAST_TIMEOUT);
        return;
      }
      const payload = JSON.stringify({
        success: false,
        res: {},
        error: searchParams?.error,
        key: WT_OAUTH_KEY,
      });

      window.opener.postMessage(payload, window.origin);
      return;
    }

    if (
      (searchParams.code && searchParams.state) ||
      (searchParams.state && searchParams.queryString) ||
      (isPaypal && searchParams.permissionsGranted)
    ) {
      saveCredentials({
        variables: {
          id: searchParams.state || storageConnectionId,
          queryString: searchParams.queryString ? searchParams.queryString : location.search.replace('?', ''),
        },
      })
        .then((res) => {
          if (window.opener) {
            const payload = JSON.stringify({
              success: true,
              res: res?.data?.exchangeConnectionToken ?? {},
              key: WT_OAUTH_KEY,
              ...(!isEmpty(res?.errors) && { errors: res?.errors }),
            });

            window.opener.postMessage(payload, window.origin);
          }

          //handle paypal success state
          if (isPaypal) {
            const connectionId = res?.data?.exchangeConnectionToken?.id || storageConnectionId;

            if (res?.data?.exchangeConnectionToken.status === CONNECTION_STATUS.CONNECTED) {
              const connectionSteps = res?.data?.exchangeConnectionToken?.steps ?? [];
              const hasApmForm = connectionSteps.some((connectionStep) => connectionStep?.type === 'APM');
              //redirect to connection details
              history.push(
                `${UI_ROUTES.connectionDetails}/${connectionId}${hasApmForm ? `?${PAYPAL_APM_KEY}=true` : ''}`
              );

              //flag to refresh connections list
              localStorage.setItem(REFETCH_CONNECTIONS_LIST_FLAG, true);

              NotificationManager.success(`Paypal has been successfully connected`, 'Connections', TOAST_TIMEOUT);

              return;
            }

            NotificationManager.error(
              t(getFirstErrorMessage(res?.errors) || `There was an error while connecting Paypal`),
              'Connections',
              TOAST_TIMEOUT
            );
          }
        })
        .finally(() => {
          removeStorageConnectionId();
        });
    }
  }, [searchParams, location, saveCredentials, history, t, storageConnectionId, removeStorageConnectionId]);

  //handle APM experience for Paypal
  useEffect(() => {
    if (searchParams[PAYPAL_APM_KEY] && multipleFlowEnabled) {
      togglePaymentMethodDialog();
    }
  }, [searchParams, setSearchParams, togglePaymentMethodDialog, multipleFlowEnabled]);

  const handleConnectFunction = useCallback(
    (method) => {
      method({
        variables: { id: connection.id },
      }).then((res) => {
        if (res && !res.errors) {
          const responseData = res.data?.startConnection || res.data?.reconnectConnection;
          const oauthUrl = responseData?.authorizationUrl;

          if (oauthUrl && isValidUrl(oauthUrl) && responseData.flowType !== 'PLAID') {
            setStorageConnectionId(responseData.id);
            //if it's paypal -- we need to open a new tab if current route is not connection details
            if (location.pathname.includes('paypal') && !location.pathname.includes(UI_ROUTES.connectionDetails)) {
              window.open(oauthUrl, '_blank', 'noreferrer, noopener')?.focus?.();
              return;
            }
            const childWindowConst = window.open(oauthUrl, 'new', 'resizable=yes,fullscreen=yes');
            setChildWindow(childWindowConst);
          } else if (responseData?.form) {
            setConnectData({
              ...responseData,
              currentStep: { form: responseData?.form || [] },
            });
            toggleModalShown();
          }
          if (responseData?.flowType === 'PLAID') {
            setPlaidData(responseData);
          }
        }
      });
    },
    [connection, toggleModalShown, location.pathname, setStorageConnectionId]
  );

  const handleConnect = useCallback(() => {
    handleConnectFunction(connect);
  }, [connect, handleConnectFunction]);

  const handleReconnect = useCallback(() => {
    handleConnectFunction(reconnect);
  }, [reconnect, handleConnectFunction]);

  /**
   * Handles the  connection form  -> Form Step 1
   */
  const handleConnectionForm = useCallback(
    (formInput) => {
      setGlobalLoading(globalLoadingConst.saveConnectionForm, true);
      saveForm({
        variables: {
          id: connectData.id,
          formInput,
        },
      })
        .then((res) => {
          if (res && !res.errors) {
            const responseData = res.data?.saveConnectionForm;
            if (!responseData) {
              NotificationManager.error('Server error', t('uiMessages.error'), TOAST_TIMEOUT);
              return;
            }

            if (responseData.id && responseData.status === CONNECTION_STATUS.CONNECTED) {
              NotificationManager.success(
                `${connection?.name || connection?.company?.name} has been successfully connected`,
                'Connections',
                TOAST_TIMEOUT
              );
              setRedirectUrl(`${UI_ROUTES.connectionDetails}/${responseData?.id}`);
            }

            if (responseData.state === 'NEEDS_CONFIG' && responseData.status === CONNECTION_STATUS.CONNECTED) {
              const hasApmForm =
                multipleFlowEnabled && isDefined(responseData?.steps?.find((el) => el?.type === 'APM'));

              setConnectData({
                ...responseData,
                currentStep: {
                  form: hasApmForm ? 'APM' : responseData?.form || [],
                },
                hideClose: true,
                isComplete: true,
              });
            } else if (responseData.status === CONNECTION_STATUS.CONNECTED && responseData.state !== 'NEEDS_CONFIG') {
              if (!avoidRedirect) {
                setTimeout(() => history.push(`${UI_ROUTES.connectionDetails}/${responseData?.id}`), 1000);
              }
              if (callback) {
                setTimeout(() => handleCallback(responseData?.id), 1000);
              }
              toggleModalShown();
            } else {
              NotificationManager.error(
                'Connecting error, maybe provided credentials are not valid',
                t('uiMessages.error'),
                TOAST_TIMEOUT
              );
              toggleModalShown();
            }
          } else {
            NotificationManager.error('Server error', t('uiMessages.error'), TOAST_TIMEOUT);
          }
        })
        .finally(() => setGlobalLoading(globalLoadingConst.saveConnectionForm, false));
    },
    [
      connectData,
      connection,
      t,
      history,
      toggleModalShown,
      saveForm,
      avoidRedirect,
      callback,
      handleCallback,
      setGlobalLoading,
      multipleFlowEnabled,
    ]
  );

  const handleResetPlaid = () => {
    setPlaidData({});
  };

  const PAYPAL_APM_PROPS = {
    connectData: connection,
    avoidRedirect: true,
    handleCallback: () => {
      setSearchParams(omit(searchParams, PAYPAL_APM_KEY));
    },
  };

  const renderConnectionForm = () => {
    if (isPlaid && plaidConnectionData.authorizationUrl) {
      return (
        <PlaidModal
          handleResetPlaid={handleResetPlaid}
          plaidConnectionData={plaidConnectionData}
          setChildWindow={setChildWindow}
        />
      );
    }

    if (connectData?.id) {
      return (
        <ConnectionFormModal
          connectData={connectData}
          connectionDetails={connection}
          toggleModalShown={togglePaymentsModals}
          modalShown={modalShown}
          handleConnectionForm={handleConnectionForm}
          redirectUrl={redirectUrl}
          avoidRedirect={avoidRedirect}
          handleCallback={handleCallback}
          setConnectData={setConnectData}
          goBack={toggleModalShown}
        />
      );
    }

    if (paymentMethodDialog && multipleFlowEnabled) {
      return (
        <PaymentMethodDialog
          toggleIsOpen={togglePaymentMethodDialog}
          connectData={oAuthData}
          connection={connection}
          avoidRedirect={avoidRedirect}
          {...(isDefined(callback) && { handleCallback })}
          //props for paypal APM experience
          {...(connection?.company?.name?.toLowerCase() === 'paypal' && PAYPAL_APM_PROPS)}
        />
      );
    }

    return null;
  };

  return {
    plaidConnectionData,
    handleConnect,
    handleReconnect,
    saveCredentials,
    renderConnectionForm,
  };
};

export const useGetConnectionDetails = (id) => {
  const { data, loading, error, refetch } = useQuery(GET_CONNECTION_DETAILS, {
    variables: {
      id,
    },
  });
  const { setGlobalLoading } = useGlobalContext();

  useEffect(() => {
    if (loading) {
      setGlobalLoading(globalLoadingConst.connectionDetail, true);
    } else {
      setGlobalLoading(globalLoadingConst.connectionDetail, false);
    }
  }, [setGlobalLoading, loading]);

  return {
    connection: data?.getConnection || {},
    loading,
    error,
    refetch,
  };
};

export const useGetConnectionFee = (id) => {
  const { data, loading, error } = useQuery(GET_CONNECTION_FEE, {
    variables: {
      id,
    },
  });

  return {
    fee: data?.getConnectionFee || {},
    loading,
    error,
  };
};
