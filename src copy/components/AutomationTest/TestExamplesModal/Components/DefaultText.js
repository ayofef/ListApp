import PropTypes from 'prop-types';
import React from 'react';
import { P14 } from '../../../atoms';

const DefaultText = ({ value }) => {
  return <P14>{value}</P14>;
};

DefaultText.propTypes = {
  value: PropTypes.string.isRequired,
};

export default DefaultText;
