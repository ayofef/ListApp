import { useMemo } from 'react';
import { useFlowPropertiesList } from '../hooks/useFlowPropertiesList';

const useFlatFlowProperties = () => {
  const result = useFlowPropertiesList();
  const flatProperties = useMemo(
    () =>
      result?.data?.getAvailableProperties?.reduce(
        (acc, { properties }) => [...acc, ...properties.map(({ key, label }) => ({ value: key, title: label }))],
        []
      ),
    [result?.data?.getAvailableProperties]
  );

  return { flatProperties, ...result };
};

export { useFlatFlowProperties };
