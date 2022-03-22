import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const LayoutWrapper = styled.div`
  ${({ theme }) => {
    if (theme === 'dark') {
      return `
        background: #f5f6f7;
        // color: white;
      `;
    }
    return null;
  }};
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #f5f6f7;
`;

export const Header = styled.div`
  display: flex;
  padding: 24px 30px;
  justify-content: flex-end;

  @media (min-width: ${THEME.breakPoints.tabletLarge}px) {
    padding: 42px 60px;
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* overflow: hidden; */
  width: 100%;
  padding-bottom: 80px;
  flex: 1;

  & .MuiOutlinedInput-root {
    height: 48px !important;
  }
  & .MuiInputBase-root {
    height: 48px !important;
  }
  & .MuiSelect-root {
    height: 40px !important;
  }
`;

export const StyledLogOutButton = styled.button`
  position: relative;
  border-radius: 8px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: 0.35s;
  flex-shrink: 0;
  border: 1px solid #5e6170;
  color: #fff;
  background: rgba(255, 255, 255, 0);
  padding: 0 24px;
  outline: none;
  margin-left: auto;
  margin-top: -4px;
  span {
    font-size: 16px;
    position: relative;
    line-height: 2.2;
    padding: 12px 0;
    text-align: center;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
    transform-style: preserve-3d;
    transition: 0.25s;
    line-height: 1 !important;
  }

  .buttonBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: 0.35s;
  }
  &:hover {
    border: 1px solid white;
    background: rgba(255, 255, 255, 1);
    color: #0e1017;
  }
`;
