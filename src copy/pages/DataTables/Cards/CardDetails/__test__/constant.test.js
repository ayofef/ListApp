import { LABEL_MAP } from '../../../components/Details/constant';
import { mapBillingAddressToSectionData } from '../constant';

describe('mapBillingAddressToSectionData', () => {
  it('should map valid billing address to section data', () => {
    const billingAddress = {
      __typename: 'BillingAddressApi',
      line1: 'Bartlett Avenue',
      line2: 'no. 4',
      city: 'Southfield',
      postalCode: '48076',
      state: 'Michigan',
      country: 'USA',
    };

    const result = mapBillingAddressToSectionData(billingAddress);

    expect(result).toEqual({
      [LABEL_MAP.line1]: billingAddress.line1,
      [LABEL_MAP.line2]: billingAddress.line2,
      city: billingAddress.city,
      [LABEL_MAP.postalCode]: billingAddress.postalCode,
      state: billingAddress.state,
      country: 'United States',
    });
  });

  it('should return an empty object if billing address is not defined', () => {
    const result = mapBillingAddressToSectionData(null);

    expect(result).toEqual({});
  });
});
