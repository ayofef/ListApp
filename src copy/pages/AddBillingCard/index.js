import { useMutation } from '@apollo/client';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';
import CustomLayout from '../../components/layouts/CustomLayout';
import THEME from '../../constants/theme';
import { UI_ROUTES } from '../../constants/routes';
import BillingCardForm from '../../components/forms/BillingCardForm';
import { UPDATE_CUSTOMER } from '../../utils/queries/customer/customerMutations';
import BackgroundImage from '../../assets/img/addBillingCard-full.svg';
import { useGlobalContext } from '../../containers/App/context';
import StepIndicator from '../../components/common/StepIndicator';
import { Logo, H1, P16, StyledBgImage } from '../../components/atoms';
import { StretchBlock } from '../../components/atoms/flex/StretchBlock';
import { LeftSideFormWrapper } from '../../components/forms/LeftSideFormWrapper';

const AddBillingCard = () => {
  const { t } = useTranslation();
  const { getMeData, getMeRefetch } = useGlobalContext();
  const { push } = useHistory();
  const [updateCustomer, { data: updateData, loading: updateLoading }] = useMutation(UPDATE_CUSTOMER);
  useEffect(() => {
    if (updateData && !updateLoading && getMeData.we?.billingDetails?.billingCard?.id) {
      push(UI_ROUTES.root);
    }
  }, [push, updateData, updateLoading, getMeData]);

  const handleCardSubmit = useCallback(
    (val) => {
      const date = val.expiryDate.split('/');
      const valuesToData = {
        variables: {
          nickname: val.name,
          nameOnCard: val.name,
          accountNumber: val.cardNumber.split('-').join(''),
          securityCode: val.cvv,
          expMonth: date[0],
          expYear: date[1],
        },
      };
      updateCustomer(valuesToData).then((res) => {
        if (res && isEmpty(res.errors)) {
          getMeRefetch();
        }
      });
    },
    [updateCustomer, getMeRefetch]
  );

  return (
    <CustomLayout
      image={<StyledBgImage src={BackgroundImage} alt="" />}
      backgroundColor={THEME.secondaryColors.darkBlue}
    >
      <LeftSideFormWrapper>
        <Logo />
        <StepIndicator stepsCount={3} currentStep={3} justifyContent="flex-start" />
        <StretchBlock alignItems="flex-start" flexDirection="column">
          <H1 margin="60px 0 26px 0">{t('addBillingCardForm.title')}</H1>
          <P16 margin="0 0 24px 0" color={THEME.greyColors.grey1}>
            {t('addBillingCardForm.description')}
          </P16>
          <BillingCardForm handleCardSubmit={handleCardSubmit} loading={updateLoading} isPage={Boolean(true)} />
        </StretchBlock>
      </LeftSideFormWrapper>
    </CustomLayout>
  );
};

export default AddBillingCard;
