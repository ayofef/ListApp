import React, { useMemo } from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import Box from '@material-ui/core/Box';
import { StyledButtonCard, StyledCardHeaderBox, StyledDescription, TemplateTitle } from './styled';
import THEME from '../../../../../constants/theme';
import { AUTOMATION_PLAN_LABEL_MAP, AUTOMATION_PLAN_DICTIONARY } from '../../../PremiumDialog/constant';
import AutomationItem from './AutomationItem';
import { getDescription } from './constant';
import { getAutomationTemplateIcon } from '../../../../../constants/getAutomationTemplateIcon';
import { L10BU } from '../../../../../components/atoms/Typography/L10BU';
import { ButtonRounded } from '../../../../../components/atoms';
import CircleWithIcon from '../../../../../components/atoms/CircleWithIcon/CircleWithIcon';

const RecommendedItem = ({ template, setOverviewData }) => {
  /**
   * showPremium scenario
   * 1 - plan is advanced plan
   */

  const showPlanTag = template?.plan?.toLowerCase() === AUTOMATION_PLAN_DICTIONARY.PREMIUM?.toLowerCase();
  const planTag = AUTOMATION_PLAN_LABEL_MAP[template?.plan] || '';

  const icons = useMemo(() => getAutomationTemplateIcon(template?.categories) || [], [template?.categories]);

  return (
    <StyledButtonCard>
      <StyledCardHeaderBox>
        <Box display="flex">
          {icons?.map(
            ({ Icon, color, key }, index) =>
              Icon && (
                <CircleWithIcon key={key} array={icons} index={index}>
                  <Icon size={20} color={color} />
                </CircleWithIcon>
              )
          )}
        </Box>
        {showPlanTag && (
          <AutomationItem
            category={planTag}
            color={THEME.primaryColors.primary}
            bgColor={THEME.primaryColors.primaryLight}
          />
        )}
      </StyledCardHeaderBox>
      <Box display="flex" flex={1} flexDirection="column" justifyContent="space-between" mt="14px">
        <Box>
          <L10BU>{template?.categories?.join(', ')}</L10BU>
          <TemplateTitle margin="0 0 4px 0">{template?.name}</TemplateTitle>
          <StyledDescription>{getDescription(template?.description)}</StyledDescription>
        </Box>
        <Box>
          <ButtonRounded
            variant="contained"
            color="secondary"
            onClick={() => setOverviewData({ template, showPlanTag, planTag })}
          >
            Configure
          </ButtonRounded>
        </Box>
      </Box>
    </StyledButtonCard>
  );
};

RecommendedItem.propTypes = {
  template: shape({
    categories: arrayOf(string),
    color: string,
    icon: string,
    description: string,
    name: string,
    plan: string,
  }).isRequired,
  setOverviewData: func.isRequired,
};

export default RecommendedItem;
