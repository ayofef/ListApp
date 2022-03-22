import styled from 'styled-components';
import THEME from '../../constants/theme';

const ProfileInnerWrapper = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 628px;
`;

const StyledSection = styled.div`
  width: 100%;
  margin-bottom: 56px;
  display: flex;
`;

const TitleContainer = styled.div`
  margin-right: 16px;
  min-width: 100px;
  max-width: 248px;
  flex: 1;
`;

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 512px;
`;

const MainContainerWithBorder = styled(MainContainer)`
  border: 1px solid ${THEME.greyColors.grey5};
  border-radius: 8px;
`;

const HeaderWrapper = styled.div`
  margin: ${({ margin }) => margin || '0 0 60px 0'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${({ padding }) => padding || '0'};
  & > span {
    display: flex;
    align-items: center;
  }
  & .modal-body__close {
    margin-left: 20px;
    cursor: pointer;
    border: 1px solid ${THEME.greyColors.grey4};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

export { ProfileInnerWrapper, TitleContainer, MainContainer, MainContainerWithBorder, StyledSection, HeaderWrapper };
