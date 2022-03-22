import React from 'react';
import StaticConnectionField from './fields/StaticConnectionField';
import EventField from './fields/EventField';

const ConnectionEventTriggerStep = () => {
  return (
    <>
      <StaticConnectionField />

      <EventField />
    </>
  );
};

export default ConnectionEventTriggerStep;
