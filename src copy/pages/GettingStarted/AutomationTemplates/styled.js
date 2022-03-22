import styled from 'styled-components';
import { Link } from 'react-router-dom';
import THEME from '../../../constants/theme';
import { BORDER_COLOR } from '../../FlowDetailsPage/constant';

const AutomationTemplatesLine = styled.div`
  position: relative;
`;

const AutomationTemplatesWrapWindow = styled.div`
  position: relative;
  margin-bottom: 16px;
  &:after {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 142px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
    content: '';
  }
  &:before {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 74px;
    background: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
    z-index: 1;
    content: '';
  }
`;

const AutomationTemplatesWrap = styled.div`
  display: flex;
  margin-left: 76px;
  width: 100%;
  max-width: 396px;
  transition: 0.3s;
  transform: ${({ position }) => `translateX(${-position}00%)`};
`;

const AutomationTemplate = styled.div`
  width: calc(100% - 16px);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px;
  border: 1px solid ${BORDER_COLOR};
  border-radius: 8px;
  margin-right: 16px;

  h3 {
    font-size: 20px;
    line-height: 125%;
    margin-top: 0;
    margin-bottom: 12px;
  }
`;

const Categories = styled.div`
  position: relative;
  font-size: 10px;
  color: ${THEME.greyColors.grey15};
  margin-bottom: 4px;
  letter-spacing: 0.08em;
`;

const Icons = styled.div`
  position: relative;
  margin-bottom: 24px;

  > div {
    width: 44px;
    height: 44px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 1px solid ${BORDER_COLOR};
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

const Buttons = styled.div`
  position: relative;
  display: flex;

  > div {
    &:first-child {
      svg {
        transform: rotate(180deg);
      }
    }
  }
`;

const TemplateButtonSwipe = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: ${THEME.greyColors.greyButton};
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  transition: 0.25s;
  &:hover {
    background: ${THEME.greyColors.grey5};
  }
  > * {
    transition: 0.25s;
  }
  ${({ disabled }) =>
    disabled &&
    `
      pointer-events: none;
      background: ${THEME.greyColors.greyButton};
      > * {
        opacity: 0.5;
      }
    `};
`;

const StyledLink = styled(Link)`
  > p {
    &::selection {
      background: transparent;
    }
  }
  svg {
    vertical-align: text-bottom;
    margin-left: 6px;
  }
`;

export {
  AutomationTemplatesLine,
  AutomationTemplatesWrapWindow,
  AutomationTemplatesWrap,
  AutomationTemplate,
  Categories,
  Icons,
  Buttons,
  TemplateButtonSwipe,
  StyledLink,
};
