import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CircleIndicator } from '../../../atoms/Indicator';

const Status = ({ value }) => {
  const { t } = useTranslation();

  return <CircleIndicator variant={value.toLowerCase()}>{t(value)}</CircleIndicator>;
};

Status.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Status;
