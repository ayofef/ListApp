import React from 'react';
import { isNode } from 'react-flow-renderer';
import Option from './Option';
import { isNodeConnectable } from '../../../../../utils/isNodeConnectable';

const createOptions = ({ elements, selectedElementData }) =>
  elements.reduce((acc, element) => {
    if (!isNode(element) || !isNodeConnectable({ nodeId: selectedElementData.id }, element.id, elements, true)) {
      return acc;
    }

    const {
      id,
      data: { name, group },
    } = element;

    return [...acc, { value: id, title: <Option name={name} group={group} /> }];
  }, []);

export { createOptions };
