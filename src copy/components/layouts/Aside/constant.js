import { isDefined } from '../../../utils/helpers';

const checkSiteRouteFeatureDisabled = ({ route, navFeatures }) => {
  if (!isDefined(route.features)) return false;
  const features = Object.keys(route.features);

  const isFeatureDisabled = features.some((featureKey) => {
    if (!isDefined(navFeatures[featureKey])) return false;

    const { expectedValue } = route.features[featureKey];

    const isDisabled = expectedValue !== navFeatures[featureKey];

    return isDisabled;
  });

  return isFeatureDisabled;
};

const transformSiteMap = ({ sitemap = [], navFeatures = {}, checkPermission }) =>
  sitemap.reduce((acc, current) => {
    const isFeatureDisabled = checkSiteRouteFeatureDisabled({
      route: current,
      navFeatures,
    });

    if (isFeatureDisabled) return acc;

    const hasPermission = isDefined(current.permission) ? checkPermission(current.permission) : true;

    if (!hasPermission) return acc;

    return [...acc, current];
  }, []);
const USER_PILOT_SECTION_ID = 'navigation-aside';

export { transformSiteMap, USER_PILOT_SECTION_ID };
