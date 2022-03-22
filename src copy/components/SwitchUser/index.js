import React, { useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import CircleImage from '../table/CircleImage';
import UserMenu from './UserMenu';
import { StyledPaper, StyledButton } from './styled';
import { GQL_Q_TEAM_LIST } from '../../utils/queries/public/publicQueries';
import { GET_TEAM } from '../../utils/queries/workspaces/workspacesQueries';
import { IGNORE_DEMO_HEADER } from '../../client/links/demoLink/constants';
import { useUserSelector } from '../../providers/User/UserContext';
import { selectIsDemo } from '../../providers/User/state/selectors';
import DemoUser from '../../assets/img/DemoUser.svg';
import { useGlobalContext } from '../../containers/App/context';

const SwitchUser = () => {
  const isDemo = useUserSelector(selectIsDemo);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { loading: teamLoading, data: teamData } = useQuery(GET_TEAM);
  const { getMeData, getMeLoading } = useGlobalContext();
  const { loading: teamListLoading, data: teamListData } = useQuery(GQL_Q_TEAM_LIST, {
    fetchPolicy: 'no-cache',
    context: { [IGNORE_DEMO_HEADER]: true },
  });

  const handleOpen = useCallback(({ currentTarget }) => setAnchorEl(currentTarget), []);
  const handleClose = useCallback(() => setAnchorEl(null), []);

  const teams = useMemo(() => {
    const activeTeamId = teamData?.team?.id;
    const teamIdSet = new Set();

    return teamListData?.me?.teams?.reduce((acc, team) => {
      const teamId = team.id;

      if (team.status === 'INACTIVE' || teamIdSet.has(teamId)) {
        return acc;
      }

      teamIdSet.add(teamId);
      acc.push({
        id: teamId,
        selected: team.status === 'ACTIVE' && team.team?.id === activeTeamId,
        userName: team?.team?.name ?? '',
        membersCount: team.team?.membersCount,
      });

      return acc;
    }, []);
  }, [teamData?.team?.id, teamListData?.me?.teams]);

  const circleImageProps = useMemo(() => {
    if (isDemo) {
      return {
        text: 'DEMO',
        bgColor: '#3023C8',
        fontSize: '12px',
        bgImage: DemoUser,
        textOnly: true,
      };
    }

    const name = teamData?.team?.name ?? '.';
    const logo = getMeData?.we?.brand?.logoUrl ?? '/';

    return {
      text: name,
      logo,
      bgColor: '#E6E9EC',
      color: '#232629',
      fontSize: '12px',
    };
  }, [isDemo, teamData?.team?.name, getMeData?.we]);

  const open = Boolean(anchorEl);
  const isDisabled = getMeLoading || teamLoading || teamListLoading;

  return (
    <>
      <Box m="-3px" className="switch-user">
        <StyledButton size="small" disabled={isDisabled} onClick={handleOpen}>
          <CircleImage size={32} borderRadius="6px" matchRadius {...circleImageProps} />
        </StyledButton>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{ component: StyledPaper, onClick: handleClose }}
      >
        <UserMenu teams={teams} />
      </Popover>
    </>
  );
};

export default SwitchUser;
