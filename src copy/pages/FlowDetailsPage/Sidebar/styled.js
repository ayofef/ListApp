import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import THEME from '../../../constants/theme';
import { BORDER_COLOR } from '../constant';

const COMMON_LIST_CSS = css`
  list-style-type: none;
  margin: 0;
  padding: 0;

  & > :not(:last-child) {
    margin-bottom: 1.5px;
  }
`;

const COMMON_LINK_CSS = css`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.3s ease-out;
  text-decoration: none;
  color: ${THEME.primaryColors.primary};
  font-weight: 500;
  line-height: 24px;
  background: transparent;
  cursor: pointer;
  svg {
    margin-left: 6px;
    color: ${THEME.primaryColors.primary};
    font-size: 10px;
  }
`;

const LINK_HOVER_STYLES = css`
  color: ${THEME.primaryColors.primary};
  svg {
    color: ${THEME.primaryColors.primary};
    stroke: ${THEME.primaryColors.primary};
  }
`;

const StyledLinkList = styled.ul`
  ${COMMON_LIST_CSS};
`;

const StyledLinks = styled(NavLink)`
  ${COMMON_LINK_CSS};

  &:hover {
    ${({ $newTab }) =>
      $newTab
        ? css`
            ${LINK_HOVER_STYLES};
          `
        : css`
            background-color: rgba(230, 233, 236, 0.6);
          `}
  }

  &.${({ activeClassName }) => [`${activeClassName}`, `${activeClassName}:hover`].join(', ')} {
    background: ${THEME.primaryColors.primaryLight};
    ${LINK_HOVER_STYLES};
    &:hover {
    }
  }
`;

const StyledExternalLinkList = styled.ul`
  ${COMMON_LIST_CSS};
  padding-top: 20px;
  margin-top: 20px;
  &::before {
    content: '';
    display: block;
    position: relative;
    width: 192px;
    height: 1px;
    background-color: ${BORDER_COLOR};
    margin: 0 auto;
    transform: translateY(-20px);
  }
`;

const ExternalLink = styled.a`
  ${COMMON_LINK_CSS};
  line-height: ${({ $lineHeight }) => $lineHeight || '24px'};
  &:hover {
    ${LINK_HOVER_STYLES};
  }
`;

export { StyledLinkList, StyledExternalLinkList, StyledLinks, ExternalLink };
