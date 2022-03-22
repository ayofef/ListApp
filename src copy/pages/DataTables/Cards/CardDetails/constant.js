import omit from 'lodash/omit';
import { getCountryName } from '../../../../utils/getCountryName';
import { flattenNestedObject, LABEL_MAP } from '../../components/Details/constant';

const ROW_DETAILS = ['token', 'product', LABEL_MAP.expiry, 'bankName', 'country', 'brand'];

const mapBillingAddressToSectionData = (billingAddress) => {
  if (!billingAddress) {
    return {};
  }

  const sectionData = omit(flattenNestedObject(billingAddress), ['__typename']);
  sectionData.country = getCountryName(sectionData.country);

  return sectionData;
};

export { ROW_DETAILS, mapBillingAddressToSectionData };
