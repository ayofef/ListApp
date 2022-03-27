import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import DeleteIcon from '@material-ui/icons/MoreVert';
import { useTaskAppContext } from '../../taskAppContext';

import IconButton from '../../../atoms/IconButton';
import Popover from '../../../atoms/Popover';
import { usePopover } from '../../../atoms/Popover/usePopover';
import { useGlobalContext } from '../../../../context';
import { useSidebarItemEvents } from './useSidebarItemEvents';

function SideBarItem({ id, title }) {
  const { anchorEl, handleOpen, handleClose, open, id: popoverId } = usePopover();
  const { handleDeleteProject, projects, projectsLoading } = useTaskAppContext();
  const { menuIsOpen, setMenuIsOpen } = useGlobalContext();
  const { handleRoute, options, paramId } = useSidebarItemEvents({
    handleDeleteProject,
    projects,
    menuIsOpen,
    setMenuIsOpen,
    id,
    handleClose,
  });

  return (
    <>
      <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
        <IconButton
          onClick={handleRoute}
          showIcon={false}
          label={title}
          width="150px"
          justifyContent="left"
          isActive={id === paramId}
        />

        <IconButton
          onClick={handleOpen}
          CustomIcon={DeleteIcon}
          iconSize="19px"
          disabled={projectsLoading}
          id={popoverId}
        />
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        width="120px"
        options={options}
        id={popoverId}
      />
    </>
  );
}

SideBarItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SideBarItem;
