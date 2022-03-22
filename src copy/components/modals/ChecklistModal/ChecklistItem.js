import React from 'react';
import styled from 'styled-components';
import { func, string, bool } from 'prop-types';
import THEME from '../../../constants/theme';
import { CheckBox, CheckBoxActive } from '../../../assets/icons';
import { useGlobalContext } from '../../../containers/App/context';
import { BorderWrapper, P14M, P16M, MaterialIconStyler } from '../../atoms';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const ListItemWrap = styled(BorderWrapper)`
  margin-bottom: 16px;
  padding: 16px;
`;

const ChecklistItem = ({ done, title, buttonText, buttonAction, onClose }) => {
  const { IS_TABLET } = useGlobalContext();

  const onClickHandler = () => {
    buttonAction();
    onClose();
  };

  const iconStyle = { width: IS_TABLET ? 20 : 32, minWidth: IS_TABLET ? 20 : 32 };
  const textStyle = { width: IS_TABLET ? 'calc(100% - 40px)' : 'inherit' };

  return (
    <ListItemWrap fullWidth>
      <FlexContainer justifyContent="flex-start" wrap={IS_TABLET ? 'flex-wrap' : 'nowrap'}>
        <MaterialIconStyler icon={done ? CheckBoxActive : CheckBox} {...iconStyle} />
        <P16M {...textStyle} color={done ? THEME.greyColors.grey1 : null} margin="0 0 0 16px">
          {title}
        </P16M>
        {done ? (
          <P14M color={THEME.greyColors.grey1} margin="0 0 0 auto">
            Done
          </P14M>
        ) : (
          <P14M cursor="pointer" color={THEME.primaryColors.blue} margin="0 0 0 auto" onClick={onClickHandler}>
            {buttonText}
          </P14M>
        )}
      </FlexContainer>
    </ListItemWrap>
  );
};

ChecklistItem.propTypes = {
  done: bool.isRequired,
  title: string.isRequired,
  buttonText: string.isRequired,
  buttonAction: func.isRequired,
  onClose: func.isRequired,
};

export default ChecklistItem;
