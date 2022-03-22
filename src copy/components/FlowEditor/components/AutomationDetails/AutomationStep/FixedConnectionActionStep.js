import React from 'react';
import ActionField from './fields/ActionField';
import StaticConnectionField from './fields/StaticConnectionField';

const FixedConnectionActionStep = () => {
  return (
    <>
      <StaticConnectionField />

      <ActionField />
    </>
  );
};

export default FixedConnectionActionStep;
