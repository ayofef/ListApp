import styled from 'styled-components';
import THEME from '../../../../../../constants/theme';
import { P14 } from '../../../../../atoms';

const StyledRecipeWrapper = styled.div`
  padding: 20px;
  border: 1px solid ${THEME.greyColors.grey16};
  border-radius: 8px;
`;

const StyledDescription = styled(P14)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export { StyledRecipeWrapper, StyledDescription };
