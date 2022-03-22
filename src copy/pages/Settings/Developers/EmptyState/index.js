import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import TakeAction from '../../../../assets/img/TakeAction.svg';
import { ButtonRounded } from '../../../../components/atoms';
import IconBoxScreen from '../../../../components/common/IconBoxScreen';

const MESSAGE = `You currently have no API keys`;

const EmptyState = ({ handleGenerate }) => {
  const { t } = useTranslation();

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <IconBoxScreen
        icon={<img src={TakeAction} alt="take action" />}
        iconMargin="0"
        description={t(MESSAGE)}
        padding="40px 200px"
        button={
          <ButtonRounded onClick={handleGenerate} variant="contained" color="primary" replace="true">
            {t('Generate key')}
          </ButtonRounded>
        }
      />
    </Box>
  );
};

EmptyState.propTypes = {
  handleGenerate: PropTypes.func.isRequired,
};

export default EmptyState;
