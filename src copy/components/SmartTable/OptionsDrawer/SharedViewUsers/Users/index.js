import React, { useState, useCallback, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { P14B } from '../../../../atoms';
import CircleImage from '../../../../table/CircleImage';
import { parseInitials } from '../../../../../utils/parseInitials';
import DropDownMenu from '../../../../menus/DropDownMenu';
import { StyledWrapper } from './styled';
import DialogRemoveFromView from '../DialogRemoveFromView';

const Users = ({ user, view }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = useCallback(() => setOpenModal((prevState) => !prevState), []);

  const options = useMemo(
    () => [
      {
        Remove: handleModal,
      },
    ],
    [handleModal]
  );

  return (
    <Box display="flex" alignItems="center" mb="6px" justifyContent="flex-start">
      <Box display="flex" alignItems="center">
        <CircleImage
          text={parseInitials(user?.name).toUpperCase()}
          logo={user?.avatar}
          size={25}
          bgColor="#c4cbd2"
          color="#fff"
          fontSize="12px"
        />

        <P14B margin="0 0 0 10px" color="#787F88">
          {user?.name}
        </P14B>
      </Box>
      <Box marginLeft="auto">
        <DropDownMenu
          id="invited-user"
          button={
            <StyledWrapper>
              <IconButton>
                <MoreHorizIcon color="inherit" />
              </IconButton>
            </StyledWrapper>
          }
          options={options}
        />
      </Box>
      <DialogRemoveFromView
        viewId={view?.id}
        viewName={view?.name}
        userId={user?.id}
        handleOnClose={handleModal}
        userName={user?.name}
        open={openModal}
      />
    </Box>
  );
};

Users.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  view: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default Users;
