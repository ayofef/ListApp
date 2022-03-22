import React from 'react';
import DataLookupConnectionsField from './fields/DataLookupConnectionsField';
import LookupField from './fields/LookupField';
import SearchTermsField from './fields/SearchTermsField/SearchTermsField';
import MatchTypeField from './fields/MatchTypeField';
import MatchRequiredField from './fields/MatchRequiredField';
import PeopleMultiSelectField from './fields/PeopleMultiSelectField';

const DataLookupStep = () => {
  return (
    <>
      <LookupField />

      <DataLookupConnectionsField />

      <PeopleMultiSelectField fieldName="usersToResolve" title="Problem Resolvers" />

      <MatchTypeField />

      <MatchRequiredField />

      <SearchTermsField />
    </>
  );
};

export default DataLookupStep;
