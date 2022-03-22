import { getPaymentMethodSectionData } from '../getPaymentMethodSectionData';
import { mockedPaymentMethod } from '../../mockedData';
import { PAYMENT_DESCRIBED_KEYS } from '../../paymentDescribedDataKeys';

describe('getPaymentMethodSectionData', () => {
  it('should return empty state if isIntent is undefined and payment is undefined', () => {
    const result = getPaymentMethodSectionData({});
    expect(result).toMatchObject(mockedPaymentMethod);
  });

  it('should return empty state if isIntent is true and payment is null', () => {
    const result = getPaymentMethodSectionData({ isIntent: true, payment: null });
    expect(result).toMatchObject(mockedPaymentMethod);
  });

  it('should return empty state if isIntent is true and paymentMethodDetails value is null', () => {
    const result = getPaymentMethodSectionData({
      isIntent: true,
      payment: {
        paymentMethodDetails: {
          value: null,
        },
      },
    });
    expect(result).toMatchObject(mockedPaymentMethod);
  });

  it('should return the transformed data if isIntent is undefined and payment is defined', () => {
    const result = getPaymentMethodSectionData({
      isIntent: undefined,
      payment: {
        paymentMethodDetails: {
          value: [{ foo: 'bar' }],
        },
      },
    });
    expect(result).toMatchObject({
      value: [
        { foo: 'bar' },
        {
          key: PAYMENT_DESCRIBED_KEYS.country,
          value: 'N/A',
        },
      ],
    });
  });
});
