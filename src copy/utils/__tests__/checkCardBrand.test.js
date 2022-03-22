import { checkCardBrand } from '../checkCardBrand';

describe('checkCardBrand', () => {
  it('should return ACCOUNT if cardNumber is null', () => {
    const cardNumber = null;
    const cardBrand = checkCardBrand(cardNumber);

    expect(cardBrand).toBe('ACCOUNT');
  });

  it('should return  ACCOUNT if cardBrand does not match any known brand', () => {
    const cardNumber = '0000 0000 0000 0000';
    const cardBrand = checkCardBrand(cardNumber);

    expect(cardBrand).toBe('ACCOUNT');
  });

  it('should return the cardBrand if cardBrand matches any known brand', () => {
    const cardNumber = '6011 0000 0000 0004';
    const cardBrand = checkCardBrand(cardNumber);

    expect(cardBrand).toBe('DISCOVER');
  });
});
