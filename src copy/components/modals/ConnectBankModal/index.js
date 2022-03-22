import { useMutation } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import isEmpty from 'lodash/isEmpty';
import { func, shape } from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import connectBankImage from '../../../assets/img/connectBankBackground.svg';
import PlaidIcon from '../../../assets/img/plaid.svg';
import THEME from '../../../constants/theme';
import { UPDATE_CARD_FUNDING_SOURCE } from '../../../utils/queries/funding/fundingMutations';
import { CircleWrapper, Logo, H1, H5, P18, P18B, P16, P14, BorderWrapper, L12, TextWrap, P14B } from '../../atoms';
import PlaidLink from '../../common/PlaidLink';
import FullScreenModalLayout from '../../layouts/FullScreenModalLayout';
import { AbsImage, ConnectBankWrap, StyledGrid } from './styled';
import { FlexContainer } from '../../atoms/flex/FlexContainer';
import { StretchBlock } from '../../atoms/flex/StretchBlock';

const ConnectBankModal = ({ selectedPayments, onClose, onCancel, setShowContinue, fundingDataRefetch }) => {
  const { t } = useTranslation();
  const [updateCard, { loading: updateCardLoading }] = useMutation(UPDATE_CARD_FUNDING_SOURCE);

  const onSuccessHandler = (token) => {
    updateCard({
      variables: {
        id: selectedPayments.id,
        plaidToken: token,
      },
    }).then((res) => {
      if (isEmpty(res.errors)) {
        onCancel();
        setShowContinue();
        fundingDataRefetch();
      }
    });
  };

  return (
    <FullScreenModalLayout pageModal noPadding onClose={() => onClose()}>
      <ConnectBankWrap>
        <Grid container>
          <Grid item xs={6}>
            <StretchBlock className="connect__container" alignItems="flex-start" flexDirection="column">
              <FlexContainer alignItems="flex-start" flexDirection="column">
                <Logo />
                <TextWrap margin="130px 0 0" maxWidth="390">
                  <H1>{t('connectBank.title')}</H1>
                  <P16 margin="16px 0 0 0" color={THEME.greyColors.grey1}>
                    {t('connectBank.description')}
                  </P16>
                </TextWrap>
              </FlexContainer>
              <BorderWrapper margin="48px 0 0" maxWidth="480px" padding="32px 24px">
                <H5>{t('connectBank.cardTitle')}</H5>
                <P14 margin="0 0 30px" color={THEME.greyColors.grey1}>
                  {t('connectBank.cardDescription')}
                </P14>
                <PlaidLink
                  onSuccess={onSuccessHandler}
                  text={t('buttonsText.ConnectNow')}
                  loading={updateCardLoading}
                  handleConnect={() => {}}
                />
              </BorderWrapper>
              <FlexContainer margin="26px 0 0" justifyContent="flex-start">
                <img src={PlaidIcon} alt="" />
                <L12 margin="0 0 0 14px">Powered by Plaid</L12>
              </FlexContainer>
            </StretchBlock>
          </Grid>
          <StyledGrid item xs={6} backgroundColor={THEME.designerColors.yellow}>
            <StretchBlock className="connect__info" alignItems="flex-start" flexDirection="column">
              <TextWrap maxWidth="400">
                <P18>{t('connectBank.steps.title')}</P18>
                <FlexContainer margin="28px 0 24px">
                  <CircleWrapper
                    margin="0 24px 0 0"
                    size="40"
                    borderColor={THEME.primaryColors.black}
                    background={THEME.primaryColors.black}
                  >
                    <P18B color={THEME.primaryColors.white}>1</P18B>
                  </CircleWrapper>
                  <div>
                    <P14B>{t('connectBank.steps.1.title')}</P14B>
                    <P14>{t('connectBank.steps.1.description')}</P14>
                  </div>
                </FlexContainer>
                <FlexContainer margin="0 0 24px">
                  <CircleWrapper
                    margin="0 24px 0 0"
                    size="40"
                    borderColor={THEME.primaryColors.black}
                    background={THEME.primaryColors.black}
                  >
                    <P18B color={THEME.primaryColors.white}>2</P18B>
                  </CircleWrapper>
                  <div>
                    <P14B>{t('connectBank.steps.2.title')}</P14B>
                    <P14>{t('connectBank.steps.2.description')}</P14>
                  </div>
                </FlexContainer>
                <FlexContainer>
                  <CircleWrapper
                    margin="0 24px 0 0"
                    size="40"
                    borderColor={THEME.primaryColors.black}
                    background={THEME.primaryColors.black}
                  >
                    <P18B color={THEME.primaryColors.white}>3</P18B>
                  </CircleWrapper>
                  <div>
                    <P14B>{t('connectBank.steps.3.title')}</P14B>
                    <P14>{t('connectBank.steps.3.description')}</P14>
                  </div>
                </FlexContainer>
              </TextWrap>
              <AbsImage src={connectBankImage} alt="" />
            </StretchBlock>
          </StyledGrid>
        </Grid>
      </ConnectBankWrap>
    </FullScreenModalLayout>
  );
};

ConnectBankModal.propTypes = {
  selectedPayments: shape({}).isRequired,
  onClose: func.isRequired,
  onCancel: func.isRequired,
  setShowContinue: func.isRequired,
  fundingDataRefetch: func,
};

ConnectBankModal.defaultProps = {
  fundingDataRefetch: () => false,
};

export default ConnectBankModal;
