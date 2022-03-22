import React from 'react';
import PropTypes from 'prop-types';
import 'antd';
import { StyledCron } from './styled';
import './style.css';

const CronInput = ({ value, onChange, onError }) => (
  <StyledCron value={value} setValue={onChange} onError={onError} clearButton={false} />
);

CronInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default CronInput;
