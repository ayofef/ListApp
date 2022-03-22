import styled from 'styled-components';
import Box from '@material-ui/core/Box';

export const StyledBox = styled(Box)`
  position: relative;
  background-color: #fff;
  width: ${({ width }) => width || '100px'};
  border-radius: 6px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.04), 0 10px 14px rgba(0, 0, 0, 0.04);
`;

export const StyledItemBox = styled(Box)`
  display: flex;
  align-items: center;
  height: 36px;
  cursor: pointer;
  padding-left: 14px;
  &:not(:last-child) {
    border-bottom: 1px solid #f5f6f7;
  }
`;

export const StyledIconBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-right: 14px;
  color: #787f88;
`;

export const StyledTitleWrapper = styled(Box)`
  display: flex;
  align-items: center;
  padding: 20px 24px 0 24px;
`;

export const ContentBox = styled(Box)`
  padding: 0 24px;
`;

export const FooterBox = styled(Box)`
  padding: 40px 24px 24px 24px;
  & > :not(:first-child) {
    margin-left: 8px;
  }
`;
