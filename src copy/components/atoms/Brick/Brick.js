import styled from 'styled-components';
import { bool } from 'prop-types';
import THEME from '../../../constants/theme';

const Brick = styled.div`
  display: block;
  width: 32px;
  height: 3px;
  margin-right: 8px;
  background: ${({ active }) => (active ? THEME.primaryColors.black : THEME.greyColors.grey3)};
  border-radius: 8px;
`;

Brick.propTypes = {
  active: bool.isRequired,
};

export default Brick;
