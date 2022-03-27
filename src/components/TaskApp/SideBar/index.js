import React from 'react';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import ListLoadingState from '../../atoms/ListLoadingState';
import SideBarItem from './SidebarItem';
import { H3 } from '../../atoms/H3';
import { StyledSidebarWrapper, StyledListWrapper, StyledBackdrop } from './styled';
import { useTaskAppContext } from '../taskAppContext';
import PlusButton from '../../atoms/IconButton';
import { generateNewProject } from '../../../constants/task';
import { supabase } from '../../../client/supabaseClient';
import THEME from '../../../constants/theme';
import EmptyState from '../../atoms/EmptyState';
import { useGlobalContext } from '../../../context';

function SideBar() {
  const { projects, isLoading, handleAddProject } = useTaskAppContext();
  const { menuIsOpen, toggleMenu } = useGlobalContext();

  const { push } = useHistory();

  const handleAddNewProject = async () => {
    const user = supabase.auth.user();
    const newProject = generateNewProject(user.id);
    await handleAddProject({ newProject });

    push(`/task/${newProject.id}`);
  };

  return (
    <>
      <StyledSidebarWrapper $menuIsOpen={menuIsOpen}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`1px solid ${THEME.greyColors.grey2}`}
          pb="8px"
        >
          <H3 $fontWeight="700">List</H3>
          <PlusButton onClick={handleAddNewProject} disabled={isLoading} />
        </Box>

        {isLoading && <ListLoadingState />}

        <StyledListWrapper>
          {!isLoading && isEmpty(projects) && (
            <EmptyState
              margin="30px 0"
              message="List is currently empty, create a list to get started!"
              imageWidth="60px"
            />
          )}
          {!isLoading &&
            !isEmpty(projects) &&
            projects.map((project) => <SideBarItem key={project.id} id={project.id} title={project.project.title} />)}
        </StyledListWrapper>
      </StyledSidebarWrapper>
      <StyledBackdrop onClick={toggleMenu} $menuIsOpen={menuIsOpen} />
    </>
  );
}

export default SideBar;
