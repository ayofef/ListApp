import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const GUTTER = '24px';
const BORDER_COLOR = '#e6e9ec';

const Col = styled('div')`
  padding: 0 ${GUTTER};
  border-left: 1px solid ${BORDER_COLOR};

  &:first-child {
    border-left: none;
  }
`;

const Row = styled('div')`
  display: flex;
  align-items: center;
  margin: 0 -${GUTTER};

  ${({ divider }) =>
    !divider &&
    css`
      ${Col} {
        border: none;
        padding-right: 0;
      }
    `}
`;

const Block = styled('div')`
  display: block;
  margin: 0 -${GUTTER};
  max-width: 640px;

  ${({ divider }) =>
    !divider &&
    css`
      ${Col} {
        border: none;
        padding-right: 0;
      }
    `}
`;

Row.propTypes = {
  divider: PropTypes.bool,
};

Row.defaultProps = {
  divider: true,
};

const StyledDivider = styled(Divider)`
  &.MuiDivider-root {
    margin: 16px 0;
    background-color: ${BORDER_COLOR};
  }
`;

const StyledButton = styled(Button)`
  &.MuiButton-root {
    text-transform: capitalize;
    color: #787f88;
    border-radius: 6px;
  }
`;

export { Col, Row, Block, StyledDivider, StyledButton };
