import styled from 'styled-components';
import { string } from 'prop-types';
import { customTextColor } from '../../../constants/CommonStyles';

export const P14 = styled.p`
  ${customTextColor};
  font-size: 14px;
  line-height: ${({ lineHeight }) => lineHeight || '20px'};
  white-space: ${({ whiteSpaceNoWrap }) => (whiteSpaceNoWrap ? 'nowrap' : 'normal')};
  padding: ${({ padding }) => padding || '0'};
  text-align: ${({ textAlign }) => textAlign || 'inherit'};
  opacity: ${({ opacity }) => opacity || '1'};
  cursor: ${({ cursor }) => cursor || 'inherit'};
  width: ${({ width }) => width || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || ''};
`;

P14.propTypes = {
  width: string,
  cursor: string,
  textAlign: string,
  color: string,
};
