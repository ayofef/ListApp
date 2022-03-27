import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';

import DeleteIcon from '@material-ui/icons/MoreVert';
import { useTaskAppContext } from '../../taskAppContext';
import { isDefined } from '../../../../utils/isDefined';
import IconButton from '../../../atoms/IconButton';
import Popover from '../../../atoms/Popover';
import { usePopover } from '../../../atoms/Popover/usePopover';
import { useGlobalContext } from '../../../../context';

function SideBarItem({ id, title }) {
  const { anchorEl, handleOpen, handleClose, open } = usePopover();
  const { handleDeleteProject, projects, projectsLoading } = useTaskAppContext();
  const { menuIsOpen, setMenuIsOpen } = useGlobalContext();
  const { push } = useHistory();
  const { id: paramId } = useParams();

  const handleRoute = () => {
    if (menuIsOpen) {
      setMenuIsOpen(false);
    }
    push(`/task/${id}`);
  };

  const handleDelete = async () => {
    handleClose();
    await handleDeleteProject({ id });

    if (id === paramId) {
      // if deleting the task being viewed, id no longer exists, redirect to first task
      const newId = projects[0]?.id;
      const hasMoreThanOneProject = projects.length > 1;

      push(isDefined(newId) && hasMoreThanOneProject ? `/task/${newId}` : '/task');
    }
  };

  const options = [
    {
      label: 'Delete',
      onClick: handleDelete,
      dangerItem: true,
    },
  ];

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

        <IconButton onClick={handleOpen} CustomIcon={DeleteIcon} iconSize="19px" disabled={projectsLoading} />
      </Box>
      <Popover open={open} anchorEl={anchorEl} handleClose={handleClose} width="120px" options={options} />
    </>
  );
}

SideBarItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SideBarItem;
