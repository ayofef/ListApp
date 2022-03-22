import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes, { string } from 'prop-types';
import AddIcon from '../../../../pages/FlowDetailsPage/Components/AddIcon';
import { NewConnectionBox, TextBox } from './styled';
import { useFlowEditorContext } from '../../context';

const AddNewConnectionButton = ({
  connectionTypes,
  btnHeight,
  iconSize,
  fontSize,
  mt,
  mr,
  ml,
  border,
  borderRadius,
  ...rest
}) => {
  const { t } = useTranslation();
  const { openConnectionModal } = useFlowEditorContext();

  return (
    <NewConnectionBox
      onClick={() => openConnectionModal({ types: connectionTypes })}
      $btnHeight={btnHeight}
      mt={mt}
      border={border}
      borderRadius={borderRadius}
      {...rest}
    >
      <AddIcon mr={mr} ml={ml} borderRadius="50%" width={iconSize} height={iconSize} />
      <TextBox fontSize={fontSize}>{t('New connection')}</TextBox>
    </NewConnectionBox>
  );
};

AddNewConnectionButton.propTypes = {
  connectionTypes: PropTypes.arrayOf(PropTypes.string),
  btnHeight: string,
  iconSize: string,
  fontSize: string,
  mt: string,
  mr: string,
  ml: string,
  border: string,
  borderRadius: string,
};

AddNewConnectionButton.defaultProps = {
  connectionTypes: null,
  btnHeight: 'auto',
  iconSize: '32px',
  fontSize: '14px',
  mt: '0',
  mr: '16px',
  ml: '0',
  border: 'none',
  borderRadius: '0',
};

export default AddNewConnectionButton;
