import { Box } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSwipeable } from 'react-swipeable';
import ArrowRight from '../../../assets/arrows/arrowRight';
import { ArrowRight as ChevronRight } from '../../../assets/icons';
import CategoryAlerts from '../../../assets/icons/CategoryAlerts';
import CategoryEngage from '../../../assets/icons/CategoryEngage';
import CategoryOperations from '../../../assets/icons/CategoryOperations';
import { ButtonRounded, P14, P14B } from '../../../components/atoms';
import { UI_ROUTES } from '../../../constants/routes';
import THEME from '../../../constants/theme';
import RecommendedOverviewDialog from '../../FlowDetailsPage/Automation/RecommendedAutomations/RecommendedOverviewDialog';
import { useGetAutomationTemplates } from '../../FlowDetailsPage/hooks/useGetAutomationTemplates';
import { AUTOMATION_PLAN_DICTIONARY, AUTOMATION_PLAN_LABEL_MAP } from '../../FlowDetailsPage/PremiumDialog/constant';
import {
  AutomationTemplatesWrap,
  AutomationTemplate,
  Icons,
  AutomationTemplatesLine,
  Categories,
  TemplateButtonSwipe,
  AutomationTemplatesWrapWindow,
  Buttons,
  StyledLink,
} from './styled';

// search those IDs and display them
const displayIDs = [
  'template.email-on-failed-transaction',
  'template.email-on-successful-transaction',
  'template.notify-on-disputed-transaction',
  'template.notify-on-failed-transaction',
  'template.daily-sales-report',
];

const AutomationTemplates = () => {
  const { t } = useTranslation();
  const { availableTemplates } = useGetAutomationTemplates();
  const [overviewData, setOverviewData] = useState(null);
  const [swiperPosition, setSwiperPosition] = useState(0);

  const filteredTemplates = useMemo(() => {
    const templatesToDisplay = displayIDs.map((templateId) =>
      availableTemplates.find((template) => template.template?.id === templateId)
    );

    return templatesToDisplay.filter(Boolean);
  }, [availableTemplates]);

  const handleSwipe = (amount) => {
    if (swiperPosition + amount > -1 && swiperPosition + amount < filteredTemplates.length) {
      setSwiperPosition(swiperPosition + amount);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1),
    onSwipedRight: () => handleSwipe(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleSetOverviewData = (template) => {
    const showPlanTag = template?.plan?.toLowerCase() === AUTOMATION_PLAN_DICTIONARY.PREMIUM?.toLowerCase();
    const planTag = AUTOMATION_PLAN_LABEL_MAP[template?.plan] || '';
    setOverviewData({ template, showPlanTag, planTag });
  };

  const printIcons = (categories, slug) => {
    return categories.map((category) => {
      return (
        <div key={`${slug}-icon-${category}`}>
          {category === 'ALERTS' && <CategoryAlerts />}
          {category === 'ENGAGE' && <CategoryEngage />}
          {category === 'OPERATIONS' && <CategoryOperations />}
        </div>
      );
    });
  };

  return (
    <>
      <AutomationTemplatesLine>
        <AutomationTemplatesWrapWindow>
          <div {...swipeHandlers}>
            <AutomationTemplatesWrap position={swiperPosition}>
              {filteredTemplates.map((template) => (
                <AutomationTemplate key={template.slug}>
                  <Box margin="0 0 16px">
                    <Icons>{printIcons(template.categories, template.slug)}</Icons>
                    <Categories>{template.categories.join(', ')}</Categories>
                    <h3>{template.name}</h3>
                    <P14 color={THEME.greyColors.grey18}>{template.description}</P14>
                  </Box>
                  <ButtonRounded variant="contained" color="secondary" onClick={() => handleSetOverviewData(template)}>
                    {t('Configure')}
                  </ButtonRounded>
                </AutomationTemplate>
              ))}
            </AutomationTemplatesWrap>
          </div>
        </AutomationTemplatesWrapWindow>

        <Box display="flex" justifyContent="space-between" alignItems="center" margin="0 24px 24px 76px">
          <Buttons>
            <TemplateButtonSwipe onClick={() => handleSwipe(-1)} disabled={swiperPosition === 0}>
              <ChevronRight color={THEME.greyColors.grey17} />
            </TemplateButtonSwipe>
            <TemplateButtonSwipe
              onClick={() => handleSwipe(1)}
              disabled={swiperPosition >= filteredTemplates.length - 1}
            >
              <ChevronRight color={THEME.greyColors.grey17} />
            </TemplateButtonSwipe>
          </Buttons>
          <StyledLink to={UI_ROUTES.automationsDirectory}>
            <P14B color={THEME.primaryColors.blue} margin="0 0 0 24px">
              {t('View all recipes')}
              <ArrowRight />
            </P14B>
          </StyledLink>
        </Box>
      </AutomationTemplatesLine>
      {overviewData ? (
        <RecommendedOverviewDialog isOpen closeDialog={() => setOverviewData(null)} overviewData={overviewData} />
      ) : null}
    </>
  );
};

export default AutomationTemplates;
