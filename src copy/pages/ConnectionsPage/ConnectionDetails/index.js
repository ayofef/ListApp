import React, { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { useApolloClient, useQuery } from '@apollo/client';
import { useToggle } from 'react-use';
import { NotificationManager } from 'react-notifications';
import { isEmpty } from 'lodash';
import { useGetConnectionDetails } from '../../../hooks/connectionsHooks';
import useSearch from '../../../hooks/useSearch';
import { useUpdateConnectionHook } from './updateConnectionHook';
import TakeAction from '../../../assets/img/TakeAction.svg';
import DetailsConnectBlock from './components/DetailsConnectBlock';
import DetailsContentBlock from './components/DetailsContentBlock';
import ConnectionDetailsSkeleton from './Skeleton';
import { StyledWrapper } from './styled';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';
import { useGetPaymentFlowLinkedToConnection } from '../hooks/useGetPaymentFlowLinkedToConnection';
import Header from './Header';
import IconBoxScreen from '../../../components/common/IconBoxScreen';
import WebhookConfigurationModal from '../components/WebhookConfigurationModal';
import { useGlobalContext } from '../../../containers/App/context';
import { globalLoadingConst } from '../../../constants/globalLoadingConsts';
import { GET_CONFIG_FORM } from '../components/WebhookConfigurationModal/queries';
import { isDefined } from '../../../utils/helpers';
import { TOAST_TIMEOUT } from '../../../constants/toasts';

const ConnectionDetails = () => {
  const { t } = useTranslation();
  const client = useApolloClient();
  const {
    params: { id },
  } = useRouteMatch();
  const { connection, loading, error, refetch } = useGetConnectionDetails(id);
  const { linkedPaymentFlows, paymentFlowLoading } = useGetPaymentFlowLinkedToConnection(id);
  const { setGlobalLoading } = useGlobalContext();
  const [searchParams, setSearchParams] = useSearch();
  const [shouldModalOpen, setShouldModalOpen] = useToggle(false);
  const connectionCategory = connection?.company?.categories?.[0] ?? '';
  const connectionName = connection?.company?.name;
  const connectionLogo = connection?.company?.logo;

  const { loading: configFormLoading, data } = useQuery(GET_CONFIG_FORM, {
    variables: {
      id: connection?.id,
    },
  });
  const form = data?.getConfigForm?.form;

  const noData = useMemo(() => {
    return !loading && (error || Object.keys(connection)?.length === 0);
  }, [connection, loading, error]);

  const callback = async () => {
    refetch();
    await client.refetchQueries({
      include: ['getConnections'],
    });
  };

  const { statusActionHandlers, handleConnect, renderConnectionForm } = useUpdateConnectionHook({
    connection,
    callback,
  });

  useEffect(() => {
    if (searchParams?.connect && connection.id) {
      setSearchParams({}, true);
      handleConnect();
    }
  }, [searchParams, connection, handleConnect, setSearchParams]);

  useEffect(() => {
    if (configFormLoading) {
      setGlobalLoading(globalLoadingConst.webhookConfigurationForm, true);
    } else {
      setGlobalLoading(globalLoadingConst.webhookConfigurationForm, false);
    }
  }, [configFormLoading, setGlobalLoading]);

  const handleViewConfiguration = () => {
    if (isEmpty(form)) {
      NotificationManager.info(t('No further configuration is required'), t('Configuration'), TOAST_TIMEOUT);

      return;
    }
    setShouldModalOpen(true);
  };

  return (
    <FlexContainer
      backgroundColor="#fff"
      alignItems="flex-start"
      flexDirection="column"
      flex={1}
      width="100%"
      justifyContent="flex-start"
    >
      <Box width="100%">
        <Header
          connection={connection}
          secondary={connection?.company?.name}
          statusActionHandlers={statusActionHandlers}
        />
      </Box>

      <StyledWrapper>
        {loading && <ConnectionDetailsSkeleton />}
        {noData && (
          <IconBoxScreen
            icon={<img src={TakeAction} alt="" />}
            iconMargin="0"
            description={t('connections.fetchingError')}
            padding="40px 82px"
            margin="105px auto"
            buttonText={error ? t('connections.retry') : null}
            onButtonClick={() => refetch()}
          />
        )}

        {!loading && !noData && (
          <Box m="60px 0" width="100%">
            <DetailsConnectBlock
              statusActionHandlers={statusActionHandlers}
              connection={connection}
              handleViewConfiguration={handleViewConfiguration}
            />

            <DetailsContentBlock
              connection={connection}
              linkedPaymentFlows={linkedPaymentFlows}
              paymentFlowLoading={paymentFlowLoading}
            />
          </Box>
        )}
      </StyledWrapper>

      {renderConnectionForm()}

      {shouldModalOpen && isDefined(form) && (
        <WebhookConfigurationModal
          setShouldModalOpen={setShouldModalOpen}
          shouldModalOpen={shouldModalOpen}
          goBack={setShouldModalOpen}
          connectionName={connectionName}
          connectionLogo={connectionLogo}
          connectionCategory={connectionCategory}
          form={form}
        />
      )}
    </FlexContainer>
  );
};

export default ConnectionDetails;
