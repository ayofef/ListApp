import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';

import { useGlobalContext } from '../../../containers/App/context';
import { useMultipleModal } from '../../../hooks/modalHooks';
import { GET_TEAM } from '../../../utils/queries/workspaces/workspacesQueries';
import Root from '../Root';

const MainLayout = ({ children }) => {
  const [modalOpen] = useMultipleModal();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { getMeData } = useGlobalContext();

  const { data: team } = useQuery(GET_TEAM, {
    skip: !getMeData || getMeData.getOnboardingStatus !== 'COMPLETE',
  });

  useEffect(() => {
    const activeTeam = team?.team;
    if ((!selectedTeam && activeTeam) || (activeTeam && selectedTeam !== activeTeam?.id)) {
      setSelectedTeam(activeTeam.id);
    }
  }, [selectedTeam, team]);

  return <Root isShowMain={modalOpen !== 'trail'}>{children}</Root>;
};

export default MainLayout;
