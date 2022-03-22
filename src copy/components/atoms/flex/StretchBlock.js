import styled from 'styled-components';
import { string } from 'prop-types';
import { FlexContainer } from './FlexContainer';

export const StretchBlock = styled(FlexContainer)`
  min-height: ${({ minHeight }) => minHeight || 'inherit'};
  margin: ${({ margin }) => margin || '0'};
  height: ${({ height }) => height || '100%'};
`;

StretchBlock.propTypes = {
  minHeight: string,
  margin: string,
  height: string,
};
