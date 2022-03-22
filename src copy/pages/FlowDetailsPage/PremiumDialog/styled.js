import styled, { css } from 'styled-components';
import withStyles from '@material-ui/core/styles/withStyles';
import { PLAN_DICTIONARY } from './constant';
import THEME from '../../../constants/theme';
import { ButtonRounded } from '../../../components/atoms';
import { StyledDialog } from '../../../components/SurveyDialog/styled';
import { animateScale } from '../../GettingStarted/PaymentFlowTutorial/styled';

const ICON_BG_MAP = {
  [PLAN_DICTIONARY.starter]: THEME.greyColors.grey5,
  [PLAN_DICTIONARY.advanced]: THEME.primaryColors.primary,
};

const TAG_COLOR_MAP = {
  [PLAN_DICTIONARY.starter]: THEME.greyColors.grey11,
  [PLAN_DICTIONARY.advanced]: THEME.primaryColors.primary,
};

const TAG_BG_MAP = {
  [PLAN_DICTIONARY.starter]: THEME.greyColors.grey12,
  [PLAN_DICTIONARY.advanced]: THEME.primaryColors.primaryLight,
};

const StyledDialogWrapper = styled(StyledDialog)`
  & .MuiDialog-paper {
    ${animateScale};
  }
`;

const StyledPlanCardWrapper = styled.div`
  width: 424px;
  height: 496px;
  background: #ffffff;
  border: 1.5px solid rgba(193, 195, 198, 0.2);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  overflow: hidden;
  padding: 32px;
  transition: all 0.3s ease-out;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  &:not(:last-child) {
    margin-right: 16px;
  }

  &:hover {
    ${({ disabled }) =>
      !disabled &&
      css`
        border: 1.5px solid #4e40ef;
      `}
  }
`;

const PlanIconTagWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PlanIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ plan }) => `${ICON_BG_MAP[plan]}` || 'red'};
`;

const PlanTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${({ plan }) => `${TAG_BG_MAP[plan]}` || 'green'};

  span {
    font-weight: 600;
    font-size: 12px;
    line-height: 12px;
    color: ${({ plan }) => `${TAG_COLOR_MAP[plan]}` || 'red'};
  }
`;

const CustomButtonRounded = withStyles({
  root: {
    width: '100%',
  },
})(ButtonRounded);

export { StyledPlanCardWrapper, PlanIconTagWrapper, PlanIcon, PlanTag, CustomButtonRounded, StyledDialogWrapper };
