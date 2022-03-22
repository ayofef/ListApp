const LABEL_MAP = {
  postalCode: 'postal code',
  line1: 'address line 1',
  line2: 'address line 2',
  bankName: 'bank name',
  externalId: 'external id',
  expiry: 'expiry date',
};
const BILLING_DETAILS = [LABEL_MAP.line1, LABEL_MAP.line2, 'city', LABEL_MAP.postalCode, 'state', 'country'];
const SHIPPING_DETAILS = [
  'name',
  'phone',
  LABEL_MAP.line1,
  LABEL_MAP.line2,
  'city',
  LABEL_MAP.postalCode,
  'state',
  'country',
];

const flattenNestedObject = (data) =>
  Object.keys(data ?? {}).reduce((acc, curr) => {
    const value = data[curr];
    if (typeof value === 'object') {
      const _value = Object.keys(value ?? {}).reduce((_acc, _curr) => {
        const nestedValue = value[_curr];

        return { ..._acc, [LABEL_MAP[_curr] ?? _curr]: nestedValue };
      }, {});
      return { ...acc, ..._value };
    }
    return { ...acc, [LABEL_MAP[curr] ?? curr]: value };
  }, {});

export { BILLING_DETAILS, SHIPPING_DETAILS, LABEL_MAP, flattenNestedObject };
