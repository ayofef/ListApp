import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import capitalize from '@material-ui/core/utils/capitalize';
import { P16B, P14, ButtonRounded, CircularLoader } from '../../../../../../components/atoms';
import THEME from '../../../../../../constants/theme';
import DownloadIcon from '../../../../../../assets/icons/DownloadIcon';
import { StyledProgressBar } from './styled';
import { useHistoricPayment } from './useHistoricPayment';
import { StyledWrapper, StyledTitleWrapper } from '../styled';
import { STATUS_MAP, IMPORT_STATUS_DICTIONARY, DESC, TITLE, LABEL_COLOR_MAP } from './constant';
import SelectFlowDialog from './SelectFlowDialog';
import LoadingState from './LoadingState';
import { generateUserPilotAttribute } from '../../../../../../constants/generateUserPilotLabel';
import { USER_PILOT_SECTION_ID } from '../../../../constant';
import { UI_ROUTES } from '../../../../../../constants/routes';

const DISABLE_BUTTON_MAP = [IMPORT_STATUS_DICTIONARY.importing, IMPORT_STATUS_DICTIONARY.completed];

const HistoricPayments = ({ connectionId, linkedPaymentFlows, paymentFlowLoading }) => {
  const { t } = useTranslation();
  const {
    loading: historicPaymentLoading,
    progress,
    handleHistoricPayment,
    importStatus,
    importHistoricPaymentLoading,
    selectFlowDialog,
    toggleSelectFlowDialog,
  } = useHistoricPayment({
    connectionId,
  });

  const loading = historicPaymentLoading || paymentFlowLoading;

  const parsedProgress = useMemo(() => (importStatus === IMPORT_STATUS_DICTIONARY.completed ? 100 : progress), [
    progress,
    importStatus,
  ]);

  const { label, color, showButtonIcon, progressColor } = useMemo(
    () =>
      parsedProgress && parsedProgress < 100
        ? STATUS_MAP[IMPORT_STATUS_DICTIONARY.importing]
        : STATUS_MAP[importStatus] || STATUS_MAP.default,
    [importStatus, parsedProgress]
  );

  const isCompleted = useMemo(() => importStatus === IMPORT_STATUS_DICTIONARY.completed, [importStatus]);
  const importError = useMemo(() => importStatus === IMPORT_STATUS_DICTIONARY.error, [importStatus]);
  const isDisabledButton = useMemo(() => DISABLE_BUTTON_MAP.includes(importStatus) || Boolean(parsedProgress), [
    importStatus,
    parsedProgress,
  ]);

  return (
    <StyledWrapper {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, 'status', TITLE)}>
      <StyledTitleWrapper p="24px 24px 16px 24px">
        <P16B margin="0 0 8px 0">{t(TITLE)}</P16B>
        <P14 color={THEME.greyColors.grey1}>{t(DESC)}</P14>
        <ButtonRounded component="a" variant="text" color="primary" fontWeight="normal" href={UI_ROUTES.payments}>
          {t('All Payments')}
        </ButtonRounded>
      </StyledTitleWrapper>

      <Box display="flex" alignItems="center" p="12px 24px" justifyContent="space-between">
        {loading && <LoadingState />}
        {!loading && (
          <>
            <Box display="flex" alignItems="center">
              {importError ? (
                <P14 fontWeight="500" color={THEME.statusColors.failed}>
                  {t('Import error')}
                </P14>
              ) : (
                <>
                  <Box mr="8px">
                    <StyledProgressBar
                      progress={parsedProgress}
                      completed={isCompleted}
                      color={progressColor.main}
                      pseudoColor={progressColor.pseudoColor}
                    >
                      &nbsp;
                    </StyledProgressBar>
                  </Box>
                  <P14 fontWeight="500" color={LABEL_COLOR_MAP[importStatus]}>
                    {importHistoricPaymentLoading ? <CircularLoader size={12} /> : `${parsedProgress}%`}
                  </P14>
                </>
              )}
            </Box>
            <ButtonRounded
              onClick={toggleSelectFlowDialog}
              type="button"
              color={color}
              variant="text"
              disabled={isDisabledButton}
              {...(showButtonIcon && {
                endIcon: (
                  <DownloadIcon
                    strokeWidth={2.5}
                    size={17}
                    fill={color === 'primary' ? THEME.primaryColors.primary : 'THEME.greyColors.grey1'}
                  />
                ),
              })}
            >
              <Box component="span" fontWeight="500" {...(isDisabledButton && { color: THEME.greyColors.grey1 })}>
                {importError ? 'Retry' : capitalize(t(label) ?? '')}
              </Box>
            </ButtonRounded>{' '}
          </>
        )}
      </Box>

      {selectFlowDialog && (
        <SelectFlowDialog
          isOpen={selectFlowDialog}
          toggleIsOpen={toggleSelectFlowDialog}
          handleSubmit={handleHistoricPayment}
          linkedPaymentFlows={linkedPaymentFlows}
          paymentFlowLoading={paymentFlowLoading}
        />
      )}
    </StyledWrapper>
  );
};

HistoricPayments.propTypes = {
  connectionId: PropTypes.string.isRequired,
  linkedPaymentFlows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  paymentFlowLoading: PropTypes.bool.isRequired,
};

export default HistoricPayments;
