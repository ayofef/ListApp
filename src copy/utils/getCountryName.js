import { countryList } from '../constants/countryList';

export const getCountryName = (alpha3) => {
  if (alpha3 && typeof alpha3 === 'string') {
    return countryList.find((el) => el?.['alpha-3'] === alpha3)?.name ?? alpha3?.toUpperCase();
  }
  return alpha3;
};
