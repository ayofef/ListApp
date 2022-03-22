import React, { useCallback, useState } from 'react';
import { useToggle } from 'react-use';
import { func } from 'prop-types';
import { useMutation } from '@apollo/client';
import ButtonWithIcon from '../atoms/Buttons/ButtonWithIcon';
import { StopFill } from '../../assets/icons';
import THEME from '../../constants/theme';
import { GQL_M_DISABLE_FLOW } from '../../utils/queries/flows/mutations';
import { StyledPopover } from './styled';
import CaretUpDown from '../../assets/icons/CaretUpDown';

const RunningButton = ({ handleMutation }) => {
  const [disableAutomation] = useMutation(GQL_M_DISABLE_FLOW);

  const [anchorButton, setAnchorButton] = useState(null);
  const [isPopoverOpen, togglePopover] = useToggle(false);

  const handleOpen = useCallback(({ currentTarget }) => {
    return setAnchorButton(currentTarget);
  }, []);

  const handleStopFlow = () => {
    togglePopover();
    handleMutation(disableAutomation, 'disableFlow');
  };

  return (
    <>
      <ButtonWithIcon
        text="Running"
        onClick={(e) => {
          handleOpen(e);
          togglePopover();
        }}
        fontWeight={500}
        px="16px"
        endIcon={<CaretUpDown />}
        color={THEME.secondaryColors.greenDark}
        bgColor={THEME.primaryColors.white}
        $hoverColor={THEME.greyColors.grey12}
      />
      <StyledPopover
        open={isPopoverOpen}
        onClose={togglePopover}
        anchorEl={anchorButton}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: -8,
          horizontal: 0,
        }}
      >
        <ButtonWithIcon
          onClick={handleStopFlow}
          bgColor={THEME.primaryColors.white}
          text="Stop"
          width={124}
          boxSizing="border-box"
          startIcon={<StopFill />}
        />
      </StyledPopover>
    </>
  );
};

RunningButton.propTypes = {
  handleMutation: func.isRequired,
};

export default RunningButton;
