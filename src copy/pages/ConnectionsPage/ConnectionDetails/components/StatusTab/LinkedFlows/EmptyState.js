import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ButtonRounded } from '../../../../../../components/atoms';
import { UI_ROUTES } from '../../../../../../constants/routes';
import ListEmptyState from '../../../../../../components/ListEmptyState';

const TITLE = 'Linked to';
const DESC = (connectionName) => `${connectionName} is currently linked to no payment flows.`;

const EmptyState = ({ connectionName, multipleFlowEnabled }) => {
  const { t } = useTranslation();

  const flowLink = multipleFlowEnabled ? UI_ROUTES.flows : UI_ROUTES.automations;

  return (
    <Box position="relative" height="280px">
      <ListEmptyState title={TITLE} description={DESC(connectionName)} top="150px">
        <Box my="24px">
          <ButtonRounded component={Link} to={flowLink} type="button" variant="contained" color="primary">
            {t('Link to flow')}
          </ButtonRounded>
        </Box>
      </ListEmptyState>
    </Box>
  );
};

EmptyState.propTypes = {
  connectionName: PropTypes.string.isRequired,
  multipleFlowEnabled: PropTypes.bool.isRequired,
};

export default EmptyState;
