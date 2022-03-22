import { useState } from 'react';
import find from 'lodash/find';
import sumBy from 'lodash/sumBy';
import { usePaymentFlowContext } from '../FlowDetailsPage/paymentFlowContext';

const useOverviewDialogData = () => {
  const { flow } = usePaymentFlowContext();
  const [overviewData, setOverviewData] = useState(null);
  const [actionButtonText, setActionButtonText] = useState(null);
  const [isAddToExistingAutomationButton, setIsAddToExistingAutomationButton] = useState(false);
  const [isShowAddYourRecipeContent, setIsShowAddYourRecipeContent] = useState(false);
  const [onlyOneInstructAutomationId, setOnlyOneInstructAutomationId] = useState(null);

  const onSetOverviewData = (data) => {
    if (data?.template?.plan === 'PREMIUM') {
      if (!find(flow?.automations, 'instruct')) {
        setActionButtonText('Add to new canvas');
      } else {
        setActionButtonText('Create new automation');
        setIsAddToExistingAutomationButton(true);
        // if there is only one instruct automation then skip showing modal
        if (sumBy(flow?.automations, 'instruct') === 1) {
          const automation = find(flow?.automations, 'instruct');
          setOnlyOneInstructAutomationId(automation?.id);
        }
      }
    }
    if (data?.template?.plan === 'GENERAL') {
      if (!flow?.automations?.length) {
        setActionButtonText('Add to new canvas');
      } else {
        setActionButtonText('Create new automation');
        setIsAddToExistingAutomationButton(true);
      }
    }
    setOverviewData(data);
  };

  const onCloseDialog = () => {
    setOverviewData(null);
    setActionButtonText(null);
    setIsAddToExistingAutomationButton(false);
    setIsShowAddYourRecipeContent(false);
    setOnlyOneInstructAutomationId(null);
  };

  return {
    overviewData,
    setOverviewData,
    actionButtonText,
    setActionButtonText,
    isAddToExistingAutomationButton,
    setIsAddToExistingAutomationButton,
    isShowAddYourRecipeContent,
    setIsShowAddYourRecipeContent,
    onlyOneInstructAutomationId,
    onCloseDialog,
    onSetOverviewData,
  };
};

export default useOverviewDialogData;
