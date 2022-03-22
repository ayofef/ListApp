import styled from 'styled-components';
import THEME from '../../../constants/theme';
import { BORDER_COLOR } from '../../FlowDetailsPage/constant';

const StyledIntroSection = styled.div`
  background: ${THEME.primaryColors.white};
  border: 1px solid ${BORDER_COLOR};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 36px;
`;

const Block = styled.div`
  display: flex;
  align-items: ${({ alignItems }) => (alignItems ? `${alignItems}` : 'center')};
  padding: 24px 14px 24px 24px;
  border-bottom: 0.5px solid ${THEME.greyColors.grey5};
  &:last-child {
    border-bottom: none;
  }
`;

const ImageContainer = styled.div`
  width: 48px;
  height: 48px;
  margin-right: 19px;
  position: relative;
  box-sizing: content-box;
  padding-bottom: 8px;

  .onboarding-specialist-img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`;

const StarIcon = styled.div`
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 24px;
  height: 24px;
  background-color: ${THEME.primaryColors.orange};
  border: 2px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const ContactContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: auto;

  .contact-option {
    display: flex;
    align-items: center;

    &:first-child {
      margin-right: 15px;
    }
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const RemainingDays = styled.div`
  position: relative;
  min-width: 48px;
  height: 48px;
  margin-right: 19px;
  border: 1px solid transparent;

  > div {
    &:first-child {
      svg {
        transform: rotate(90deg);
      }
    }
  }

  .text {
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .days {
      font-size: 8px;
      font-weight: 500;
      color: ${THEME.greyColors.grey1};
      position: relative;
      top: -3px;
    }
  }
`;

export { StyledIntroSection, Block, ImageContainer, StarIcon, ContactContainer, RemainingDays };
