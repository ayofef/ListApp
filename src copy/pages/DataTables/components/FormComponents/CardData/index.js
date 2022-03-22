import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import Input from '../../../../../components/forms/_common/Input';
import CardNumberInput from './CardNumberInput';
import ExpiryInput from './ExpiryInput';
import { normalizeCvc } from './constant';

const CardData = ({ name, customLabelProps }) => {
  const { t } = useTranslation();
  const [flipped, setFlipped] = useState(false);
  const toggleFlipped = useCallback(() => setFlipped((prevState) => !prevState), []);
  const cardInputField = useField(name.number);
  const cvcNormalizeProps = useMemo(
    () => ({
      cardNumber: cardInputField[0].value,
    }),
    [cardInputField]
  );

  return (
    <Box>
      <CardNumberInput
        cardInputField={cardInputField}
        flipped={flipped}
        name={name.number}
        customLabelProps={customLabelProps}
      />

      <Box display="flex" mt="16px">
        <Box mr="16px" flex="1">
          <ExpiryInput expiry={name.expiry} customLabelProps={customLabelProps} />
        </Box>
        <Box flex="1" onFocus={() => toggleFlipped()} onBlur={() => toggleFlipped()}>
          <Input
            name={name.cvc}
            label={t('CVC')}
            type="text"
            customLabel
            customLabelProps={customLabelProps}
            normalize={normalizeCvc}
            normalizeProps={cvcNormalizeProps}
            placeholder="CVC"
          />
        </Box>
      </Box>
    </Box>
  );
};

CardData.propTypes = {
  customLabelProps: PropTypes.shape({}).isRequired,
  name: PropTypes.shape({
    number: PropTypes.string,
    cvc: PropTypes.string,
    expiry: PropTypes.string,
  }).isRequired,
};

export default CardData;
