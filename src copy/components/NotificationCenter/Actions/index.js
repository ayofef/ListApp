import React from 'react';
import { func } from 'prop-types';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import { useQuery } from '@apollo/client';
import isEmpty from 'lodash/isEmpty';
import ActionItem from './ActionItem';
import ListEmptyState from '../EmptyState';
import { useNotificationManager } from '../../../hooks/useNotificationManager';
import { GET_LIST_REQUIRES_ACTIONS } from '../queries';
import { StyledListContainer } from '../styled';
import ListSkeleton from '../../ListSkeleton';

const TITLE = 'There are no open actions';
const DESC = 'New actions will appear here.';

const Actions = ({ toggleNotification }) => {
  const { error, data, loading } = useQuery(GET_LIST_REQUIRES_ACTIONS);
  useNotificationManager('error', error?.message, 'Fetch required actions');

  const actions = data?.listRequiresAction ?? [];
  const sortedActions = [...actions]?.sort((a, b) => moment(b?.created).diff(a?.created));

  return (
    <StyledListContainer>
      {loading && (
        <Box mt="-8px">
          <ListSkeleton rowNumber={5} height={80} />
        </Box>
      )}

      {!loading &&
        !isEmpty(actions) &&
        sortedActions.map((item) => (
          <ActionItem
            key={item.id}
            title={item.title}
            description={item.description}
            timeStamp={item.ts}
            actions={item.actions}
            toggleNotification={toggleNotification}
          />
        ))}

      {!loading && isEmpty(actions) && <ListEmptyState title={TITLE} description={DESC} type="actions" />}
    </StyledListContainer>
  );
};

Actions.propTypes = {
  toggleNotification: func.isRequired,
};

export default Actions;
