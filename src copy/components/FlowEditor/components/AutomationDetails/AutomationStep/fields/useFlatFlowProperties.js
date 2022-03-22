import { useMemo } from 'react';
import { useFlowPropertiesList } from './hooks';

const useFlatFlowProperties = (matchingTypes = []) => {
  const result = useFlowPropertiesList(matchingTypes, 'no-cache');
  const flatProperties = useMemo(() => {
    const set = new Set();

    return result?.data?.getAvailableProperties?.reduce((acc, group) => {
      if (!group?.properties) {
        return acc;
      }

      return [
        ...acc,
        ...group.properties.reduce((subAcc, property) => {
          const key = property?.key;

          if (!key || set.has(key)) {
            return subAcc;
          }

          const { label, type } = property;

          set.add(key);

          return [...subAcc, { value: key, title: label, propertyType: type }];
        }, []),
      ];
    }, []);
  }, [result?.data?.getAvailableProperties]);

  return { flatProperties, ...result };
};

export { useFlatFlowProperties };
