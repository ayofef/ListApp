import styled from 'styled-components';
import THEME from '../../../../constants/theme';
import { displayVisible, displayNone } from '../styled';

const StyledWrapper = styled.span`
  position: relative;
  margin-left: 20px;
  cursor: pointer;
  & > span {
    color: #787f88;
    font-size: 24px;
    background-color: #c1c5cb;
    border-radius: 6px;
    width: 27px;
    height: 27px;
    display: block;
    position: relative;
    transition: all 0.1s ease-out;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin-left: -0.1px;
    }
  }

  &:hover {
    ${displayVisible};
    & > span:first-child {
      color: ${THEME.primaryColors.blue};
      background-color: #fff;
    }
    & div {
      ${displayVisible};
      transform: scale(1);
    }
  }
`;
const StyledDropdownWrapper = styled.div`
  min-width: 142px;
  position: absolute;
  top: 30px;
  left: 0;
  background: #ffffff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  box-sizing: border-box;
  z-index: 300;
  ${displayNone};
  transform: scale(0);
  transform-origin: 0 0;
  &:hover {
    ${displayVisible};
  }

  ul {
    margin: 0;
    padding: 8px 0;
    li {
      list-style-type: none;
      text-transform: capitalize;
      padding: 2px 16px;
      font-weight: normal;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: black;

      & span {
        font-size: 16px;
        transform: translateY(2px);
      }

      &:hover {
        color: ${THEME.primaryColors.blue};
      }
    }

    & .subMenuBack {
      justify-content: flex-start;
      margin-bottom: 4px;
      font-weight: 600;
      span {
        transform: rotate(180deg) translateY(2px) translateX(3px);
      }
    }
  }
`;
const StyledMenuItem = styled.div`
  li {
    ${({ isActive }) => isActive && `color: ${THEME.primaryColors.blue} !important; font-weight: 600 !important;`}
  }
`;
export { StyledDropdownWrapper, StyledWrapper, StyledMenuItem };
