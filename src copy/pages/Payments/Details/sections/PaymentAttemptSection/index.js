import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRightRounded';
import moment from 'moment';

import { StyledTable } from '../../../../../components/GridSystem/styled';
import { P16B, P14, ButtonRounded } from '../../../../../components/atoms';
import { Tag } from '../../../../../components/common/Tag/styled';
import { UI_ROUTES } from '../../../../../constants/routes';
import { isDefined } from '../../../../../utils/helpers';
import THEME from '../../../../../constants/theme';
import { STATUS_UI_LABEL_MAP, transformStatusUiLabel } from '../../../../../components/table/Cells/constant';

const PaymentAttemptSection = ({ paymentAttempts }) => {
  const { t } = useTranslation();

  //Sort by timestamp
  const sortedPaymentAttempts = paymentAttempts.slice().sort((a, b) => moment(a.time).diff(moment(b.time)));

  const transformPaymentAttemptData = sortedPaymentAttempts.map((paymentAttempt) => {
    const time = isDefined(paymentAttempt.time) ? moment(paymentAttempt.time).format('MMM DD, LT') : '';

    return {
      ...paymentAttempt,
      time,
      link: `${UI_ROUTES.payments}/details/${paymentAttempt.paymentId}`,
    };
  });

  return (
    <Box component="section" mt="24px">
      <P16B>{t('Payment Attempts')}</P16B>
      <StyledTable>
        {transformPaymentAttemptData.map((paymentAttempt, index) => (
          <div key={paymentAttempt.paymentId}>
            <Box display="flex" alignItems="center">
              <Tag variant={paymentAttempt.status?.toLowerCase()}>
                {STATUS_UI_LABEL_MAP[paymentAttempt.status]?.toUpperCase() ||
                  transformStatusUiLabel(paymentAttempt.status)}
              </Tag>
              <P14 margin="0 0 0 8px">
                {t('Payment Attempt')} #{index + 1},
              </P14>
              &nbsp;
              <P14 color={THEME.greyColors.grey18}>{paymentAttempt.time}</P14>
            </Box>

            <div>
              <ButtonRounded
                component={Link}
                to={`${paymentAttempt.link}`}
                variant="text"
                color="primary"
                endIcon={<ChevronRightIcon />}
                endiconmarginleft="4px"
              >
                {t('View')}
              </ButtonRounded>
            </div>
          </div>
        ))}
      </StyledTable>
    </Box>
  );
};

PaymentAttemptSection.propTypes = {
  paymentAttempts: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string,
      status: PropTypes.string,
      paymentId: PropTypes.string,
    })
  ).isRequired,
};

export default PaymentAttemptSection;
