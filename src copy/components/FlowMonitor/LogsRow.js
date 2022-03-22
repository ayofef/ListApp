import React, { useEffect, useRef } from 'react';
import { string } from 'prop-types';
import { useToggle } from 'react-use';
import Box from '@material-ui/core/Box';
import THEME from '../../constants/theme';
import { L14M } from '../atoms';
import { StyledLogsValue } from './styled';
import ArrowUp from '../../assets/icons/ArrowUp';

const TEXT_ROW_HEIGHT = 16;
const LogsRow = ({ name, value }) => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [isExpandable, toggleIsExpandable] = useToggle(false);
  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current.offsetHeight > TEXT_ROW_HEIGHT) {
      toggleIsExpandable(true);
    }
  }, [toggleIsExpandable]);
  const blockHeight = textRef.current?.offsetHeight;
  const blockProps = isExpandable
    ? { $isExpandable: isExpandable, $isOpen: isOpen, onClick: toggleIsOpen, $height: blockHeight }
    : {};
  return (
    <Box mb="12px" px="24px">
      <L14M color={THEME.primaryColors.white} margin="0 0 8px 0">
        {name}
      </L14M>

      <StyledLogsValue {...blockProps}>
        <L14M ref={textRef} color={`${THEME.primaryColors.white}50`}>
          {value}
        </L14M>
        {isExpandable && <ArrowUp />}
      </StyledLogsValue>
    </Box>
  );
};

LogsRow.propTypes = {
  name: string,
  value: string,
};

LogsRow.defaultProps = {
  name: null,
  value: null,
};

export default LogsRow;
