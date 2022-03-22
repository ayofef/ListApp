import React from 'react';
import Box from '@material-ui/core/Box';
import { func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Grid from '@material-ui/core/Grid';
import { P18, ButtonRounded } from '../../../../components/atoms';
import RecommendedItem from './RecommendedItem';
import { StyledArrowIcon } from './styled';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import { useGetAutomationTemplates } from '../../hooks/useGetAutomationTemplates';

const RecommendedAutomations = ({ toggleBrowseTemplates }) => {
  const { t } = useTranslation();
  const { recommendedTemplates, loading } = useGetAutomationTemplates();

  return (
    <Box mb="56px">
      <Box mb="12px" display="flex" justifyContent="space-between" alignItems="center">
        <P18 fontWeight="600">{t('Recommended')}</P18>
        {!loading && (
          <ButtonRounded type="button" variant="text" color="primary" onClick={toggleBrowseTemplates}>
            {t(`Browse all automations`)}
            <StyledArrowIcon>
              <ArrowForwardIosIcon fontSize="inherit" color="inherit" />
            </StyledArrowIcon>
          </ButtonRounded>
        )}
      </Box>
      <Grid container spacing={2}>
        {loading && <LoadingState />}

        {!loading && isEmpty(recommendedTemplates) && <EmptyState />}

        {!loading &&
          !isEmpty(recommendedTemplates) &&
          recommendedTemplates?.map((template) => (
            <Grid key={template?.id} item xs={6} md={6} lg={4}>
              <RecommendedItem template={template} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

RecommendedAutomations.propTypes = {
  toggleBrowseTemplates: func.isRequired,
};

export default RecommendedAutomations;
