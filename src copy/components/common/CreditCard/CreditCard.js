import React from 'react';
import { shape, string } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import THEME from '../../../constants/theme';
import { CircularLoader, CopyToClipboard, BlockWrap, P14, P18B } from '../../atoms';
import { creditCardValueFormat } from '../../../utils/helpers';
import MasterCardIcon from '../../../assets/img/card.svg';
import ViseCardIcon from '../../../assets/img/visa.svg';
import { FlexContainer } from '../../atoms/flex/FlexContainer';
import { StyledImage } from '../../styled/StyledImage';

const CreditCardWrapper = styled.div`
  max-width: 100%;
  padding: 24px 24px 15px 24px;
  border-radius: 8px;
  background: ${({ color }) => color};
`;

const formatDateToCard = (month, year) => {
  return `${month}/${year[2]}${year[3]}`;
};

const maskNumber = (maskedNumber) => {
  if (maskedNumber) {
    if (maskedNumber.length === 16) {
      return `•••• •••• •••• ${maskedNumber.substring(12, 16)}`;
    }
  }
  return maskedNumber && maskedNumber.split('*').join('•');
};

const CreditCard = ({ cardInfo, secureCard, color }) => {
  const { id, maskedNumber, expMonth, expYear, nickname, cardholderName, cardType } = cardInfo;
  const { setSecureCardId, secureCardData, secureCardLoading } = secureCard;
  const { t } = useTranslation();
  const isSecure = !isEmpty(secureCardData);
  const showNotificationHandler = (type) => {
    if (isSecure) {
      NotificationManager.success(`${type} ${t('uiMessages.copiedToClipboard')}`, t('uiMessages.success'), 5000);
    }
  };

  return (
    <CreditCardWrapper color={color}>
      <P18B margin="0 0 52px">{nickname?.toString() || cardholderName?.toString()}</P18B>

      <BlockWrap margin="0 0 20px">
        <CopyToClipboard
          isSecure={isSecure}
          text={isSecure ? creditCardValueFormat(secureCardData?.number) : maskedNumber}
          onCopy={() => showNotificationHandler('Number')}
        >
          <P18B letterSpacing="2px">
            {isSecure ? creditCardValueFormat(secureCardData?.number) : maskNumber(maskedNumber)}
          </P18B>
        </CopyToClipboard>
      </BlockWrap>

      <FlexContainer justifyContent="flex-start" margin="0 0 7px">
        <BlockWrap margin="0 34px 10px 0">
          <CopyToClipboard
            isSecure={isSecure}
            className="small"
            text={formatDateToCard(expMonth, expYear)}
            onCopy={() => showNotificationHandler('Expiry date')}
          >
            <P18B margin="0 0 4px">{formatDateToCard(expMonth, expYear)}</P18B>
          </CopyToClipboard>
          <P14 opacity="0.3">Expiry date</P14>
        </BlockWrap>
        <BlockWrap margin="0 0 10px">
          <CopyToClipboard
            isSecure={isSecure}
            className="small"
            text={isSecure ? secureCardData.securityCode : '•••'}
            onCopy={() => showNotificationHandler('CVV')}
          >
            <P18B margin="0 0 4px">{isSecure ? secureCardData.securityCode : '•••'}</P18B>
          </CopyToClipboard>
          <P14 opacity="0.3">CVV</P14>
        </BlockWrap>
      </FlexContainer>
      <FlexContainer justifyContent="space-between">
        <FlexContainer justifyContent="flex-start">
          {secureCardLoading && (
            <BlockWrap margin="0 6px 0 0" height="16px">
              <CircularLoader size={15} />
            </BlockWrap>
          )}
          <P14 cursor="pointer" color={THEME.primaryColors.blue} onClick={() => setSecureCardId(id)}>
            Show details
          </P14>
        </FlexContainer>
        <StyledImage width="52px" src={cardType === 'VISA' ? ViseCardIcon : MasterCardIcon} alt="" />
      </FlexContainer>
    </CreditCardWrapper>
  );
};

CreditCard.propTypes = {
  cardInfo: shape({}).isRequired,
  secureCard: shape({}).isRequired,
  color: string,
};

CreditCard.defaultProps = {
  color: '#CEB5E7',
};

export default CreditCard;
