import styled from 'styled-components';
import PropTypes from 'prop-types';

const STATUS_COLORS = {
  authorised: 'cornflowerblue',
  settled: '#1CCE6A',
  failed: '#DF5B5B',
  declined: '#DF5B5B',
  refunded: '#4E40EF',
  disputed: 'orange',
  cancelled: '#C4CBD2',
  high: '#CE1C1C',
  medium: 'orange',
  low: '#875CFF',
  succeeded: '#1CCE6A',
  active: '#1CCE6A',
  complete: '#1CCE6A',
  running: '#1CCE6A',
  error: '#DF5B5B',
  open: '#1F25F4',
  resolved: '#14B95C',
  completed: '#14B95C',
};

const IndicatorBase = styled('span')`
  position: relative;
  text-wrap: none;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    background-color: ${({ variant }) => STATUS_COLORS[variant] || STATUS_COLORS.cancelled};
    transform: translate(0, -50%);
  }
`;

IndicatorBase.propTypes = {
  variant: PropTypes.string,
};

IndicatorBase.defaultProps = {
  variant: 'default',
};

export { IndicatorBase, STATUS_COLORS };
