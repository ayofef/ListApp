import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useRouteMatch, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  IconWrapper,
  StyledChevronRight,
  StyledIconText,
  StyledSection,
  StyledSpan,
  StyledTypography,
} from '../styled';
import { ELEMENTS_SECTIONS, ELEMENTS_SECTIONS_COLUMNS_COUNT } from '../constants';

const ElementsSections = () => {
  const { path } = useRouteMatch();
  const { t } = useTranslation();
  const lastRowItemsCount =
    ELEMENTS_SECTIONS.length % ELEMENTS_SECTIONS_COLUMNS_COUNT === 0
      ? ELEMENTS_SECTIONS_COLUMNS_COUNT
      : ELEMENTS_SECTIONS.length % ELEMENTS_SECTIONS_COLUMNS_COUNT;
  const isBottomBorderHidden = (index) => ELEMENTS_SECTIONS.length - index <= lastRowItemsCount;

  return (
    <Box>
      <Grid container justify="flex-start" alignItems="stretch">
        {ELEMENTS_SECTIONS.map(({ title, Icon, description, action, isActive, subRoute }, index) => (
          <StyledSection
            {...(isActive && { component: Link, to: `${path}${subRoute}` })}
            key={title}
            item
            xs={12}
            lg={4}
            sm={6}
            md={4}
            isTopBorderHidden={isBottomBorderHidden(index)}
          >
            <Box p="56px 56px 46px 48px">
              <IconWrapper active={isActive}>
                <Icon stroke={isActive ? '#4E40EF' : '#787F88'} />
              </IconWrapper>
              <StyledTypography fontWeight="600" margin="16px 0 8px">
                {t(title)}
              </StyledTypography>
              <StyledTypography color="#787F88" margin="0 0 32px 0">
                {t(description)}
              </StyledTypography>
              {isActive ? (
                <StyledIconText>
                  {t(action)} <StyledChevronRight margin="1px 0 0 15px" />
                </StyledIconText>
              ) : (
                <StyledSpan>{t(action)}</StyledSpan>
              )}
            </Box>
          </StyledSection>
        ))}
      </Grid>
    </Box>
  );
};

export default ElementsSections;
