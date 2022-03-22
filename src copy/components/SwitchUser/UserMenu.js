import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import UserItem from './UserItem';
import { parseInitials } from '../../utils/parseInitials';
import { StyledMenuItem, StyledMenuList } from './styled';
import { useGlobalContext } from '../../containers/App/context';
import { useSwitchTeam } from '../../hooks/useSwitchTeam';
import { useSwitchDemo } from '../../hooks/useSwitchDemo';
import DemoUser from '../../assets/img/DemoUser.svg';
import { P12 } from '../atoms';
import useIsDemo from '../../hooks/useIsDemo';

const LOADING_KEY = 'switch';

const UserMenu = ({ teams }) => {
  const isDemo = useIsDemo();
  const switchTeamPromise = useSwitchTeam();
  const switchDemo = useSwitchDemo();
  const { setGlobalLoading, getMeData } = useGlobalContext();
  const logo = useMemo(() => getMeData?.we?.brand?.logoUrl ?? '/', [getMeData]);

  const handleSwitchTeam = useCallback(
    (event) => {
      const id = event.currentTarget.dataset?.teamId;
      if (!id) {
        event.stopPropagation();
        return;
      }

      setGlobalLoading(LOADING_KEY, true);
      switchTeamPromise(id).finally(() => {
        setGlobalLoading(LOADING_KEY, false);
      });
    },
    [setGlobalLoading, switchTeamPromise]
  );

  return (
    <StyledMenuList>
      <Box borderBottom="1px solid #F5F6F7" mb="6px">
        <Box p="12px 16px">
          <P12 color="#545A61" fontWeight="600">
            Choose account
          </P12>
        </Box>
      </Box>
      {teams?.map((team) => (
        <StyledMenuItem key={team.id} selected={team.selected} onClick={handleSwitchTeam} data-team-id={team.id}>
          <UserItem
            fullName={team.userName}
            initial={parseInitials(team.userName).toUpperCase()}
            info={team.membersCount && `${team.membersCount} team members`}
            color="#ff832a"
            bgColor="#fff"
            logo={logo}
          />
        </StyledMenuItem>
      ))}
      <StyledMenuItem selected={isDemo} onClick={switchDemo}>
        <UserItem fullName="demo" initial="demo" info="Explore WhenThen" bgColor="#3023C8" bgImage={DemoUser} />
      </StyledMenuItem>
    </StyledMenuList>
  );
};

UserMenu.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      selected: PropTypes.bool,
      userName: PropTypes.string,
      membersCount: PropTypes.number,
    })
  ),
};

UserMenu.defaultProps = {
  teams: null,
};

export default UserMenu;
