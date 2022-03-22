import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import RadioGroup from '@material-ui/core/RadioGroup';

import { useTranslation } from 'react-i18next';
import StyledInPageSection from '../../components/StyledInPageSection';
import { Radio, P14 } from '../../../../../components/atoms';
import { StyledWrapper } from './styled';
import { CHECKOUT_TYPES, RADIO_NAME } from './constant';
import { DefaultCardTag } from '../../../../../components/table/Cells/DefaultCardCell';
import { useGlobalContext } from '../../../../../containers/App/context';
import { parseBoolean } from '../../../../../utils/parseBoolean';
import { useCheckoutContext } from '../checkoutContext';
import { useSetCheckoutType } from '../../hooks/useSetCheckoutType';
import LoadingState from './LoadingState';

const CheckoutType = () => {
  const { t } = useTranslation();
  const { toggleIntercom } = useGlobalContext();
  const { active, setActive, checkoutType, loading } = useCheckoutContext();
  const { handleSetCheckoutType } = useSetCheckoutType();

  const handleIntercom = useCallback(() => {
    toggleIntercom();
  }, [toggleIntercom]);

  const handleCollapse = useCallback(
    (e) => {
      e?.stopPropagation?.();
      const isDisabled = parseBoolean(e?.currentTarget?.dataset?.disabled);

      if (isDisabled) {
        handleIntercom();
        return;
      }

      const key = typeof e === 'string' ? e : e.currentTarget.dataset.value;
      if (key === active) {
        setActive('');
        return;
      }
      setActive(key);
    },
    [setActive, active, handleIntercom]
  );

  const handleChange = useCallback(
    (e) => {
      const { value } = e.target;

      if (value !== active) {
        handleCollapse(value);
      }
      handleSetCheckoutType(value);
    },
    [handleCollapse, handleSetCheckoutType, active]
  );

  return (
    <RadioGroup defaultValue={checkoutType} value={checkoutType} name={RADIO_NAME} onChange={handleChange}>
      <StyledInPageSection title="Checkout type">
        {loading && <LoadingState />}
        {!loading &&
          CHECKOUT_TYPES.map((checkout) => {
            const isActive = checkout.value === active;
            const disabled = !!checkout?.tag;

            return (
              <StyledWrapper key={checkout?.title} isActive={isActive} contentHeight={checkout?.contentHeight}>
                <Box p="30px 0 28px 0" display="flex" alignItems="flex-start" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    <button
                      type="button"
                      onClick={handleCollapse}
                      data-value={checkout?.value}
                      data-disabled={disabled}
                      className="checkout-type-title"
                    >
                      <P14 fontWeight="600">{t(checkout?.title)} </P14>
                    </button>
                    {checkout?.tag && (
                      <Box ml="84px">
                        <DefaultCardTag text={checkout?.tag} bgcolor="#F5F6F7" textColor="#787F88" />
                      </Box>
                    )}
                  </Box>

                  {!disabled && (
                    <Box
                      {...(disabled && {
                        onClick: handleIntercom,
                      })}
                    >
                      <Radio
                        name={RADIO_NAME}
                        value={checkout.value}
                        id={checkout.value}
                        {...(disabled && {
                          disabled: true,
                        })}
                      />
                    </Box>
                  )}
                </Box>

                {checkout?.contentHeight && (
                  <Box
                    height={`${checkout?.contentHeight}px`}
                    bgcolor="#F5F6F7"
                    padding="16px 80px"
                    borderRadius="8px"
                    boxSizing="border-box"
                  >
                    <Box component="img" src={checkout?.img} alt={checkout?.title} width="100%" />
                  </Box>
                )}
              </StyledWrapper>
            );
          })}
      </StyledInPageSection>
    </RadioGroup>
  );
};

export default CheckoutType;
