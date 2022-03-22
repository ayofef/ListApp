import React from 'react';
import { string, bool, func, shape, arrayOf } from 'prop-types';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import THEME from '../../../constants/theme';
import { CircleImage, CircleWrapper, P14, P142Lines, BlockWrap, L12, SPANM } from '../../atoms';
import UserInfo from '../../atoms/UserInfo/UserInfo';
import CheckBox from '../../../assets/img/checkBox.svg';
import CheckBoxActive from '../../../assets/img/checkBoxActive.svg';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const AvatarWrap = styled(FlexContainer)`
  position: relative;
  justify-content: flex-start;
  ${P14} {
    max-width: 240px;
    margin-right: 12px;
  }
`;

const AvatarItem = ({
  id,
  name,
  src,
  onClick,
  text,
  text2,
  onlyName,
  requester,
  selectedRows,
  setSelectedRows,
  showRequester,
  requestInTable,
  canSelect,
  attentionData,
  transaction,
}) => {
  const isAttention = !isEmpty(attentionData);
  const isActive = selectedRows && selectedRows?.find((i) => i === id);

  const { t } = useTranslation();

  const onClickHandler = (e) => {
    e.stopPropagation();
    onClick();

    if (!isActive) {
      if (isAttention) {
        setSelectedRows(id);
      } else {
        setSelectedRows((prev) => [...prev, id]);
      }
    } else {
      setSelectedRows((prev) => prev.filter((i) => i !== id));
    }
  };

  return (
    <AvatarWrap onClick={(e) => canSelect && onClickHandler(e)} center={onlyName}>
      {canSelect && (
        <BlockWrap margin="0 16px 0 0">
          {isActive ? <img src={CheckBoxActive} alt="" /> : <img src={CheckBox} alt="" />}
        </BlockWrap>
      )}
      {src ? (
        <CircleImage src={src} size="avatar-table" margin="0 16px 0 0" />
      ) : (
        <CircleWrapper size="avatar-table" margin="0 16px 0 0">
          {text2 && !transaction ? text2.charAt(0).toUpperCase() : text.charAt(0).toUpperCase()}
        </CircleWrapper>
      )}

      <BlockWrap>
        {requestInTable ? (
          <P14>
            <SPANM>{text2}</SPANM> {t('tables.requests.isRequestingToPurchase')}
            <SPANM>{name}</SPANM>
          </P14>
        ) : (
          <>
            <P142Lines margin="0 0 2px">{name}</P142Lines>
            <L12 color={THEME.greyColors.grey1}>
              {text && `${text} · `}
              {text2}
            </L12>
          </>
        )}
      </BlockWrap>
      {showRequester && <UserInfo className="user-info" name={requester?.name} email={requester?.email?.address} />}
    </AvatarWrap>
  );
};

AvatarItem.propTypes = {
  id: string,
  text: string,
  text2: string,
  onlyName: bool,
  onClick: func,
  name: string,
  src: string,
  selectedRows: arrayOf(string),
  setSelectedRows: func,
  showRequester: bool,
  requestInTable: bool,
  requester: shape({
    name: string,
    email: shape({
      address: string,
    }),
  }),
  canSelect: bool,
  attentionData: shape({}),
  transaction: bool,
};
AvatarItem.defaultProps = {
  id: '',
  text: '',
  text2: '',
  onlyName: false,
  onClick: () => false,
  name: '',
  src: '',
  selectedRows: [],
  setSelectedRows: () => false,
  showRequester: false,
  requestInTable: false,
  requester: {},
  canSelect: false,
  attentionData: {},
  transaction: false,
};
export default AvatarItem;
