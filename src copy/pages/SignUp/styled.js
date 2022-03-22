import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import THEME from '../../constants/theme';

export const SlackButtonCover = styled.div`
  margin: 40px 0 0;
`;

export const StyledLink = styled(NavLink)`
  color: ${THEME.secondaryColors.blue};
`;

export const LeftSidePoints = styled.div`
  position: relative;
`;

export const LineOr = styled.div`
  position: relative;
  text-align: center;
  font-size: 12px;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 24px;
  color: #787f88;
  &::before {
    position: absolute;
    top: 7px;
    width: calc(50% - 24px);
    height: 1px;
    background: #e6e9ec;
    content: '';
    left: 0;
  }
  &::after {
    position: absolute;
    top: 7px;
    width: calc(50% - 24px);
    height: 1px;
    background: #e6e9ec;
    content: '';
    right: 0;
  }
`;

export const LeftSidePoint = styled.div`
  margin-bottom: 32px;
  display: flex;
  max-width: 424px;

  img {
    position: relative;
    top: 3px;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    margin-right: 24px;
  }
`;

export const Logo = styled.img`
  display: block;
  margin-bottom: 32px;
`;
