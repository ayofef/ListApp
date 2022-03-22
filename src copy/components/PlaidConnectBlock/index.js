import React from 'react';
import { useTranslation } from 'react-i18next';
import { func } from 'prop-types';
import Box from '@material-ui/core/Box';
import { P } from '../atoms';
import PlaidLink from '../common/PlaidLink';
import { EmptyStateIcon } from '../../assets/icons/EmptyStateIcon';
import { useHandleConnectionConnect } from '../../hooks/connectionsHooks';
import { FlexContainer } from '../atoms/flex/FlexContainer';

const plaidConnection = {
  canConnect: true,
  id: 'plaid:default',
  name: 'Plaid',
};

const PlaidConnectBlock = ({ refetch }) => {
  const { handleConnect, loading, renderConnectionForm } = useHandleConnectionConnect({
    connection: plaidConnection,
    callback: refetch,
  });
  const { t } = useTranslation();

  return (
    <FlexContainer flex={1} flexDirection="column" maxWidth="340px" margin="auto auto auto auto">
      <Box display="flex" color="#787F88">
        <EmptyStateIcon />
      </Box>

      <P margin="24px 0 0 " textAlign="center" fontSize="24px" fontWeight={500}>
        Please authenticate your bank account
      </P>
      <P textAlign="center" margin="24px 0 0" fontSize="14px" fontWeight={400}>
        Connect your bank account via Plaid to see grouping payment grouping by bank.
      </P>
      <Box mt={4}>
        <PlaidLink handleConnect={handleConnect} text={t('buttonsText.ConnectPlaid')} loading={loading} />
      </Box>
      {renderConnectionForm()}
    </FlexContainer>
  );
};

PlaidConnectBlock.propTypes = {
  refetch: func,
};

PlaidConnectBlock.defaultProps = {
  refetch: () => null,
};

export default PlaidConnectBlock;
