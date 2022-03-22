import React, { useCallback, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';
import capitalize from 'lodash/capitalize';
import { P16, P14, Tag, L12M } from '../../../../components/atoms';
import { StyledRow } from '../styled';
import THEME from '../../../../constants/theme';
import ManageAutomation from './ManageAutomation';
import { ACTIVE_STATUSES } from './constant';
import { AUTOMATION_TYPES } from '../../../../components/FlowEditor/constants';
import { createTags } from '../../constant';
import DotTag from '../../../../components/atoms/Tag/DotTag';

const COMMON_PROPS = {
  color: THEME.greyColors.grey1,
  fontWeight: 500,
};

const TAG_TYPE = 'flows';

const checkError = (config) => config?.steps?.some((step) => step?.validationErrors?.length > 0);

const AutomationBar = ({ automation }) => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const tags = createTags(automation, TAG_TYPE);
  const hasDraft = ACTIVE_STATUSES.includes(automation?.status) && !isEmpty(automation?.draftConfig);
  const hasDraftErrors = Boolean(checkError(automation?.draftConfig));
  const hasErrors = Boolean(checkError(automation?.config));
  const category = useMemo(
    () =>
      automation?.category
        ?.split('_')
        .join(' ')
        .toLowerCase(),
    [automation]
  );

  const handleEdit = useCallback(
    (e) => {
      e.stopPropagation();
      push({
        pathname: `/automations/${automation?.id}/editor`,
        state: { prevRoute: 'flow' },
      });
    },
    [push, automation?.id]
  );

  if (isEmpty(automation)) {
    return null;
  }

  return (
    <StyledRow type="button" className="connection-button" onClick={handleEdit}>
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        <Box ml="14px">
          <P16 fontWeight="600">{automation?.name}</P16>
          <Box display="flex">
            <L12M margin="0 8px 0 0" color={THEME.greyColors.grey9}>
              {automation?.type === AUTOMATION_TYPES.FREEFORM_SUBSTAGE_AUTOMATION || capitalize(category)}
            </L12M>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box display="flex" alignItems="center">
          {/*Status */}
          {tags?.map((tag) => (
            <Box key={tag?.id} display="inline-flex" alignItems="center">
              {tag.Icon && <tag.Icon />}
              <DotTag color={tag?.color} margin="0 0 0 4px">
                {t(tag?.title)}
              </DotTag>
            </Box>
          ))}
          {/*has draftConfig */}
          {hasDraft && <P14 {...COMMON_PROPS}>&nbsp;{t('with unpublished changes')}</P14>}
        </Box>
        {/*hasErrors or hasDraftErrors */}
        {(hasErrors || hasDraftErrors) && (
          <Tag
            color={THEME.secondaryColors.nodeError}
            borderColor="#fff"
            marginTop="0"
            backgroundColor="rgba(183, 66, 66, 0.1)"
            fontSize="14px"
          >
            {t('has errors')}
          </Tag>
        )}
      </Box>
      {/*Menu */}
      <Box>
        <ManageAutomation
          automationId={automation?.id}
          handleEdit={handleEdit}
          automationStatus={automation?.status}
          hasDraft={hasDraft}
          hasDraftErrors={hasDraftErrors}
          automationName={automation?.name}
        />
      </Box>
    </StyledRow>
  );
};

AutomationBar.propTypes = {
  automation: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    status: PropTypes.string,
    connectionIds: PropTypes.arrayOf(PropTypes.string),
    draftConfig: PropTypes.shape({}),
    config: PropTypes.shape({}),
    minimumPlanRequired: PropTypes.oneOf(['business_individual', 'business_team', 'enterprise']),
    category: PropTypes.string,
  }).isRequired,
};

export default AutomationBar;
