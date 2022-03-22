import PropTypes from 'prop-types';
import React, { useMemo, useCallback, useState } from 'react';

import { MoreVert } from '@material-ui/icons';
import DropDownMenu from '../../../../../components/menus/DropDownMenu';
import {
  useDeactivateAutomation,
  useActivateAutomation,
  useDeleteAutomation,
} from '../../../hooks/manageAutomations/useManageAutomation';
import ManageConfirmationModal from './ManageConfirmationModal';
import { usePaymentFlowContext } from '../../../paymentFlowContext';
import { MODAL_KEY } from './constant';
import { ACTIVE_STATUSES } from '../constant';
import { StyledIconButton } from '../styled';

const STOPPED = 'DISABLED';

const ManageAutomation = ({ handleEdit, automationId, automationName, automationStatus, hasDraftErrors }) => {
  const { flow } = usePaymentFlowContext();

  /** DEACTIVATE - START */
  const [deactivateModal, setDeactivateModal] = useState(false);
  const toggleDeactivateModal = useCallback(() => setDeactivateModal((prevState) => !prevState), []);
  const [handleDeactivate, deactivateLoading] = useDeactivateAutomation();
  const handleConfirmDeactivate = useCallback(() => {
    handleDeactivate({ id: automationId, automationName, callback: toggleDeactivateModal });
  }, [automationId, handleDeactivate, automationName, toggleDeactivateModal]);
  /** DEACTIVATE - END */

  /** ACTIVATE - START */
  const [activateModal, setActivateModal] = useState(false);
  const toggleActivateModal = useCallback(() => setActivateModal((prevState) => !prevState), []);
  const [handleActivate, activateLoading] = useActivateAutomation();
  const handleConfirmActivate = useCallback(() => {
    handleActivate({ id: automationId, automationName, callback: toggleActivateModal });
  }, [automationId, handleActivate, automationName, toggleActivateModal]);
  /** ACTIVATE - END */

  /** DELETE - START */
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = useCallback(() => setDeleteModal((prevState) => !prevState), []);
  const [handleDelete, deleteLoading] = useDeleteAutomation();
  const handleConfirmDelete = useCallback(() => {
    handleDelete({ id: automationId, automationName, callback: toggleDeleteModal });
  }, [automationId, handleDelete, automationName, toggleDeleteModal]);
  /** DELETE - END */

  const automationOptions = useMemo(
    () => [
      {
        Edit: handleEdit,
        ...(automationStatus === STOPPED && !hasDraftErrors && { Start: toggleActivateModal }), //Aka publish
        ...(ACTIVE_STATUSES.includes(automationStatus) && { Stop: toggleDeactivateModal }), //Aka disable
        Delete: toggleDeleteModal, //Aka archive
      },
    ],
    [handleEdit, automationStatus, hasDraftErrors, toggleActivateModal, toggleDeactivateModal, toggleDeleteModal]
  );

  return (
    <>
      <DropDownMenu
        options={automationOptions}
        lastItemDanger
        maxWidth="124px !important"
        button={
          <StyledIconButton>
            <MoreVert />
          </StyledIconButton>
        }
        id={automationId}
      />

      {/**Deactivate */}
      {deactivateModal && (
        <ManageConfirmationModal
          onConfirm={handleConfirmDeactivate}
          onCancel={toggleDeactivateModal}
          open={deactivateModal}
          automationName={automationName}
          flowName={flow?.name}
          modalKey={MODAL_KEY.deactivate}
          loading={deactivateLoading}
        />
      )}

      {/**Activate */}
      {activateModal && (
        <ManageConfirmationModal
          onConfirm={handleConfirmActivate}
          onCancel={toggleActivateModal}
          open={activateModal}
          automationName={automationName}
          flowName={flow?.name}
          modalKey={MODAL_KEY.activate}
          loading={activateLoading}
        />
      )}

      {/**Delete */}
      {deleteModal && (
        <ManageConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={toggleDeleteModal}
          open={deleteModal}
          automationName={automationName}
          flowName={flow?.name}
          modalKey={MODAL_KEY.delete}
          loading={deleteLoading}
        />
      )}
    </>
  );
};

ManageAutomation.propTypes = {
  automationId: PropTypes.string.isRequired,
  automationName: PropTypes.string.isRequired,
  automationStatus: PropTypes.string.isRequired,
  handleEdit: PropTypes.func.isRequired,
  hasDraftErrors: PropTypes.bool.isRequired,
};

export default ManageAutomation;
