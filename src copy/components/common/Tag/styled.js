import styled from 'styled-components';
import THEME from '../../../constants/theme';

const GREEN = ['#E7F8EF', '#14B95C'];
const BLUE = ['#F4F4FE', '#1F25F4'];
const GREY = [THEME.greyColors.grey12, THEME.greyColors.grey1];
const RED = ['#F8ECEC', '#B74242'];
const ORANGE = ['#FEF0ED', '#F36B47'];

const STATUS_COLORS = {
  authorised: BLUE,
  active: BLUE,
  refunded: BLUE,
  low: BLUE,

  settled: GREEN,
  succeeded: GREEN,
  complete: GREEN,
  running: GREEN,

  inactive: GREY,
  cancelled: GREY,
  undefined: GREY,

  failed: RED,
  declined: RED,
  high: RED,
  error: RED,

  disputed: ORANGE,
  medium: ORANGE,
};

const Tag = styled.div`
  height: 24px;
  font-size: 12px;
  font-weight: 600;
  padding: 0 8px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  background: ${({ variant }) => STATUS_COLORS[variant]?.[0] || STATUS_COLORS.cancelled[0]};
  color: ${({ variant }) => STATUS_COLORS[variant]?.[1] || STATUS_COLORS.cancelled[1]};
  text-transform: capitalize;
  ${({ margin }) =>
    margin &&
    `
    margin: ${margin};
  `}
`;

export { Tag };
