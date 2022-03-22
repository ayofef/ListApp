import { Box, Tooltip } from '@material-ui/core';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/src';
import { StyledTable } from '../../../../../components/GridSystem/styled';
import reduceValue from '../../_utils/reduceValue';
import { P14, P16B } from '../../../../../components/atoms';
import THEME from '../../../../../constants/theme';
import { riskFormat } from '../../_utils/riskFormat';

const RiskSection = ({ payment }) => {
  const { t } = useTranslation();

  const { riskLevel, riskScore } = useMemo(() => {
    const core = reduceValue(payment.paymentCore?.value);
    const outcome = reduceValue(core?.outcome);

    return {
      riskLevel: outcome?.riskLevel ?? '',
      riskScore: outcome?.riskScore ?? '',
    };
  }, [payment]);

  return (
    <Box component="section" mt="24px">
      <P16B>{t('Risk')}</P16B>

      <StyledTable>
        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Engine')}</P14>
          <P14>
            <span>N/A</span>
          </P14>
        </div>
        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Fraud Provider')}</P14>
          <P14>
            <span>N/A</span>
          </P14>
        </div>
        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Level')}</P14>
          {riskLevel ? (
            riskFormat(riskLevel, riskScore)
          ) : (
            <Tooltip title="Lorem ipsum" arrow placement="top">
              <span>N/A</span>
            </Tooltip>
          )}
        </div>
        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Fingerprint')}</P14>
          <P14>
            <span>N/A</span>
          </P14>
        </div>
        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Fraud Score')}</P14>
          <P14>
            <span>N/A</span>
          </P14>
        </div>
        <div>
          <P14 color={THEME.greyColors.grey1}>{t('Data of Risk Assessment')}</P14>
          <P14>
            <span>N/A</span>
          </P14>
        </div>
      </StyledTable>
    </Box>
  );
};

RiskSection.propTypes = {
  payment: PropTypes.shape({
    paymentCore: PropTypes.shape({
      value: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({}),
            PropTypes.arrayOf(PropTypes.shape({})),
          ]),
        })
      ),
    }),
  }),
};
RiskSection.defaultProps = {
  payment: {
    paymentCore: {},
  },
};
export default RiskSection;
