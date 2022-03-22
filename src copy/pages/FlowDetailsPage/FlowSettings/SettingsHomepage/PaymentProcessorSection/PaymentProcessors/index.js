import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { StyledBarSections } from '../../../components/StyledInPageSection/styled';
import ConnectionItem from '../../../PaymentProcessorPage/ConnectionItem';
import { DefaultCardTag } from '../../../../../../components/table/Cells/DefaultCardCell';
import { ButtonRounded } from '../../../../../../components/atoms';
import { BROKEN_CONNECTION_PROPS, BROKEN_CONNECTION_BG_COLOR } from '../../../constant';
import { UI_ROUTES } from '../../../../../../constants/routes';

const PaymentProcessors = ({ paymentProcessors, handleConfigure, defaultProcessor }) => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      const { id } = e.currentTarget.dataset;
      push(`${UI_ROUTES.connectionDetails}/${id}`);
    },
    [push]
  );

  return (
    <Box>
      <StyledBarSections>
        {paymentProcessors?.map((connection) => {
          const connectionName = connection?.name ?? connection?.company?.name;
          const showStatus = connection?.status !== 'CONNECTED';

          return (
            <Box
              component="button"
              className="connection-button"
              key={connection?.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              {...(showStatus && {
                bgcolor: BROKEN_CONNECTION_BG_COLOR,
              })}
              onClick={handleClick}
              data-id={connection?.id}
            >
              <ConnectionItem
                connectionName={connectionName}
                connectionIcon={connection?.company?.logo}
                {...(showStatus && {
                  ...BROKEN_CONNECTION_PROPS,
                  subText: t(connection?.status?.toLowerCase()),
                })}
              />

              {defaultProcessor === connection?.id && <DefaultCardTag />}
            </Box>
          );
        })}

        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <ButtonRounded onClick={handleConfigure} color="primary" type="button" variant="contained">
            {t('Configure')}
          </ButtonRounded>
        </Box>
      </StyledBarSections>
    </Box>
  );
};

PaymentProcessors.propTypes = {
  paymentProcessors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      company: PropTypes.shape({
        name: PropTypes.string,
        logo: PropTypes.string,
      }),
    })
  ).isRequired,
  handleConfigure: PropTypes.func.isRequired,
  defaultProcessor: PropTypes.string.isRequired,
};

export default PaymentProcessors;
