import React, { useState, useMemo, useCallback } from 'react';
import TableCell from '@material-ui/core/TableCell/TableCell';
import { string } from 'prop-types';
import { useMutation } from '@apollo/client';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { globalLoadingConst } from '../../../../constants/globalLoadingConsts';
import { useGlobalContext } from '../../../../containers/App/context';
import { DELETE_API_KEY } from '../../../../utils/queries/apiKey/apiKeysMutations';
import { API_KEY_MUTATION_OPTION } from '../apiKeyHooks';
import DropDownMenu from '../../../../components/menus/DropDownMenu';

import ConfirmationModal from '../../../../components/modals/ConfirmationModal';

const modalText = {
  title: 'Are you sure you want to delete it?',
  description: 'API Key will be permanently deleted and cannot be restored.',
};

export const ActionCell = ({ data }) => {
  const { setGlobalLoading } = useGlobalContext();
  const [confirmation, setConfirmation] = useState(false);
  const [deleteApiKey, { loading }] = useMutation(DELETE_API_KEY, API_KEY_MUTATION_OPTION);
  const handleDelete = useCallback(() => {
    setGlobalLoading(globalLoadingConst.apiKeysUpdate, true);
    deleteApiKey({
      variables: {
        id: data,
      },
    }).then(() => {
      setGlobalLoading(globalLoadingConst.apiKeysUpdate, false);
    });
  }, [setGlobalLoading, deleteApiKey, data]);

  const toggleConfirmModal = useCallback(() => {
    setConfirmation((prevState) => !prevState);
  }, [setConfirmation]);

  const options = useMemo(
    () => [
      {
        Delete: toggleConfirmModal,
      },
    ],
    [toggleConfirmModal]
  );

  return (
    <TableCell align="right" padding="none">
      <DropDownMenu
        id="api-key-action"
        options={options}
        button={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
      />

      <ConfirmationModal
        loading={loading}
        open={confirmation}
        onConfirm={handleDelete}
        onClose={toggleConfirmModal}
        onCancel={toggleConfirmModal}
        text={{
          title: modalText.title,
          description: modalText.description,
          submit: 'Delete',
          cancel: 'Cancel',
        }}
      />
    </TableCell>
  );
};

ActionCell.propTypes = {
  data: string.isRequired,
};
