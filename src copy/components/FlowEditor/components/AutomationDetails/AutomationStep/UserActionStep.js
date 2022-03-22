import React from 'react';
import { useTranslation } from 'react-i18next';
import UserDecision from './fields/UserDecision';
import PeopleMultiSelectField from './fields/PeopleMultiSelectField';
import UserDecisionPromptField from './fields/UserDecisionPromptField';
import SubTitle from '../SubTitle';

const UserActionStep = () => {
  const { t } = useTranslation();
  return (
    <>
      <SubTitle>
        {t('Request approval from a teammate before proceeding with the next step of the automation')}
      </SubTitle>
      <UserDecision />
      <UserDecisionPromptField />
      <PeopleMultiSelectField fieldName="newOwners" title="New Owners" />
    </>
  );
};

export default UserActionStep;
