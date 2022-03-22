import PropTypes from 'prop-types';
import React, { useState, useCallback, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import moment from 'moment';

import capitalize from '@material-ui/core/utils/capitalize';
import { useTranslation } from 'react-i18next';
import { StyledButton } from './styled';

import { P16 } from '../../../../../components/atoms';
import { RANGE_TYPE_DICTIONARY, RANGE_TYPE_LABEL_MAP } from '../constant';
import Popover from '../../../../../components/atoms/OptionsMenu/Popover';
import { ChevronDownBlackMini } from '../../../../../assets/icons';

const formatDate = (date) => moment(date).format('MMM DD, YYYY');

/**
 * show startDate -> ["between", "after"]
 * show endDate -> ["between", "before"]
 */
const PARSE_DATE_LABEL_FN_BY_RANGE_TYPE_DICTIONARY = {
  [RANGE_TYPE_DICTIONARY.between]: ({ gt, lt }) => `${formatDate(gt)} - ${formatDate(lt)}`,
  [RANGE_TYPE_DICTIONARY.after]: ({ gt }) => `${formatDate(gt)}`,
  [RANGE_TYPE_DICTIONARY.before]: ({ lt }) => `${formatDate(lt)}`,
};

const RangeTypeSelect = ({ handleRangeType, dateRange, rangeType }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = useCallback(({ currentTarget }) => {
    return setAnchorEl(currentTarget);
  }, []);
  const handleClose = useCallback(() => setAnchorEl(null), []);
  const open = Boolean(anchorEl);

  const options = useMemo(
    () =>
      Object.keys(RANGE_TYPE_DICTIONARY).map((type) => ({
        label: RANGE_TYPE_LABEL_MAP[type],
        onClick: () => handleRangeType(RANGE_TYPE_DICTIONARY[type]),
      })),
    [handleRangeType]
  );

  return (
    <Box
      display="flex"
      height="88px"
      alignItems="center"
      justifyContent="center"
      borderBottom="1px solid rgba(193, 195, 198, 0.3)"
    >
      <Box mr="14px">
        <StyledButton onClick={handleOpen}>
          {capitalize(t(rangeType) ?? '')}
          <ChevronDownBlackMini />
        </StyledButton>

        <Popover open={open} anchorEl={anchorEl} handleClose={handleClose} width="100px" options={options} />
      </Box>

      <P16 color="#000">
        {PARSE_DATE_LABEL_FN_BY_RANGE_TYPE_DICTIONARY[rangeType ?? RANGE_TYPE_DICTIONARY.between](dateRange) ?? ''}
      </P16>
    </Box>
  );
};

RangeTypeSelect.propTypes = {
  dateRange: PropTypes.shape({
    lt: PropTypes.string.isRequired,
    gt: PropTypes.string.isRequired,
  }).isRequired,
  handleRangeType: PropTypes.func.isRequired,
  rangeType: PropTypes.string.isRequired,
};

export default RangeTypeSelect;
