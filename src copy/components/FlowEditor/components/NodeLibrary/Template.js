import React from 'react';
import PropTypes from 'prop-types';
import { TemplateNodes, TemplateWrapper } from './styled';
import { L12B } from '../../../atoms/Typography/L12B';
import { useCreateFlowFromTemplate } from '../../../../hooks/flowActions/useCreateFlow';

const Template = ({ title, id }) => {
  const [createFlowFromTemplatePromise] = useCreateFlowFromTemplate();

  const onClick = () => {
    createFlowFromTemplatePromise(null, id);
  };

  return (
    <TemplateWrapper onClick={onClick}>
      <TemplateNodes display="flex" flexDirection="row" />
      <L12B>{title}</L12B>
    </TemplateWrapper>
  );
};

Template.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Template;
