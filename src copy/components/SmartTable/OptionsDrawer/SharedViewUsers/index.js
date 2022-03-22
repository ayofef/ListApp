import React, { useState, useCallback, useMemo } from 'react';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import uniqBy from 'lodash/uniqBy';

import { AddUser } from '../../../../assets/icons';
import { P14B } from '../../../atoms';
import { StyledButton } from '../AllOptions/styled';
import InviteToView from './InviteToView';
import Users from './Users';
import { useGetViews } from '../../../../hooks/useGetView';
import { HIDE_EXPORT_MAP } from '../constant';

const NOT_A_VIEW = 'This is not a saved view. Create a view to invite team members.';

const SharedViewUsers = () => {
  const { t } = useTranslation();
  const views = useGetViews();
  const pageMatch = useRouteMatch('/data-tables/:page');
  const match = useRouteMatch('/payments/views/:viewId');
  const [inviteDialog, setInviteDialog] = useState(false);
  const viewId = match?.params?.viewId;
  const view = viewId && views?.[viewId];
  const toggleInviteDialog = useCallback(() => {
    if (viewId) {
      setInviteDialog((prevState) => !prevState);
    } else {
      NotificationManager.info(NOT_A_VIEW, 'Invite to view', 5000);
    }
  }, [viewId, setInviteDialog]);

  const sharedWithUsers = useMemo(() => {
    return uniqBy(view?.sharedWithUsers || [], 'id');
  }, [view?.sharedWithUsers]);

  if (HIDE_EXPORT_MAP.includes(pageMatch?.params.page)) {
    return null;
  }

  return (
    <Box width="100%">
      <P14B margin="0 0 10px 0" color="#232629">
        {t('Shared with')}
      </P14B>

      <Box mb="40px">
        {sharedWithUsers?.map((user) => (
          <Users view={view} user={user} key={user?.id} />
        ))}

        <StyledButton type="button" onClick={toggleInviteDialog}>
          <Box mt="12px" display="flex" alignItems="center">
            <Box mr="8px" ml="2px">
              <AddUser />
            </Box>
            {t('Invite to the view')}
          </Box>
        </StyledButton>
      </Box>

      <InviteToView
        viewId={viewId}
        sharedWith={view?.sharedWith}
        isOpen={inviteDialog}
        toggleIsOpen={toggleInviteDialog}
      />
    </Box>
  );
};

export default SharedViewUsers;
