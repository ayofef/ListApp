import React, { useCallback, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { CREATE_SUBSTAGE_AUTOMATION } from '../../../../utils/queries/flows/mutations';
import { PaymentFlowContext } from '../../paymentFlowContext';
import NewAutomationDialog from './NewAutomationDialog';
import { getStorageValue } from '../../../../client/links/demoLink/storage';
import AddNewButton from '../../Components/AddNewButton';
import { isDefined } from '../../../../utils/helpers';

import { TOAST_TITLE, TOAST_TIMEOUT } from '../../hooks/constant';
import { GET_PAYMENT_FLOW_STAGES } from '../../../../utils/queries/flows/flowsQueries';

const NewAutomation = ({ openDialog, toggleIsOpen }) => {
  const { t } = useTranslation();
  const [createNewAutomation] = useMutation(CREATE_SUBSTAGE_AUTOMATION);
  const { setSaving, flow, setFlow, refetch } = useContext(PaymentFlowContext);
  const { data: paymentFlowStagesData } = useQuery(GET_PAYMENT_FLOW_STAGES, {
    variables: {
      id: flow?.id,
    },
    fetchPolicy: 'no-cache',
    skip: !flow?.id,
  });
  const paymentFlowStages = useMemo(() => paymentFlowStagesData?.getPaymentFlow?.stages, [
    paymentFlowStagesData?.getPaymentFlow?.stages,
  ]);
  const isDemo = getStorageValue();

  const handleNewSubStageAutomation = useCallback(
    async ({ parentType, parentId, automationName }) => {
      if (isDemo) {
        return;
      }
      setSaving(true);
      try {
        const res = await createNewAutomation({
          variables: {
            parentType,
            parentId,
            automationName,
          },
        });
        if (!isEmpty(res?.errors)) {
          NotificationManager.error(t(res?.errors[0]?.message), t(TOAST_TITLE), TOAST_TIMEOUT);
          return;
        }
        if (isDefined(res?.data?.createSubstageAutomation?.id)) {
          const successMessage = 'Successfully created a new automation';
          const refetchData = await refetch();
          if (!isEmpty(refetchData?.data?.getPaymentFlow)) {
            setFlow(refetchData?.data?.getPaymentFlow);
          }
          NotificationManager.success(t(successMessage), t(TOAST_TITLE), TOAST_TIMEOUT);
          return;
        }
        NotificationManager.error(t('uiMessages.error'), t(TOAST_TITLE), TOAST_TIMEOUT);
      } catch (e) {
        NotificationManager.error(t('uiMessages.error'), t(TOAST_TITLE), TOAST_TIMEOUT);
      } finally {
        setSaving(false);
        toggleIsOpen();
      }
    },
    [createNewAutomation, setSaving, toggleIsOpen, setFlow, isDemo, t, refetch]
  );

  const onSubmit = useCallback(
    ({ automationName, parentType }) => {
      const currentSubstages = paymentFlowStages?.find((el) => el?.type === parentType?.stage)?.substages;
      const parentObj = currentSubstages?.find((substage) => substage?.name === parentType?.substageName);
      if (parentObj) {
        return handleNewSubStageAutomation({
          parentType: parentObj?.type,
          parentId: parentObj?.id,
          automationName: automationName,
          key: parentType?.key,
          substageName: parentType?.substageName,
        });
      }
      return NotificationManager.error(
        t('Automation run scenario not found, Please try again'),
        'Flow Automations',
        5000
      );
    },
    [handleNewSubStageAutomation, paymentFlowStages, t]
  );

  return (
    <>
      <AddNewButton label="Create new automation" onClick={toggleIsOpen} iconBorderRadius="8px" />
      {openDialog && <NewAutomationDialog toggleIsOpen={toggleIsOpen} isOpen={openDialog} onSubmit={onSubmit} />}
    </>
  );
};

NewAutomation.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
};

export default NewAutomation;
