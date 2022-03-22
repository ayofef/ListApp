import PropTypes from 'prop-types';
import React from 'react';
import ReactJson from 'react-json-view';
import { StyledJsonContainer } from './styled';
import { isDefined } from '../../../utils/helpers';

/**
 * react-json-view
 * Documentation: https://github.com/mac-s-g/react-json-view
 *
 */

const MAX_STRING_LENGTH = 200;
const MAX_ARRAY_LENGTH = 10;

const JsonViewer = ({ name, json, theme }) => {
  if (!isDefined(name)) {
    throw new Error('Specify a name for the root node - JsonViewer');
  }

  return (
    <StyledJsonContainer $theme={Boolean(theme)}>
      <ReactJson
        collapsed={1}
        src={json}
        name={name}
        iconStyle="circle"
        indentWidth={6}
        collapseStringsAfterLength={MAX_STRING_LENGTH}
        groupArraysAfterLength={MAX_ARRAY_LENGTH}
        enableClipboard={false}
        displayDataTypes={false}
        {...(isDefined(theme) && { theme })}
      />
    </StyledJsonContainer>
  );
};

JsonViewer.propTypes = {
  json: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  theme: PropTypes.string,
};
JsonViewer.defaultProps = {
  theme: undefined,
};

export default JsonViewer;
