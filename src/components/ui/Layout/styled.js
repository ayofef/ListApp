import styled from 'styled-components';
import THEME from '../../../constants/theme';

const StyledMain = styled.main`
  max-width: 800px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
`;

const StyledWrapper = styled.div`
  width: 100%;

  padding: 40px 16px;
  min-height: calc(100vh - 150px);

  @media screen and (max-width: 700px) {
    padding: 20px 16px;
    min-height: calc(100vh - 158px);
  }
`;

const StyledFooter = styled.footer`
  width: 100%;
  background-color: ${THEME.primaryColors.primaryLight};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80px;
`;

export { StyledWrapper, StyledFooter, StyledMain };
