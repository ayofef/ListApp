import styled from 'styled-components';
import { GRADIENT_BG_CSS } from '../../Overview/BrowseAutomationTemplatesCta/styled';

const StyledFeaturedWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1266px) {
    flex-direction: column;
  }
`;

const StyledFeaturedItemWrapper = styled.a`
  width: 100%;
  display: flex;
  height: 240px;
  border-radius: 8px;
  position: relative;

  justify-content: space-between;
  align-items: center;
  padding: 32px;
  margin-top: 16px;
  ${GRADIENT_BG_CSS};

  &:not(:last-child) {
    margin-right: 16px;

    @media screen and (max-width: 1266px) {
      margin-right: 0;
    }
  }
`;

const StyledFeaturedItemLeft = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: ${({ $maxWidth }) => $maxWidth || '264px'};
  height: 100%;
  margin-right: 32px;
  flex: 1;
  z-index: 1;

  @media screen and (min-width: 1600px) {
    max-width: 700px;
  }
`;

const StyledFeaturedItemRight = styled.div`
  width: 187px;
  height: 187px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  img {
    height: 100%;
  }
`;

export { StyledFeaturedItemLeft, StyledFeaturedItemRight, StyledFeaturedItemWrapper, StyledFeaturedWrapper };
