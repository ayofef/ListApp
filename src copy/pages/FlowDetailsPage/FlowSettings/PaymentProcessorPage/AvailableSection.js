import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';

import StyledInPageSection from '../components/StyledInPageSection';
import { P14, ButtonRounded } from '../../../../components/atoms';
import ConnectionItem from './ConnectionItem';
import { UI_ROUTES } from '../../../../constants/routes';
import { useHandleAddToFlow } from '../hooks/useHandleAddToFlow';
import { BROKEN_CONNECTION_PROPS, BROKEN_CONNECTION_BG_COLOR } from '../constant';
import { GET_STATUS } from '../../../ConnectionsPage/components/constant';

const AvailableSection = ({ availableProcessors }) => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const { handleAddToFlow, loading: addToFlowLoading } = useHandleAddToFlow();

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      const { id } = e.currentTarget.dataset;
      push(`${UI_ROUTES.connectionDetails}/${id}`);
    },
    [push]
  );

  if (isEmpty(availableProcessors)) {
    return null;
  }

  return (
    <StyledInPageSection title="Available">
      {availableProcessors?.map((connection) => {
        const connectionName = connection?.name ?? connection?.company?.name;
        const showStatus = connection?.status !== 'CONNECTED';

        return (
          <Box
            className="connection-button"
            key={connection?.id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            onClick={handleClick}
            data-id={connection?.id}
            cursor="pointer"
            {...(showStatus && {
              bgcolor: BROKEN_CONNECTION_BG_COLOR,
            })}
          >
            <ConnectionItem
              connectionName={connectionName}
              connectionIcon={connection?.company?.logo}
              {...(showStatus && {
                ...BROKEN_CONNECTION_PROPS,
                subText: t(GET_STATUS[connection?.status]?.text),
              })}
            />

            <ButtonRounded
              onClick={handleAddToFlow}
              type="button"
              variant="text"
              color="primary"
              data-id={connection?.id}
              data-label={connectionName}
              disabled={addToFlowLoading}
            >
              <P14 fontWeight="500" color="inherit">
                {t('Add to flow')}
              </P14>
            </ButtonRounded>
          </Box>
        );
      })}
    </StyledInPageSection>
  );
};

AvailableSection.propTypes = {
  availableProcessors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      company: PropTypes.shape({
        name: PropTypes.string,
        logo: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default AvailableSection;
