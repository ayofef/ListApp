import React from 'react';
import { useTranslation } from 'react-i18next';
import { string, bool, func } from 'prop-types';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { P14, P14B } from '../../../components/atoms';
import THEME from '../../../constants/theme';
import { StyledStepLink, IconContainer, AutomationBox } from './styled';
import StatusBlue from '../../../assets/icons/GettingStarted/StatusBlue';
import StatusGreen from '../../../assets/icons/GettingStarted/StatusGreen';
import CircularLoader from '../../../components/atoms/CircularLoader/CircularLoader';
import AutomationTemplates from '../AutomationTemplates';

const Step = ({ url, title, desc, icon, completed, isStrokeSvg, isExternalUrl, loading, dataKey, onClickFunction }) => {
  const { t } = useTranslation();
  const Icon = icon;
  const color = THEME.primaryColors.orange;

  //External link uses html a tag and internal uses the Link component
  const linkProps = isExternalUrl
    ? {
        href: url,
        target: '_blank',
        rel: 'noreferrer noopener',
      }
    : {
        as: Link,
        to: url,
      };

  if (dataKey === 'basicAutomation') {
    return (
      <AutomationBox completed={completed}>
        <Box display="flex" alignItems="center" margin="24px 24px 32px" width="100%">
          <IconContainer completed={completed}>
            {icon && <Icon {...(isStrokeSvg ? { stroke: color } : { fill: color })} viewBox="-2 0 26 18" />}
          </IconContainer>

          <Box width="100%" marginRight="12px">
            <P14B className="title" margin="0 0 4px" lineHeight="16px">
              {t(title)}
            </P14B>
            <P14 color={THEME.greyColors.grey1}>{t(desc)}</P14>
          </Box>
          {!loading && completed && <StatusGreen />}
        </Box>
        {!loading && !completed && <AutomationTemplates />}
      </AutomationBox>
    );
  }

  return (
    <StyledStepLink className="step" $disabled={completed} onClick={onClickFunction} {...linkProps}>
      <IconContainer completed={completed}>
        {icon && <Icon {...(isStrokeSvg ? { stroke: color } : { fill: color })} viewBox="-2 0 26 18" />}
      </IconContainer>

      <Box mr="8px">
        <P14B className="title" margin="0 0 4px" lineHeight="16px">
          {t(title)}
        </P14B>
        <P14 color={THEME.greyColors.grey1}>{t(desc)}</P14>
      </Box>

      <Box marginLeft="auto" minWidth="40px" display="flex" justifyContent="flex-end" alignItems="center">
        {loading && <CircularLoader bgcolor={THEME.primaryColors.primary} size={16} />}
        {!loading && (completed ? <StatusGreen /> : <StatusBlue />)}
      </Box>
    </StyledStepLink>
  );
};

Step.propTypes = {
  dataKey: string.isRequired,
  url: string,
  title: string.isRequired,
  desc: string.isRequired,
  icon: func.isRequired,
  completed: bool.isRequired,
  loading: bool.isRequired,
  isStrokeSvg: bool,
  isExternalUrl: bool,
  onClickFunction: func,
};

Step.defaultProps = {
  isStrokeSvg: false,
  isExternalUrl: false,
  url: '/',
  onClickFunction: () => {},
};

export default Step;
