import PropTypes from 'prop-types';
import React from 'react';
import Processor from '../../../../components/table/Processor';

const ProcessorComponent = ({ dataObj }) => {
  const { logo, name } = dataObj;

  return <Processor logo={logo} name={name} size={20} />;
};

ProcessorComponent.propTypes = {
  dataObj: PropTypes.shape({
    name: PropTypes.string,
    logo: PropTypes.string,
  }),
};
ProcessorComponent.defaultProps = {
  dataObj: {
    name: 'N/A',
    logo: 'N/A',
  },
};
export default ProcessorComponent;
