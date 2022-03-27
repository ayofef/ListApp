import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const StyledFormWrapper = styled.div`
  width: 400px;
  border: 1px solid ${THEME.greyColors.grey2};
  border-radius: 8px;

  margin: 0 auto;
  padding: 40px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
