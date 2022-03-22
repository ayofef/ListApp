import React from 'react';
import { string, bool } from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { L14B } from '../../atoms/Typography/L14B';
import THEME from '../../../constants/theme';
import { L10BU } from '../../atoms/Typography/L10BU';

const NameWithDraftCell = ({ data, isInstruct }) => {
  const { t } = useTranslation();
  return (
    <Box display="flex" alignItems="center">
      <L14B maxWidth="250px" overflow="hidden" textOverflow="ellipsis" noWrap>
        {data}
      </L14B>
      {isInstruct && (
        <Box bgcolor={THEME.primaryColors.primaryLight} borderRadius="4px" ml="8px" p="6px 8px">
          <L10BU margin="0px" color={THEME.primaryColors.primary}>
            {t('INSTRUCT')}
          </L10BU>
        </Box>
      )}
    </Box>
  );
};

NameWithDraftCell.propTypes = {
  data: string.isRequired,
  isInstruct: bool.isRequired,
};

export default NameWithDraftCell;
