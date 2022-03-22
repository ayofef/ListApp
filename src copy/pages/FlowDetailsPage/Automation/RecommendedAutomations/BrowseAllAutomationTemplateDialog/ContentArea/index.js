import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';
import Grid from '@material-ui/core/Grid';
import { SIDEBAR_WIDTH, CATEGORY_KEY, RECOMMENDATION_KEY } from '../constant';
import { useGetAutomationTemplates } from '../../../../hooks/useGetAutomationTemplates';
import RecommendedItem from '../../RecommendedItem';
import { BORDER_COLOR } from '../../../../constant';
import LoadingState from '../../LoadingState';
import EmptyState from '../../EmptyState';
import BuildYourOwnCTA from './BuildYourOwnCTA';
import useSearch from '../../../../../../hooks/useSearch';
import { isDefined } from '../../../../../../utils/helpers';

const EMPTY_STATE_TITLE = 'Automations';
const EMPTY_STATE_DESC = 'There are currently no Automations.';

const ContentArea = () => {
  const { templates, loading, recommendedTemplates } = useGetAutomationTemplates();
  const [searchParams] = useSearch();

  const filteredTemplates = useMemo(() => {
    if (searchParams?.[CATEGORY_KEY] === RECOMMENDATION_KEY) {
      return recommendedTemplates;
    }
    return isDefined(searchParams?.[CATEGORY_KEY])
      ? templates.filter((template) => {
          const categories = template?.category?.map((cat) => cat?.toLowerCase());
          return categories.includes(searchParams?.[CATEGORY_KEY]);
        })
      : templates;
  }, [templates, searchParams, recommendedTemplates]);

  return (
    <Box
      ml={SIDEBAR_WIDTH}
      width="748px"
      height="100%"
      display="block"
      py="32px"
      borderLeft={`1px solid ${BORDER_COLOR}`}
      position="relative"
      boxSizing="border-box"
      pl="32px"
      minHeight="500px"
    >
      <BuildYourOwnCTA />
      <Grid container spacing={2}>
        {loading && <LoadingState modal />}

        {!loading && isEmpty(filteredTemplates) && <EmptyState title={EMPTY_STATE_TITLE} desc={EMPTY_STATE_DESC} />}

        {!loading &&
          !isEmpty(filteredTemplates) &&
          filteredTemplates?.map((template) => (
            <Grid key={template?.id} item xs={6}>
              <RecommendedItem template={template} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ContentArea;
