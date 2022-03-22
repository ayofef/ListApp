import React from 'react';
import { func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import THEME from '../../../constants/theme';
import { useGlobalContext } from '../../../containers/App/context';
import { UI_ROUTES } from '../../../constants/routes';
import ChecklistItem from './ChecklistItem';
import FullScreenModalLayout from '../../layouts/FullScreenModalLayout';
import { totalCompleteSteps } from '../../../utils/helpers';
import { H3, L12, CustomDivider } from '../../atoms';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const ChecklistModal = ({ onClose }) => {
  const { t } = useTranslation();
  const { IS_TABLET, stepsCheckListMeta } = useGlobalContext();
  const { push } = useHistory();
  const totalComplete = totalCompleteSteps(stepsCheckListMeta);
  const itemsList = [
    {
      done: stepsCheckListMeta.flow || false,
      title: t('checklist.itemList.4.title'),
      buttonText: t('checklist.itemList.4.buttonText'),
      buttonAction: () => push(`${UI_ROUTES.root}${UI_ROUTES.allApps}`),
    },
    {
      done: stepsCheckListMeta.bank || false,
      title: t('checklist.itemList.1.title'),
      buttonText: t('checklist.itemList.1.buttonText'),
      buttonAction: () =>
        push({ pathname: `${UI_ROUTES.root}/apps${UI_ROUTES.spendRequest}`, state: { connectBank: 'true' } }),
    },
    {
      done: stepsCheckListMeta.collegues || false,
      title: t('checklist.itemList.2.title'),
      buttonText: t('checklist.itemList.2.buttonText'),
      buttonAction: () => push({ pathname: `${UI_ROUTES.root}${UI_ROUTES.people}`, state: { inviteModal: 'true' } }),
    },
    {
      done: stepsCheckListMeta.slack || false,
      title: t('checklist.itemList.3.title'),
      buttonText: t('checklist.itemList.3.buttonText'),
      buttonAction: () => push({ pathname: UI_ROUTES.addToSlack, state: { addToSlack: 'true' } }),
    },
    {
      done: stepsCheckListMeta.newRequest || false,
      title: t('checklist.itemList.5.title'),
      buttonText: t('checklist.itemList.5.buttonText'),
      buttonAction: () => push({ pathname: `${UI_ROUTES.root}${UI_ROUTES.home}`, state: { newRequest: 'true' } }),
    },
    {
      done: stepsCheckListMeta.approveRequest || false,
      title: t('checklist.itemList.6.title'),
      buttonText: t('checklist.itemList.6.buttonText'),
      buttonAction: () => push(`${UI_ROUTES.root}${UI_ROUTES.home}`),
    },
    {
      done: stepsCheckListMeta.export || false,
      title: t('checklist.itemList.7.title'),
      buttonText: t('checklist.itemList.7.buttonText'),
      buttonAction: () => push(`${UI_ROUTES.root}${UI_ROUTES.transactions}`),
    },
    {
      done: stepsCheckListMeta.billingDetails || false,
      title: t('checklist.itemList.8.title'),
      buttonText: t('checklist.itemList.8.buttonText'),
      buttonAction: () => push(`${UI_ROUTES.root}${UI_ROUTES.settings}`),
    },
    {
      done: totalComplete >= 8 || false,
      title: t('checklist.itemList.9.title'),
      buttonText: t('checklist.itemList.9.buttonText'),
      buttonAction: () => false,
    },
  ];

  return (
    <FullScreenModalLayout
      onClose={onClose}
      className="pageModal"
      pageModal
      padding={IS_TABLET ? '30px 40px' : '32px 110px 60px 110px'}
    >
      <FlexContainer justifyContent="space-between">
        <H3>{t('checklist.title')}</H3>
        {!IS_TABLET && (
          <L12 color={THEME.greyColors.grey1}>{totalComplete === 8 ? 9 : totalComplete} of 9 completed</L12>
        )}
      </FlexContainer>
      <CustomDivider />
      <FlexContainer flexDirection="column">
        {itemsList.map((item) => (
          <ChecklistItem {...item} onClose={onClose} key={`ListItem-${item?.title}`} />
        ))}
      </FlexContainer>
    </FullScreenModalLayout>
  );
};

ChecklistModal.propTypes = {
  onClose: func.isRequired,
};

export default ChecklistModal;
