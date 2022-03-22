import { getCountryName } from '../getCountryName';

const USA_COUNTRY_OBJ = { name: 'United States', 'alpha-3': 'USA', 'country-code': '840' };

describe('getCountryName', () => {
  it('should return null if alpha3 is null', () => {
    const alpha3 = null;
    const countryName = getCountryName(alpha3);
    expect(countryName).toBe(alpha3);
  });

  it('should return undefined if alpha3 is undefined', () => {
    const alpha3 = undefined;
    const countryName = getCountryName(alpha3);
    expect(countryName).toBe(alpha3);
  });

  it('should return alpha3 in uppercase if alpha3 does not match known country', () => {
    const alpha3 = 'foo';
    const countryName = getCountryName(alpha3);
    expect(countryName).toEqual(alpha3.toUpperCase());
  });

  it('should return country name if alpha3 matches known country', () => {
    const alpha3 = USA_COUNTRY_OBJ['alpha-3'];
    const countryName = getCountryName(alpha3);
    expect(countryName).toEqual(USA_COUNTRY_OBJ.name);
  });
});
