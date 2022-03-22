import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import THEME from '../../../../constants/theme';
import { P14, P16B, P12 } from '../../../../components/atoms';
import ChecklistActions from '../../Components/ChecklistActions';

const TITLE = 'Before you publish';
const DESC = 'Here are some essentials and tips before you publish.';

const Checklist = ({ toggleIsOpen, checklist }) => {
  const { t } = useTranslation();

  return (
    <>
      <Box>
        <P12 color={THEME.greyColors.grey1} fontWeight="600" margin="0 0 6px 0">
          {t('Checklist')}
        </P12>
        <P16B margin="0 0 6px 0">{t(TITLE)}</P16B>
        <P14 width="488px" color={THEME.greyColors.grey1}>
          {t(DESC)}
        </P14>
      </Box>
      <Box mt="52px" mb="4px" minHeight="140px">
        <ChecklistActions checklist={checklist} callback={toggleIsOpen} />
      </Box>
    </>
  );
};

Checklist.propTypes = {
  toggleIsOpen: PropTypes.func.isRequired,
  checklist: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      completed: PropTypes.bool,
      required: PropTypes.bool,
      route: PropTypes.string,
    })
  ).isRequired,
};

export default Checklist;
