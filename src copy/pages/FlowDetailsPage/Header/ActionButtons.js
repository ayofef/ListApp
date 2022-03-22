import React, { useMemo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

import isEmpty from 'lodash/isEmpty';
import { StyledBox } from './styled';
import { ButtonRounded, DropdownButton } from '../../../components/atoms';
import { usePaymentFlowContext } from '../paymentFlowContext';
import OptionsMenu from '../../../components/atoms/OptionsMenu';
import LoadingState from './LoadingState';
import PublishedFlowModal from './PublishedFlowModal';
import PublishValidationModal from './PublishValidationModal';
import {
  useUnpublishFlow,
  useActivateAutomation,
  useArchiveAutomation,
  useDiscardChangesFlow,
  ACTION_TYPE_DICTIONARY,
} from '../hooks/manageAutomations/useManageAutomation';
import { PUBLISHED_BUTTON_STATUSES, PUBLISH_BUTTON_STATUSES } from './constant';
import ManageFlowConfirmationModal from './ManageFlowConfirmationModal';
import { MODAL_KEYS } from './ManageFlowConfirmationModal/constant';
import { UI_ROUTES } from '../../../constants/routes';

const MARGIN_RIGHT = '8px';

const ActionButtons = () => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const { loading, flow } = usePaymentFlowContext();
  const [publishModal, setPublishModal] = useState(false);
  const togglePublishModal = useCallback(() => setPublishModal((prevState) => !prevState), []);
  const [validationModal, setValidationModal] = useState(false);
  const toggleValidationModal = useCallback(() => setValidationModal((prevState) => !prevState), []);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = useCallback(() => setDeleteModal((prevState) => !prevState), []);
  const [unpublishModal, setUnpublishModal] = useState(false);
  const toggleUnpublishModal = useCallback(() => setUnpublishModal((prevState) => !prevState), []);
  const [discardChangesModal, setDiscardChangesModal] = useState(false);
  const toggleDiscardChangesModal = useCallback(() => setDiscardChangesModal((prevState) => !prevState), []);

  const [unpublishFlow, unpublishLoading] = useUnpublishFlow();
  const [discardChanges, discardChangesLoading] = useDiscardChangesFlow();
  const [publishFlow, publishLoading] = useActivateAutomation();
  const [deleteFlow, deleteLoading] = useArchiveAutomation();

  const showPublishButton = useMemo(() => PUBLISH_BUTTON_STATUSES.includes(flow?.status), [flow?.status]);

  const showPublishedButton = useMemo(() => PUBLISHED_BUTTON_STATUSES.includes(flow?.status), [flow?.status]);

  const handlePublishCallback = useCallback(() => {
    setValidationModal(false);

    if (!showPublishedButton) {
      togglePublishModal();
    }
  }, [togglePublishModal, setValidationModal, showPublishedButton]);

  const showChangesButton = useMemo(
    () => PUBLISHED_BUTTON_STATUSES.includes(flow?.status) && !isEmpty(flow?.draftConfig),
    [flow?.draftConfig, flow?.status]
  );

  const handleUnpublish = useCallback(
    () => unpublishFlow({ id: flow?.id, type: ACTION_TYPE_DICTIONARY.flow, callback: toggleUnpublishModal }),
    [unpublishFlow, flow?.id, toggleUnpublishModal]
  );

  const handleDiscardChanges = useCallback(
    () => discardChanges({ id: flow?.id, type: ACTION_TYPE_DICTIONARY.flow, callback: toggleDiscardChangesModal }),
    [discardChanges, flow?.id, toggleDiscardChangesModal]
  );

  const handlePublish = useCallback(
    () =>
      publishFlow({
        id: flow?.id,
        type: ACTION_TYPE_DICTIONARY.flow,
        callback: handlePublishCallback,
        checkSuccess: true,
        ...(!showPublishedButton && { skipSuccessToast: true }),
      }),
    [publishFlow, flow?.id, handlePublishCallback, showPublishedButton]
  );

  const deleteFlowCallbackFn = useCallback(() => {
    toggleDeleteModal();
    push(UI_ROUTES.flows);
  }, [toggleDeleteModal, push]);

  const handleDelete = useCallback(
    () => deleteFlow({ id: flow?.id, type: ACTION_TYPE_DICTIONARY.flow, callback: deleteFlowCallbackFn }),
    [deleteFlow, flow?.id, deleteFlowCallbackFn]
  );

  const publishedOptions = useMemo(
    () => [
      {
        label: 'unpublish',
        onClick: toggleUnpublishModal,
      },
    ],
    [toggleUnpublishModal]
  );

  const changesOptions = useMemo(
    () => [
      {
        label: 'publish',
        onClick: handlePublish,
      },
      {
        label: 'discard',
        onClick: toggleDiscardChangesModal,
      },
    ],
    [handlePublish, toggleDiscardChangesModal]
  );

  const otherOptions = useMemo(() => [{ onClick: toggleDeleteModal, label: 'Delete' }], [toggleDeleteModal]);

  if (loading) {
    return (
      <StyledBox>
        <Box mr={MARGIN_RIGHT}>
          <LoadingState width="120px" height="40px" />
        </Box>
        <LoadingState width="40px" height="40px" />
      </StyledBox>
    );
  }

  return (
    <>
      <StyledBox>
        <StyledBox mr={MARGIN_RIGHT}>
          {/**Published Button */}
          {showPublishedButton && (
            <DropdownButton
              buttonLabel="published"
              buttonColor="secondary"
              options={publishedOptions}
              width="120px"
              lastItemDanger
            />
          )}

          {/**Changes Button */}
          {showChangesButton && (
            <Box ml={MARGIN_RIGHT}>
              <DropdownButton
                buttonLabel="changes"
                buttonColor="primary"
                options={changesOptions}
                width="120px"
                lastItemDanger
              />
            </Box>
          )}
        </StyledBox>

        {/**Publish Button */}
        {showPublishButton && (
          <Box mr={MARGIN_RIGHT}>
            <ButtonRounded
              type="button"
              color="primary"
              variant="contained"
              onClick={toggleValidationModal}
              disabled={publishLoading}
            >
              {t('Publish')}
            </ButtonRounded>
          </Box>
        )}

        <Box>
          <OptionsMenu options={otherOptions} lastItemDanger width="120px" bgcolor="#fff" />
        </Box>
      </StyledBox>
      {publishModal && <PublishedFlowModal onConfirm={togglePublishModal} open={publishModal} />}
      {validationModal && (
        <PublishValidationModal
          toggleIsOpen={toggleValidationModal}
          isOpen={validationModal}
          handlePublish={handlePublish}
          loading={publishLoading}
        />
      )}

      {deleteModal && (
        <ManageFlowConfirmationModal
          open={deleteModal}
          onConfirm={handleDelete}
          onCancel={toggleDeleteModal}
          flowName={flow?.name}
          modalKey={MODAL_KEYS.delete}
          loading={deleteLoading}
        />
      )}

      {unpublishModal && (
        <ManageFlowConfirmationModal
          open={unpublishModal}
          onConfirm={handleUnpublish}
          onCancel={toggleUnpublishModal}
          flowName={flow?.name}
          modalKey={MODAL_KEYS.unpublish}
          loading={discardChangesLoading}
        />
      )}

      {discardChangesModal && (
        <ManageFlowConfirmationModal
          open={discardChangesModal}
          onConfirm={handleDiscardChanges}
          onCancel={toggleDiscardChangesModal}
          flowName={flow?.name}
          modalKey={MODAL_KEYS.discardChanges}
          loading={unpublishLoading}
        />
      )}
    </>
  );
};

export default ActionButtons;
