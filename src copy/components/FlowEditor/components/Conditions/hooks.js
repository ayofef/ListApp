import { useState } from 'react';

export const useChooseValueConditionData = () => {
  const [selectIfValue, setSelectIfValue] = useState(null);
  const [selectStatusValue, setSelectStatusValue] = useState(null);

  const ifOptions = [
    {
      value: 'matches',
      title: 'Matches',
    },
    {
      value: 'qqq',
      title: 'Qqq',
    },
  ];

  const statusOptions = [
    {
      value: 'failed',
      title: 'Failed',
    },
  ];

  return {
    ifOptions,
    statusOptions,
    selectIfValue,
    setSelectIfValue,
    selectStatusValue,
    setSelectStatusValue,
  };
};
