import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import capitalize from '@material-ui/core/utils/capitalize';
import { StyledWrapper, StyledActions } from './styled';
import { H3, ButtonRounded } from '../../../components/atoms';
import { useNotificationManager } from '../../../hooks/useNotificationManager';
import useCreateFlow from '../../../hooks/useCreateFlow';

const TITLE = 'Flows';

const FlowsHeader = ({ currentPage }) => {
  const { t } = useTranslation();
  const { handleCreateFlow, error } = useCreateFlow();

  useNotificationManager('error', t(error?.message), TITLE);

  return (
    <StyledWrapper>
      <H3 fontWeight="600">{t(capitalize(currentPage))}</H3>

      <StyledActions>
        <ButtonRounded type="button" variant="contained" color="primary" onClick={handleCreateFlow}>
          {t('New Flow')}
        </ButtonRounded>
      </StyledActions>
    </StyledWrapper>
  );
};

FlowsHeader.propTypes = {
  currentPage: PropTypes.string,
};
FlowsHeader.defaultProps = {
  currentPage: 'All',
};

export default FlowsHeader;
