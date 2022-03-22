import PropTypes from 'prop-types';
import React from 'react';
import Processor from '../../../../components/table/Processor';
import { UI_ROUTES } from '../../../../constants/routes';
import { isDefined } from '../../../../utils/helpers';
import { COUNTRY_MAP } from '../../../../constants/COUNTRY_ISO3';
import { getCountryName } from '../../../../utils/getCountryName';

const GLOBE_URL = 'https://media.graphcms.com/ST1oY1YaR7ysNZf9Kjqn';

const LOCATION_KEYS = {
  unknown: 'Unknown',
  intl: 'Intl',
};

const CountryIconLabelComponent = ({ dataObj }) => {
  const location = dataObj.value;

  if (!isDefined(location) || location === LOCATION_KEYS.unknown) return <p>N/A</p>;

  const countryName = getCountryName(location);
  const countryCode = location ? COUNTRY_MAP[location] || location : '';

  return (
    <Processor
      logo={location === LOCATION_KEYS.intl ? GLOBE_URL : `${UI_ROUTES.countriesIcons}/${countryCode}.svg`}
      name={countryName}
      borderRadius="7px"
    />
  );
};

CountryIconLabelComponent.propTypes = {
  dataObj: PropTypes.shape({
    value: PropTypes.string,
  }),
};
CountryIconLabelComponent.defaultProps = {
  dataObj: {},
};

export default CountryIconLabelComponent;
