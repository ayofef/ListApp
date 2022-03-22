import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles, Tooltip } from '@material-ui/core';

const RESET_BUTTON = css`
  padding: 0;
  margin: 0;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0) !important;
  outline: none;
  border: none;
  width: 100%;
`;

const StyledHeader = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  h4 {
    white-space: nowrap;
    text-transform: capitalize;
  }
  ${RESET_BUTTON};
  .collapsable-icon {
    transform: translateY(6px) scale(0.75);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
`;
const StyledIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  ${RESET_BUTTON};
  transition: all 0.35s ease-out;
  height: 32px;

  & .has-notification {
    transform: translateX(-4px);
  }

  &:hover {
    svg {
      .path {
        stroke: #4e40ef;
      }
    }
    .collapsable {
      path,
      rect {
        stroke: #4e40ef;
      }
    }
    .support {
      path,
      rect {
        stroke: #4e40ef;
      }
      circle {
        fill: #4e40ef;
      }
    }
  }
`;

const StyledSwitchUser = styled.li`
  position: relative;
  margin-bottom: 4px;
  ${StyledIconButton} {
    position: absolute;
    z-index: 999;
    opacity: ${({ sidebarCollapsed }) => (sidebarCollapsed ? 1 : 0)};
    visibility: ${({ sidebarCollapsed }) => (sidebarCollapsed ? 'visible' : 'hidden')};
    transform: ${({ sidebarCollapsed }) =>
      sidebarCollapsed ? 'rotate(180deg) scale(1)' : 'rotate(180deg) scale(0.5)'};
  }
  & .switch-user {
    transition: all 0.3s ease-out;
    opacity: ${({ sidebarCollapsed }) => (sidebarCollapsed ? 0 : 1)};
    visibility: ${({ sidebarCollapsed }) => (sidebarCollapsed ? 'hidden' : 'visible')};
    transform: ${({ sidebarCollapsed }) => (sidebarCollapsed ? 'scale(0.5);' : 'scale(1)')};
  }
`;

const AsideTooltip = withStyles(() => ({
  tooltip: {
    maxWidth: 220,
    fontSize: 12,
    padding: '4px 7px',
    backgroundColor: '#232629',
    fontWeight: 600,
    left: '6px',
    marginLeft: '8px',
  },
}))(Tooltip);

const List = styled('ul')`
  list-style: none;
  margin: ${({ margin }) => margin || '0'};
  padding: 0;
  & li {
    & a {
      position: relative;

      & > button {
        position: absolute;
        display: none;
        right: 4px;
        top: 50%;
        transform: translate(0, -50%);
        padding: 1px;
        margin: 0;
        border: none;
        border-radius: 50%;
        outline: none;
        background-color: transparent;
        transition: background-color 0.3s;
        color: #58626e;

        &:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
    }

    &:hover {
      & > a button {
        display: flex;
      }
    }
  }
`;

const LinkLists = styled(List)`
  display: flex;
  flex: 0 0;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 16px 16px 30px;
  border-right: 1px solid #e6e9ec;
  position: relative;
`;

const StyledAside = styled('aside')`
  height: 100%;
  display: flex;
  background-color: #fff;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 15px;
    height: 100vh;
    background: linear-gradient(270deg, #737a82 -96.67%, rgba(115, 122, 130, 0) 50%);
    opacity: 0.1;
    right: 0;
    top: 0;
  }
  &:hover {
    ${StyledHeader} {
      .collapsable-icon {
        opacity: 1;
        visibility: visible;
        transform: translateY(6px) scale(1);
        svg {
          path,
          rect {
            stroke: #4e40ef;
          }
        }
      }
    }
  }
`;

const StyledInitials = styled.div`
  width: 40px;

  [data-letters]:after {
    content: attr(data-letters);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 14.4px;
    text-transform: uppercase;
    color: white;
    background-color: #fff;
  }
`;

const LinkIcon = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  transition: all 0.18s ease-out;

  :hover,
  :active {
    background-color: #f5f6f7;

    path,
    rect {
      fill: #4e40ef;
    }
    circle {
      stroke: #4e40ef;
    }
    .insights {
      path {
        stroke: #4e40ef;
      }
    }
    .getting-started {
      path {
        fill: none;
        stroke: #4e40ef;
      }
      circle {
        stroke: #fff;
      }
    }
  }

  &.${({ activeClassName }) => activeClassName} {
    background-color: #4e40ef;
    path,
    rect {
      fill: #fff;
    }
    circle {
      stroke: #fff;
    }
    .insights {
      path {
        stroke: #fff;
      }
    }
    .getting-started {
      path {
        fill: none;
        stroke: #fff;
      }
      circle {
        stroke: #4e40ef;
        fill: #fff;
      }
    }
    &:hover,
    &:active {
      path,
      rect {
        fill: #fff;
      }
      circle {
        stroke: #fff;
      }
      .insights {
        path {
          stroke: #fff;
        }
      }
      .getting-started {
        path {
          fill: none;
          stroke: #fff;
        }
        circle {
          stroke: #4e40ef;
          fill: #fff;
        }
      }
    }
  }

  ${({ size }) => css`
    width: ${size}px;
    height: ${size}px;
  `};
`;

LinkIcon.propTypes = {
  size: PropTypes.number.isRequired,
  activeClassName: PropTypes.string.isRequired,
};

const NavSubLink = styled(NavLink)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1.5px 0;
  padding: 6px 16px;
  border-radius: 6px;
  height: 40px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  color: #545a61;
  background-color: transparent;
  transition: all 0.2s ease-out;

  &.${({ activeClassName }) => activeClassName} {
    color: #4e40ef;
    background-color: rgba(78, 64, 239, 0.1);
    margin: 1.5px 0;
    &:hover {
      color: #4e40ef;
      background-color: rgba(78, 64, 239, 0.1);
    }
  }

  &:hover {
    color: #545a61;
    background-color: rgba(230, 233, 236, 0.6);

    & .external-icon {
      & svg {
        color: #545a61;
        stroke: #545a61;
      }
    }
  }

  & .external-icon {
    & svg {
      margin-left: auto;
      color: #787f88;
      font-size: 12px;
      stroke: #787f88;
      stroke-width: 2px;
      margin-top: 1px;
    }
  }
`;
NavSubLink.propTypes = {
  activeClassName: PropTypes.string,
};

NavSubLink.defaultProps = {
  activeClassName: 'active',
};

export {
  StyledAside,
  StyledInitials,
  LinkLists,
  LinkIcon,
  List,
  NavSubLink,
  StyledHeader,
  StyledIconButton,
  AsideTooltip,
  StyledSwitchUser,
};
