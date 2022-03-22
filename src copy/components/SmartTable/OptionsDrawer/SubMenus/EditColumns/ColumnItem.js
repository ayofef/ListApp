import React from 'react';
import PropTypes from 'prop-types';
import { Box, capitalize } from '@material-ui/core';
import { Visibility, DragHandleIcon } from '../../../../../assets/icons';
import { getItemStyle } from '../../../constants';
import { P14 } from '../../../../atoms';
import THEME from '../../../../../constants/theme';

import { StyledListItem } from './styled';

const VERTICAL = true;

const ColumnItem = ({ checked, provided, snapshot, listItem, onChangeHandler }) => {
  return (
    <StyledListItem
      checked={checked}
      justifyContent="space-between"
      margin="0 0 2px 0"
      height="32px"
      {...provided?.draggableProps}
      ref={provided?.innerRef}
      style={{
        ...getItemStyle(snapshot, provided?.draggableProps.style, VERTICAL),
      }}
    >
      <Box {...provided?.dragHandleProps} className="dragHandler" position="absolute" top="6px" left="-14px">
        <DragHandleIcon />
      </Box>
      <P14 margin="0 4px 0 0">{capitalize(listItem?.Header)}</P14>
      <Box className="visibilityIcon" component="label" position="relative" mt="4px" ml="auto">
        <Visibility fill={checked ? THEME.primaryColors.primary : '#C1C5CB'} />
        <Box
          position="absolute"
          top="0"
          left="0"
          opacity="0"
          visibility="hidden"
          component="input"
          value={listItem?.Header}
          type="checkbox"
          checked={checked}
          onChange={onChangeHandler}
        />
      </Box>
    </StyledListItem>
  );
};

ColumnItem.propTypes = {
  listItem: PropTypes.shape({
    Header: PropTypes.string,
  }).isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  provided: PropTypes.shape({
    draggableProps: PropTypes.shape({
      style: PropTypes.shape({}),
    }),
    dragHandleProps: PropTypes.shape({}),
    innerRef: PropTypes.func,
  }).isRequired,
  checked: PropTypes.bool.isRequired,
  snapshot: PropTypes.shape({
    isDragging: PropTypes.bool,
  }).isRequired,
};

export default ColumnItem;
