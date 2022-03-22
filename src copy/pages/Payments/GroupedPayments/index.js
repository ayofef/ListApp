import React from 'react';
import { usePlaid } from '../../../hooks/usePlaid';
import PlaidConnectBlock from '../../../components/PlaidConnectBlock';
import IconBoxScreen from '../../../components/common/IconBoxScreen';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

const AllPayments = () => {
  const { loading, refetchPlaid, isPlaidConnected } = usePlaid();

  const isEmpty = true;
  return (
    <FlexContainer flexDirection="column" height="100%">
      {isPlaidConnected && isEmpty && (
        <IconBoxScreen iconMargin="0" description="No active transactions yet" padding="60px 200px" />
      )}

      {!loading && !isPlaidConnected && <PlaidConnectBlock refetch={refetchPlaid} />}
    </FlexContainer>
  );
};

export default AllPayments;
