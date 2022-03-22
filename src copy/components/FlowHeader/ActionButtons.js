import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';
import { isNode } from 'react-flow-renderer';
import { NotificationManager } from 'react-notifications';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { func } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useToggle } from 'react-use';
import DropdownButton from '../atoms/DropDownButton';
import ButtonWithIcon from '../atoms/Buttons/ButtonWithIcon';
import { PlayCircle } from '../../assets/icons';
import THEME from '../../constants/theme';
import { useFlowEditorContext } from '../FlowEditor/context';
import {
  DELETE_FLOW,
  GQL_M_DISCARD_FLOW_CHANGES,
  GQL_M_PUBLISH_CONFIGURATION,
} from '../../utils/queries/flows/mutations';
import OptionsMenu from '../atoms/OptionsMenu';
import { StyledToggleButton, StyledToggleGroup, VerticalLine } from './styled';
import RunningButton from './RunningButton';
import ManageFlowConfirmationModal from '../../pages/FlowDetailsPage/Header/ManageFlowConfirmationModal';
import { MODAL_KEYS } from '../../pages/FlowDetailsPage/Header/ManageFlowConfirmationModal/constant';
import { DRAFT_FLOW_STATUS, LIVE_FLOW_STATUS } from './constants';
import { TOAST_TIMEOUT, TOAST_TITLE } from '../../pages/FlowDetailsPage/hooks/constant';
import { UI_ROUTES } from '../../constants/routes';
import { findExeption } from '../../pages/AutomationTemplatePage/constant';
import { GET_FLOW_LIST } from '../../utils/queries/flows/flowsQueries';
import TestCantBeUsedDialog from './TestCantBeUsedDialog';
import BlankAutomationDialog from './BlankAutomationDialog';

const UPGRADE_PLAN_NEEDED = 'error.payment.flow.plan.insufficient';

const ActionButtons = ({ onValidate }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const {
    flowId,
    flowName,
    flowStatus,
    isInstruct,
    refetch,
    elements,
    changesMade,
    setChangesMade,
    draftConfig,
    toggleShowUpgradeModal,
  } = useFlowEditorContext();
  const [activeTab, setActiveTab] = useState(null);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [blankModalOpen, setBlankModalOpen] = useState(false);

  useEffect(() => {
    if (history?.location?.pathname) {
      const array = history.location.pathname.split('/');
      const path = array[array.length - 1];
      setActiveTab(path);
    }
  }, [history.location.pathname]);

  const [publishFlow, { error: publishError, loading }] = useMutation(GQL_M_PUBLISH_CONFIGURATION, {
    context: { skipGlobalHandling: true },
  });
  const [discardChanges] = useMutation(GQL_M_DISCARD_FLOW_CHANGES, {
    context: { skipGlobalHandling: true },
  });
  const [deleteFlow, { loading: deleteLoading }] = useMutation(DELETE_FLOW, {
    context: { skipGlobalHandling: true },
    refetchQueries: [{ query: GET_FLOW_LIST }],
  });

  const isValid = !elements.filter(isNode).some((n) => n?.data?.validationErrors?.length > 0);
  const handleTabChange = (event, newTab) => {
    if (newTab) {
      const path = [...history.location.pathname.split('/')];
      const newPath = path.slice(0, -1).join('/');
      if (newTab === 'test') {
        if (isInstruct) {
          setTestModalOpen(true);
          return;
        }
        if (!isValid) {
          onValidate();
          return;
        }
      }
      setActiveTab(newTab);
      history.push(`${newPath}/${newTab}`);
    }
  };

  useEffect(() => {
    if (publishError && publishError?.message === UPGRADE_PLAN_NEEDED) {
      toggleShowUpgradeModal();
    }
  }, [publishError, toggleShowUpgradeModal]);

  const [deleteModal, toggleDeleteModal] = useToggle(false);

  const otherOptions = useMemo(() => [{ onClick: toggleDeleteModal, label: 'Delete' }], [toggleDeleteModal]);

  const isAutomationScreen = useMemo(() => DRAFT_FLOW_STATUS.has(flowStatus) || LIVE_FLOW_STATUS.has(flowStatus), [
    flowStatus,
  ]);

  const onClickPublish = useCallback(async () => {
    if (!isValid) {
      onValidate();
      return;
    }
    if (!elements?.length) {
      setBlankModalOpen(true);
      return;
    }
    try {
      const data = await publishFlow({
        variables: {
          flowId,
        },
      });
      if (!isEmpty(data.errors)) {
        const exception = findExeption(data?.errors);
        if (exception === UPGRADE_PLAN_NEEDED) {
          return;
        }
        NotificationManager.error(data.errors[0].message, t('uiMessages.failed'), 5000);
        return;
      }
      if (setChangesMade) {
        setChangesMade(false);
      }
      NotificationManager.success(t('uiMessages.automationPublished'), t('uiMessages.success'), 5000);
      await refetch({ id: flowId });
    } catch (error) {
      NotificationManager.error(t('uiMessages.failed'), 'Oops..', 5000);
    }
  }, [isValid, elements?.length, onValidate, publishFlow, flowId, setChangesMade, t, refetch]);

  const handleMutation = useCallback(
    async (fn, field) => {
      try {
        const data = await fn({
          variables: {
            flowId,
          },
        });
        if (!isEmpty(data.errors)) {
          NotificationManager.error(data.errors[0].message, t('uiMessages.failed'), 5000);
          return;
        }
        if (!data?.data[field]) {
          NotificationManager.error(t('uiMessages.failed'), 'Oops..', 5000);
        } else {
          if (setChangesMade) {
            setChangesMade(false);
          }
          if (field === 'deleteFlow') {
            NotificationManager.success(t(`Successfully deleted ${flowName}`), t(TOAST_TITLE), TOAST_TIMEOUT);
            history.push(UI_ROUTES.automations);
            return;
          }
          refetch();
        }
      } catch {
        NotificationManager.error(t('uiMessages.failed'), 'Oops..', 5000);
      }
    },
    [flowId, flowName, setChangesMade, refetch, t, history]
  );

  const changesOptions = useMemo(
    () => [
      {
        label: 'publish',
        onClick: onClickPublish,
      },
      {
        label: 'discard',
        onClick: () => handleMutation(discardChanges, 'discardFlow'),
      },
    ],
    [onClickPublish, discardChanges, handleMutation]
  );

  return (
    <Box display="flex" alignItems="center">
      {isAutomationScreen && (
        <Box mr="8px">
          {DRAFT_FLOW_STATUS.has(flowStatus) && (
            <ButtonWithIcon
              text="Start"
              color={THEME.primaryColors.white}
              bgColor={THEME.secondaryColors.greenDark}
              startIcon={<PlayCircle color={THEME.primaryColors.white} />}
              onClick={onClickPublish}
              disabled={loading}
              p="10px 12px"
            />
          )}
          {LIVE_FLOW_STATUS.has(flowStatus) && <RunningButton handleMutation={handleMutation} />}
        </Box>
      )}

      {flowStatus && <VerticalLine />}

      <StyledToggleGroup value={activeTab} onChange={handleTabChange} $hasPadding={isAutomationScreen} exclusive>
        <StyledToggleButton value="editor">{t('Build')}</StyledToggleButton>
        <StyledToggleButton value="test">{t('Test')}</StyledToggleButton>
      </StyledToggleGroup>

      {(draftConfig || changesMade) && !DRAFT_FLOW_STATUS.has(flowStatus) && flowStatus && (
        <>
          <VerticalLine />
          <Box px="8px">
            <DropdownButton
              buttonColor="primary"
              width="110px"
              buttonLabel="Changes"
              options={changesOptions}
              loading={loading}
              lastItemDanger
            />
          </Box>
        </>
      )}

      {isAutomationScreen && <VerticalLine $marginRight="8px" />}

      {isAutomationScreen && (
        <>
          <OptionsMenu
            options={otherOptions}
            lastItemDanger
            width="120px"
            bgcolor="#fff"
            color={THEME.greyColors.grey17}
          />
          <ManageFlowConfirmationModal
            open={deleteModal}
            onConfirm={() => handleMutation(deleteFlow, 'deleteFlow')}
            onCancel={toggleDeleteModal}
            flowName={flowName}
            modalKey={MODAL_KEYS.delete}
            loading={deleteLoading}
          />
          <TestCantBeUsedDialog open={testModalOpen} setOpen={setTestModalOpen} />
          <BlankAutomationDialog open={blankModalOpen} setOpen={setBlankModalOpen} />
        </>
      )}
    </Box>
  );
};

ActionButtons.propTypes = {
  onValidate: func.isRequired,
};

export default ActionButtons;
