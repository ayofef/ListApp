import styled from 'styled-components';
import THEME from '../../constants/theme';

export const PlansComparison = styled.div`
  margin-top: 35px;
`;

export const Table = styled.table`
  border: 1px solid ${THEME.greyColors.grey4};
  border-radius: 8px;
  margin-top: 24px;
  max-width: 1212px;
  margin-bottom: 80px;

  td {
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    padding: 12px 12px 15px;
    border-bottom: 1px solid ${THEME.greyColors.grey4};
    border-right: 1px solid ${THEME.greyColors.grey4};

    &:last-child {
      border-right-style: none;
    }

    &.left {
      text-align: left;
    }
  }

  tr {
    &:last-child {
      td {
        border-bottom-style: none;
      }
    }
  }
`;

export const PlanTile = styled.div`
  border: ${({ active }) =>
    active ? `1px solid ${THEME.secondaryColors.blue}` : `1px solid ${THEME.greyColors.grey4}`};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 22px 18px;
  @media (min-width: ${THEME.breakPoints.desktop}px) {
    padding: 30px 24px 32px 32px;
  }

  ul {
    padding-left: 18px;
  }
  li {
    margin-bottom: 14px;
  }
`;

export const RadioWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 30px;
  margin-top: 40px;
  @media (min-width: ${THEME.breakPoints.tabletLarge}px) {
    margin-left: 30px;
    margin-right: 0;
    margin-top: 0;
  }
`;

export const RadioCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 16px;
  box-sizing: border-box;
  border: 8px solid;
  border-color: ${({ active }) => (active ? `${THEME.primaryColors.main}` : `${THEME.greyColors.grey4}`)};
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
  text-align: right;

  p {
    margin-top: 10px;
    margin-left: 4px;
  }
`;

export const HeroControls = styled.div`
  max-width: 1212px;
  @media (min-width: ${THEME.breakPoints.tabletLarge}px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const LogoutButtonCover = styled.div`
  position: absolute;
  right: 72px;
  top: 50px;
  z-index: 2;
`;

export const StyledColumn = styled.div`
  width: 273px;
`;
