import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import { useGetConnectionDetails } from '../../../hooks/connectionsHooks';
import { CustomDivider, P, H3 } from '../../../components/atoms';
import TakeAction from '../../../assets/img/TakeAction.svg';
import IconBoxScreen from '../../../components/common/IconBoxScreen';
import { StyledImage } from '../../../components/styled/StyledImage';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

const ConnectionDetails = () => {
  const { t } = useTranslation();
  const {
    params: { id },
  } = useRouteMatch();
  const { connection, loading, error, refetch } = useGetConnectionDetails(id);

  const noData = useMemo(() => {
    return !loading && (error || Object.keys(connection)?.length === 0);
  }, [connection, loading, error]);
  return (
    <FlexContainer
      padding="0 0 16px"
      alignItems="center"
      flexDirection="column"
      flex={1}
      width="100%"
      justifyContent="flex-start"
      backgroundColor="rgb(248, 249, 250)"
    >
      <FlexContainer
        width="100%"
        boxShadow="0px 2px 4px rgba(155, 159, 171, 0.22)"
        height="72px"
        backgroundColor="white"
        alignItems="flex-end"
      >
        <CustomDivider margin="0" fullWidth />
      </FlexContainer>
      {noData ? (
        <IconBoxScreen
          icon={<img src={TakeAction} alt="" />}
          iconMargin="0"
          description={t('connections.fetchingError')}
          padding="40px 82px"
          margin="105px auto"
          buttonText={error ? t('connections.retry') : null}
          onButtonClick={() => refetch()}
        />
      ) : (
        <FlexContainer margin="105px auto 0" padding="0 16px" maxWidth="425px" width="100%" flexDirection="column">
          <StyledImage src={connection.company?.logo} />

          <H3 maxWidth="335px" margin="19px 0 0">
            Allow WhenThen to access your Stripe account
          </H3>
          <P margin="53px 0 0" textAlign="left" width="100%">
            API key required
          </P>
        </FlexContainer>
      )}
    </FlexContainer>
  );
};

export default ConnectionDetails;
