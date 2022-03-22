import React, { useMemo, useCallback } from 'react';
import capitalize from '@material-ui/core/utils/capitalize';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIosRounded';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import flatten from 'lodash/flatten';
import { bool } from 'prop-types';
import { CATEGORY_KEY, RECOMMENDATION_KEY, parseCategoryLabel } from '../constant';
import { StyledList, ListItem, StyledButton, StyledAside } from './styled';
import { useGetAutomationTemplates } from '../../../../FlowDetailsPage/hooks/useGetAutomationTemplates';
import LoadingState from './LoadingState';
import useSearch from '../../../../../hooks/useSearch';
import TemplatesArrowRight from '../../../../../assets/icons/TemplatesArrowRight';
import TemplatesBell from '../../../../../assets/icons/TemplatesBell';
import TemplatesHeadphones from '../../../../../assets/icons/TemplatesHeadphones';
import TemplatesChat from '../../../../../assets/icons/TemplatesChat';
import TemplatesGrid from '../../../../../assets/icons/TemplatesGrid';
import TemplatesAutomation from '../../../../../assets/icons/TemplatesAutomation';
import THEME from '../../../../../constants/theme';
import TemplatesCapture from '../../../../../assets/icons/TemplatesCapture';
import TemplatesRetry from '../../../../../assets/icons/TemplatesRetry';
import TemplatesRedundancy from '../../../../../assets/icons/TemplatesRedundancy';
import TemplatesReporting from '../../../../../assets/icons/TemplatesReporting';
import TemplatesReconciliation from '../../../../../assets/icons/TemplatesReconciliation';
import TemplatesFraud from '../../../../../assets/icons/TemplatesFraud';

const ICONS_MAP = {
  ALERTS: TemplatesBell,
  RETRY: TemplatesRetry,
  REDUNDANCY: TemplatesRedundancy,
  CAPTURE: TemplatesCapture,
  SMART_ROUTING: TemplatesChat,
  CUSTOMER_SUPPORT: TemplatesHeadphones,
  ENGAGE: TemplatesChat,
  ENGAGEMENT: TemplatesChat,
  OPERATIONS: TemplatesGrid,
  REPORTING: TemplatesReporting,
  RECONCILIATION: TemplatesReconciliation,
  FRAUD: TemplatesFraud,
};

const SideBar = ({ inModal }) => {
  const { t } = useTranslation();

  const { templates, loading } = useGetAutomationTemplates();
  const [searchParams, setSearchParams] = useSearch();

  const categories = useMemo(() => {
    const tagArr = flatten(templates?.map((el) => el?.categories));
    return [...new Set(tagArr?.map((tag) => tag?.toLowerCase()))];
  }, [templates]);

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      const { category } = e.currentTarget.dataset;
      setSearchParams((prevState) => ({ ...prevState, [CATEGORY_KEY]: category }));
    },
    [setSearchParams]
  );

  return (
    <StyledAside $inModal={inModal}>
      <StyledList>
        {loading && <LoadingState />}
        {!loading && !isEmpty(templates) && (
          <>
            <ListItem>
              <StyledButton
                type="button"
                onClick={handleClick}
                data-category={RECOMMENDATION_KEY}
                isActive={searchParams?.[CATEGORY_KEY] === RECOMMENDATION_KEY}
              >
                <TemplatesArrowRight
                  {...(searchParams?.[CATEGORY_KEY] === RECOMMENDATION_KEY && { color: THEME.primaryColors.primary })}
                />
                {capitalize(t(RECOMMENDATION_KEY))} <ArrowForwardIosIcon color="inherit" />
              </StyledButton>
            </ListItem>

            {categories.map((el) => {
              const isActive = searchParams?.[CATEGORY_KEY] === el;
              const Icon = ICONS_MAP[el.toUpperCase()] || TemplatesAutomation;

              return (
                <ListItem key={el}>
                  <StyledButton type="button" onClick={handleClick} data-category={el} isActive={isActive}>
                    {Icon && <Icon {...(isActive && { color: THEME.primaryColors.primary })} />}
                    {t(parseCategoryLabel(el))} <ArrowForwardIosIcon color="inherit" />
                  </StyledButton>
                </ListItem>
              );
            })}
          </>
        )}
      </StyledList>
    </StyledAside>
  );
};
SideBar.propTypes = {
  inModal: bool,
};
SideBar.defaultProps = {
  inModal: false,
};

export default SideBar;
