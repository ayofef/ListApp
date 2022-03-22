import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ButtonRounded } from '../../../../../../../components/atoms';
import { UI_ROUTES } from '../../../../../../../constants/routes';
import ListEmptyState from '../../../../../../../components/ListEmptyState';

const TITLE = 'Select Payment Flow';
const DESC = 'You currently have no payment flows, create a payment flow and try again.';

const EmptyState = () => {
  const { t } = useTranslation();

  return (
    <Box position="relative" height="300px">
      <ListEmptyState title={TITLE} description={DESC}>
        <Box my="24px">
          <ButtonRounded component={Link} to={UI_ROUTES.flows} type="button" variant="contained" color="primary">
            {t('Create flow')}
          </ButtonRounded>
        </Box>
      </ListEmptyState>
    </Box>
  );
};

export default EmptyState;
