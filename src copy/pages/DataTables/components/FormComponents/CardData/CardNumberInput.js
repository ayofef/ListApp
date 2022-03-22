import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { normalizeCardNumber } from './constant';
import { InputField, P } from '../../../../../components/atoms';
import { Label, Error } from '../../../../../components/forms/_common/Input';
import THEME from '../../../../../constants/theme';
import { StyledCardNumberWrapper, FrontIcon, BackIcon } from './styled';
import { PAYMENT_METHOD_ICON_MAP } from '../../../../../assets/icons/PaymentMethods';
import { checkCardBrand } from '../../../../../utils/checkCardBrand';

const CardNumberInput = ({ name, customLabelProps, flipped, cardInputField }) => {
  const { t } = useTranslation();
  const [{ value: fieldValue, onBlur }, { error, touched }, { setValue }] = cardInputField;
  const cardBrand = useMemo(() => checkCardBrand(fieldValue), [fieldValue]);
  const Icon = PAYMENT_METHOD_ICON_MAP[cardBrand] ?? PAYMENT_METHOD_ICON_MAP.VISA;
  const CvcIcon = PAYMENT_METHOD_ICON_MAP.UNKNOWN_CARD;

  const handleOnChange = useCallback(
    (e) => {
      const { value } = e.target;

      if (normalizeCardNumber) {
        setValue(normalizeCardNumber(value, cardBrand));
        return;
      }
      setValue(value);
    },
    [setValue, cardBrand]
  );

  return (
    <Label>
      <P
        fontSize="12px !important"
        fontWeight={600}
        width="100%"
        textAlign="left"
        lineHeight="30px"
        {...(customLabelProps && { customLabelProps })}
      >
        {t('Card number')}
      </P>
      <StyledCardNumberWrapper>
        <FrontIcon flipped={flipped}>
          <Icon />
        </FrontIcon>
        <BackIcon flipped={flipped}>
          <CvcIcon />
        </BackIcon>

        <InputField
          name={name}
          label=""
          type="text"
          variant="outlined"
          value={fieldValue}
          onChange={handleOnChange}
          onBlur={onBlur}
          placeholder="0000 0000 0000 0000"
        />
      </StyledCardNumberWrapper>
      {touched && error && <Error color={THEME.secondaryColors.danger}>{t(error)}</Error>}
    </Label>
  );
};

CardNumberInput.propTypes = {
  customLabelProps: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  flipped: PropTypes.bool.isRequired,
  cardInputField: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CardNumberInput;
