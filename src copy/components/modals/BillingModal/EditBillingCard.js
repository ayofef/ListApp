import React from 'react';
import { useTranslation } from 'react-i18next';
import { func, shape } from 'prop-types';
import THEME from '../../../constants/theme';
import BillingCardForm from '../../forms/BillingCardForm';
import { H1, P16, BlockWrap, TextWrap } from '../../atoms';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const EditBillingCard = ({ editCard, onClose, cardData }) => {
  const { t } = useTranslation();
  const handleCardSubmit = (val) => {
    const date = val.expiryDate.split('/');
    editCard({
      variables: {
        id: cardData.id,
        nameOnCard: val.name,
        accountNumber: val.cardNumber.split('-').join('') || undefined,
        securityCode: val.cvv || undefined,
        expMonth: date[0] || undefined,
        expYear: date[1] || undefined,
      },
    });
    onClose();
  };

  return (
    <>
      <FlexContainer alignItems="flex-start" flexDirection="column">
        <TextWrap maxWidth="300">
          <H1>{t('funding.editCardTitle')}</H1>
        </TextWrap>
        <TextWrap maxWidth="460">
          <P16 margin="16px 0 0 0" color={THEME.greyColors.grey1}>
            {t('funding.editBillingCardDescription')}
          </P16>
        </TextWrap>
      </FlexContainer>
      <BlockWrap margin="80px 0 0 0">
        <BillingCardForm
          handleCardSubmit={handleCardSubmit}
          handleCancel={onClose}
          initialValues={{ ...cardData }}
          editBillingCard
        />
      </BlockWrap>
    </>
  );
};

EditBillingCard.propTypes = {
  editCard: func.isRequired,
  onClose: func.isRequired,
  cardData: shape({}).isRequired,
};

export default EditBillingCard;
