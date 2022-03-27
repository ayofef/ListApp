import { useHistory, useParams } from 'react-router-dom';
import { isDefined } from '../../../../utils/isDefined';

const useSidebarItemEvents = ({ handleDeleteProject, projects, menuIsOpen, setMenuIsOpen, id, handleClose }) => {
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
      key: 'delete',
    },
  ];

  return {
    handleRoute,
    options,
    paramId,
  };
};

export { useSidebarItemEvents };
