import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next/src/index';
import { StyledPaymentGatewayCard } from './styled';
import CircleImage from '../../../../../components/table/CircleImage';
import { UI_ROUTES } from '../../../../../constants/routes';
import { P14 } from '../../../../../components/atoms';
import { GET_CONNECTION_DETAILS } from '../../../../../utils/queries/connections/connectionsQueries';
import { useNotificationManager } from '../../../../../hooks/useNotificationManager';
import LoadingState from './LoadingState';
import THEME from '../../../../../constants/theme';
import { TOAST_TIMEOUT } from '../../../../../constants/toasts';

const LinkedItem = ({ id }) => {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(GET_CONNECTION_DETAILS, { variables: { id } });
  useNotificationManager('error', error?.message, t('Card details'), TOAST_TIMEOUT);

  const connection = useMemo(() => data?.getConnection ?? {}, [data]);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <StyledPaymentGatewayCard to={`${UI_ROUTES.connectionDetails}/${id}`}>
      <div>
        <CircleImage
          bgColor={THEME.greyColors.grey5}
          color={THEME.primaryColors.black}
          text={connection?.company?.name}
          logo={connection?.company?.logo}
          size={24}
          fontSize="12px"
        />
        <P14 margin="0 0 0 12px" fontWeight="600">
          {connection?.company?.name}
        </P14>
      </div>
      <P14>{t('View')}</P14>
    </StyledPaymentGatewayCard>
  );
};

LinkedItem.propTypes = {
  id: PropTypes.string.isRequired,
};

export default LinkedItem;
