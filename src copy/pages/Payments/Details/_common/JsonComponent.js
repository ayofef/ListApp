import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import JsonViewer from '../../../../components/atoms/JsonViewer';
import { StyledJsonBlockWrapper, StyledMetadataWrapper } from '../sections/styled';
import { parseJSON } from '../../../../utils/parseJSON';

const JsonComponent = ({ dataObj }) => {
  const json = parseJSON(dataObj.value);

  return (
    <Box pb="20px" width="100%">
      <StyledMetadataWrapper $transform="translateY(20px)">
        <StyledJsonBlockWrapper>
          <JsonViewer json={json} name={dataObj.key} theme="eighties" />
        </StyledJsonBlockWrapper>
      </StyledMetadataWrapper>
    </Box>
  );
};

JsonComponent.propTypes = {
  dataObj: PropTypes.shape({
    value: PropTypes.string,
    key: PropTypes.string,
  }),
};
JsonComponent.defaultProps = {
  dataObj: {},
};
export default JsonComponent;
