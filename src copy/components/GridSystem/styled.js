import styled from 'styled-components';
import THEME from '../../constants/theme';

const MainContent = styled.div`
  display: flex;
`;

const SideLeft = styled.div`
  max-width: 640px;
  margin-top: 24px;
  padding-bottom: 60px;
  width: 100%;
  box-sizing: border-box;
`;

const SideRight = styled.div`
  max-width: 440px;
  margin-top: 24px;
  padding-left: 38px;
  margin-left: 40px;
  padding-bottom: 60px;
  width: 100%;
  box-sizing: border-box;
`;

const TopBoxesWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const TopBox = styled.div`
  position: relative;
  padding-right: 35px;
  margin-right: 35px;
  flex-shrink: 0;
  margin-bottom: 20px;
  > p {
    &:first-child {
      margin-bottom: 4px;
    }
  }
  &:after {
    position: absolute;
    height: 22px;
    width: 1px;
    top: 50%;
    right: 0;
    background: #e6e9ec;
    transform: translateY(-50%) rotate(15deg);
    content: '';
  }
  &:last-child {
    padding-right: 0;
    margin-right: 0;
    &:after {
      display: none;
    }
  }
`;

const StyledTable = styled.div`
  margin-top: 15px;
  margin-bottom: 40px;
  > div {
    border-bottom: 1px solid ${THEME.greyColors.grey5};
    border-radius: 0 !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 40px;
    &:last-child {
      border-bottom: none;
    }
  }
`;

const StyledCardTypeIcon = styled.span`
  display: flex;
  align-items: center;
  margin: ${({ $margin }) => $margin};

  svg {
    width: 24px;
    height: 16px;
  }
  img {
    width: 20px !important;
    height: auto !important;
  }

  span {
    display: flex;
    align-items: center;
  }
`;

const LinkedItemsWrapper = styled.div`
  display: block;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
`;

const LinkedItemsWrapperBorder = styled.div`
  display: block;
  border-radius: 8px;
  border: 1px solid ${THEME.greyColors.grey5};
  overflow: hidden;
  margin-top: 16px;

  > div {
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid ${THEME.greyColors.grey5};
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: 0.25s;
    &:hover {
      background: ${THEME.greyColors.grey6};
    }
    &:last-child {
      border-bottom-style: none;
    }

    > div {
      display: flex;
      align-items: center;
      > * {
        &:first-child {
          margin-right: 16px;
        }
      }
    }
  }
`;

export {
  MainContent,
  SideLeft,
  SideRight,
  TopBox,
  StyledTable,
  StyledCardTypeIcon,
  TopBoxesWrapper,
  LinkedItemsWrapper,
  LinkedItemsWrapperBorder,
};
