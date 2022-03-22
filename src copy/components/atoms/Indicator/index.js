import styled from 'styled-components';
import { IndicatorBase, STATUS_COLORS } from './IndicatorBase';

const CircleIndicator = styled(IndicatorBase)`
  margin-left:  ${({ $isIssuesDetails }) => ($isIssuesDetails ? '0' : '15px')};
  display: inline-block;
  ${({ $isIssuesDetails, variant }) =>
    $isIssuesDetails && `color:  ${STATUS_COLORS[variant] || STATUS_COLORS.cancelled}`};
    
  &:after {
    left: -15px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    ${({ $isIssuesDetails }) => $isIssuesDetails && `display: none;`}
`;

const SquareIndicator = styled(IndicatorBase)`
  margin-left: 23px;

  &:after {
    width: 16px;
    height: 16px;
    left: -23px;
    border-radius: 4px;
  }
`;

export { CircleIndicator, SquareIndicator };
