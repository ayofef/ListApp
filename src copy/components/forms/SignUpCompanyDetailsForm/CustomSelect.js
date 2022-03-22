import React from 'react';
import styled from 'styled-components';
import { string, number } from 'prop-types';
import { L12, BlockWrap } from '../../atoms';

import Select from '../_common/StyledSelect';

const PaperComponent = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04) !important;
  border-radius: 6px !important;
  margin-top: 6px;
  height: 200px;
`;

const CustomSelect = ({ label, index, ...rest }) => (
  <BlockWrap margin={index === 2 ? '16px 0 0' : '4px 0 0'}>
    {label && (
      <L12 margin="-3px 0 -9px" fontWeight="700">
        {label}
      </L12>
    )}
    <Select paperComponent={PaperComponent} {...rest} />
  </BlockWrap>
);

CustomSelect.propTypes = {
  label: string,
  index: number,
};

CustomSelect.defaultProps = {
  label: '',
  index: 0,
};
export default CustomSelect;
