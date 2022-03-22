import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import { useGlobalContext } from '../../containers/App/context';
import CircleImage from '../table/CircleImage';
import UserMenu from './UserMenu';
import { StyledPaper, StyledButton } from './styled';

const ProfileNav = ({ toggleCommunityModal }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { getMeData } = useGlobalContext();
  const user = useMemo(() => getMeData?.me ?? {}, [getMeData?.me]);
  const handleOpen = useCallback(({ currentTarget }) => setAnchorEl(currentTarget), []);
  const handleClose = useCallback(() => setAnchorEl(null), []);

  const circleImageProps = useMemo(() => {
    return {
      text: user?.name,
      logo: user?.avatar ?? '/',
      bgColor: '#E6E9EC',
      color: '#232629',
      fontSize: '12px',
    };
  }, [user]);

  const open = Boolean(anchorEl);

  return (
    <>
      <Box m="-3px">
        <StyledButton size="small" onClick={handleOpen}>
          <CircleImage size={32} {...circleImageProps} />
        </StyledButton>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{ component: StyledPaper, onClick: handleClose }}
      >
        <UserMenu toggleCommunityModal={toggleCommunityModal} user={user} circleImageProps={circleImageProps} />
      </Popover>
    </>
  );
};

ProfileNav.propTypes = {
  toggleCommunityModal: PropTypes.func.isRequired,
};

export default ProfileNav;
