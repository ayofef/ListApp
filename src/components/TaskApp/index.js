import React, { useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';

import Layout from '../ui/Layout';
import SideBar from './SideBar';
import Tasks from './Tasks';

import { StyledTaskWrapper } from './styled';
import { useTasks } from '../../hooks/useTasks';
import { TaskAppContextProvider } from './taskAppContext';

function TaskApp() {
  const { projectsLoading, projects, setProjects, handleUpdateProject, handleAddProject, handleDeleteProject } =
    useTasks();

  //prevent triggering empty state when making subsequent requests
  const isLoading = isEmpty(projects) && projectsLoading;

  const contextValue = useMemo(
    () => ({
      projectsLoading,
      projects,
      setProjects,
      handleUpdateProject,
      handleAddProject,
      handleDeleteProject,
      isLoading,
    }),
    [projectsLoading, projects, setProjects, handleUpdateProject, handleAddProject, handleDeleteProject, isLoading]
  );

  return (
    <Layout>
      <TaskAppContextProvider value={contextValue}>
        <StyledTaskWrapper>
          <SideBar />
          <Tasks />
        </StyledTaskWrapper>
      </TaskAppContextProvider>
    </Layout>
  );
}

export default TaskApp;
