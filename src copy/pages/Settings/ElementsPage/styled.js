import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import ChevronRight from '../../../assets/icons/Elements/ChevronRight';

export const StyledIconText = styled.p`
  font-size: ${({ fontSize }) => fontSize || '14px'};
  font-weight: ${({ fontWeight }) => fontWeight || '400'};
  color: #787f88;
  margin: ${({ margin }) => margin || '0px'};
`;

export const StyledSection = styled(Grid)`
  border-right: 1px solid #e6e9ec;
  border-bottom: 1px solid #e6e9ec;
  &:nth-child(3n) {
    border-right: 0;
  }

  &:nth-last-child(-n + 3) {
    border-bottom: 1px solid #e6e9ec;
  }
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    min-height: 300px;

    & > :last-child {
      margin-top: auto;
    }
  }
  &:nth-child(1),
  &:nth-child(4),
  &:nth-child(7),
  &:nth-child(10) {
    & > div {
      padding-left: 28px;
    }
  }
  border-bottom: ${({ isTopBorderHidden }) => (isTopBorderHidden ? '0' : '1px solid #e6e9ec')};

  &:hover {
    ${StyledIconText} {
      color: #4e40ef;
      svg {
        path {
          stroke: #4e40ef;
        }
      }
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? '#f5f2ff' : '#f5f6f7')};
`;

export const StyledTypography = styled.p`
  font-size: ${({ fontSize }) => fontSize || '14px'};
  font-weight: ${({ fontWeight }) => fontWeight || '400'};
  color: ${({ color }) => color || '#000'};
  margin: ${({ margin }) => margin || '0px'};
`;

export const StyledChevronRight = styled(ChevronRight)`
  font-size: ${({ fontSize }) => fontSize || '16px'};
  margin: ${({ margin }) => margin || '0px'};
`;

export const StyledSpan = styled.span`
  padding: 6px 8px;
  font-weight: 600;
  font-size: 12px;
  color: #545a61;
  background-color: #f5f6f7;
  border-radius: 4px;
  cursor: default;
`;

export const StyledWrapper = styled.div`
  margin: 0 8px;
  font-size: 16px;
  line-height: 16px;
  font-weight: bold;
  color: #c1c3c6;
`;
