import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box/index';
import { useTranslation } from 'react-i18next/src/index';
import { Col, Row } from '../../../_common/styled';
import Processor from '../../../../../../components/table/Processor';
import { SquareIndicator, CircleIndicator } from '../../../../../../components/atoms/Indicator';
import reduceValue from '../../../_utils/reduceValue';

const PaymentSummaryHeader = ({ payment }) => {
  const { t } = useTranslation();
  const paymentStatus = payment.status?.value || '';
  const paymentType = payment.type?.value || '';
  const { logo, name } = useMemo(() => reduceValue(payment.paymentGateway?.value), [payment.paymentGateway?.value]);

  return (
    <Box mt="20px">
      <Row divider={false}>
        <Col>
          <Processor logo={logo} name={name} />
        </Col>

        <Col>
          <SquareIndicator varialnt={paymentType.toLowerCase()}>{t(paymentType)}</SquareIndicator>
        </Col>

        <Col>
          <CircleIndicator variant={paymentStatus.toLowerCase()}>{t(paymentStatus)}</CircleIndicator>
        </Col>
      </Row>
    </Box>
  );
};

PaymentSummaryHeader.propTypes = {
  payment: PropTypes.shape({
    status: PropTypes.shape({
      value: PropTypes.string,
    }),
    type: PropTypes.shape({
      value: PropTypes.string,
    }),
    paymentGateway: PropTypes.shape({
      value: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ).isRequired,
    }),
  }).isRequired,
};

export default PaymentSummaryHeader;
