import { useCallback, useMemo } from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';

export const useFeatureChecker = () => {
  const features = useFlags();

  const checkFeature = useCallback(
    (featureId) => {
      const feature = features?.[featureId];

      const enabled = Boolean(feature);

      return enabled;
    },
    [features]
  );

  return { checkFeature };
};

export const useFeature = (featureId) => {
  const { checkFeature } = useFeatureChecker();

  const hasFeature = useMemo(() => checkFeature(featureId), [checkFeature, featureId]);

  return [hasFeature];
};
