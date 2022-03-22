import styled from 'styled-components';
import THEME from '../../../../../../constants/theme';

const StyledContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 32px 0 32px;
  min-height: 220px;
  box-sizing: border-box;
  margin: 40px 0;

  @media (min-width: ${THEME.breakPoints.tabletLarge}px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export { StyledContentWrapper };
