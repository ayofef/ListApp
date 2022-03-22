import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next/src/index';
import isEmpty from 'lodash/isEmpty';
import { P14, P16B } from '../../../../../components/atoms';
import THEME from '../../../../../constants/theme';
import EmptyState from '../../../components/Details/DetailsTable/EmptyState';
import { PAYMENT_METHOD_ICON_MAP } from '../../../../../assets/icons/PaymentMethods';
import { LinkedItemsWrapperBorder } from '../../../../../components/GridSystem/styled';
import { DefaultCardTag } from '../../../../../components/table/Cells/DefaultCardCell';

const TITLE = 'Linked Payment Methods';

const getCardIconByBrand = (card) => {
  const Icon = PAYMENT_METHOD_ICON_MAP[card] ?? PAYMENT_METHOD_ICON_MAP.UNKNOWN_CARD;
  return <Icon />;
};

const LinkedPaymentMethods = ({ linkedPaymentMethods, handleRowClick }) => {
  const { t } = useTranslation();
  const emptyData = useMemo(() => isEmpty(linkedPaymentMethods), [linkedPaymentMethods]);

  return (
    <Box component="section" mt="54px">
      <P16B>{t(TITLE)}</P16B>

      {emptyData && <EmptyState title={TITLE} />}

      {!emptyData && (
        <LinkedItemsWrapperBorder>
          {linkedPaymentMethods?.map((paymentMethod) => (
            <div
              key={`payment-method-${paymentMethod.token}`}
              onClick={() => handleRowClick({ id: paymentMethod.token })}
            >
              <div>
                {getCardIconByBrand(paymentMethod.brand)}
                <div>
                  <P14>
                    {paymentMethod.brand} {paymentMethod.number.replace('**** **** ****', t('ending in'))}
                  </P14>
                  <P14 color={THEME.greyColors.grey11}>{`${paymentMethod.expMonth}/${paymentMethod.expYear}`}</P14>
                  <P14 color={THEME.greyColors.grey11}>{paymentMethod.name}</P14>
                </div>
              </div>

              {paymentMethod.isDefault && <DefaultCardTag text="default" />}
            </div>
          ))}
        </LinkedItemsWrapperBorder>
      )}
    </Box>
  );
};

LinkedPaymentMethods.propTypes = {
  linkedPaymentMethods: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleRowClick: PropTypes.func.isRequired,
};

export default LinkedPaymentMethods;
