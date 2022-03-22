import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Link, useHistory } from 'react-router-dom';
import { StyledMenuItem, StyledMenuList } from './styled';
import { P12, P14B, L12 } from '../atoms';
import CircleImage from '../table/CircleImage';
import { NAV_ITEMS, DICTIONARY } from './constant';
import { useGlobalContext } from '../../containers/App/context';

const UserMenu = ({ user, circleImageProps, toggleCommunityModal }) => {
  const { logOut } = useGlobalContext();
  const { push } = useHistory();

  const handleSecurityTab = useCallback(() => {
    push({
      pathname: '/settings/profile',
      state: { defaultTab: 1 },
    });
  }, [push]);

  const fnMap = {
    [DICTIONARY.support]: () => toggleCommunityModal(),
    [DICTIONARY.logout]: () => logOut(),
    [DICTIONARY.security]: () => handleSecurityTab(),
  };

  return (
    <StyledMenuList>
      <Box p="24px 0" width="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <CircleImage size={32} {...circleImageProps} />
        <P14B margin="16px 0 6px 0">{user?.name}</P14B>
        <P12 color="#787F88">{user?.email?.address}</P12>
      </Box>

      {NAV_ITEMS.map(({ id, title, type, icon, to }) => {
        const Icon = icon;
        const props = {
          ...(type === 'link' && {
            component: Link,
            to,
          }),
          ...(type === 'fn' && {
            onClick: fnMap[title],
          }),
        };

        return (
          <Box key={id} {...props} borderTop="1px solid #f5f6f7" mb="1px" display="block">
            <StyledMenuItem>
              <Icon />
              <Box ml="20px">
                <L12 fontWeight="600" color="#545A61">
                  {title}
                </L12>
              </Box>
            </StyledMenuItem>
          </Box>
        );
      })}
    </StyledMenuList>
  );
};

UserMenu.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    email: PropTypes.shape({
      address: PropTypes.string,
    }),
  }).isRequired,
  circleImageProps: PropTypes.shape({}).isRequired,
  toggleCommunityModal: PropTypes.func.isRequired,
};

export default UserMenu;
