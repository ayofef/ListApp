import React from 'react';
import PropTypes from 'prop-types';
import capitalize from '@material-ui/core/utils/capitalize';
import { CircleIndicator } from '../../atoms/Indicator';

const StatusString = ({ data }) => {
  const variant = data.toLowerCase();

  return <CircleIndicator variant={variant}>{capitalize(variant)}</CircleIndicator>;
};

StatusString.propTypes = {
  data: PropTypes.string.isRequired,
};

export default StatusString;
