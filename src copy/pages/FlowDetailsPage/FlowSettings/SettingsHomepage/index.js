import React, { useMemo } from 'react';
import FlowInfo from './FlowInfoSection';
import DetailsHeader from '../../Components/DetailsHeader';
import PaymentProcessor from './PaymentProcessorSection';
import Checkout from './CheckoutSection';
import { CHECKOUT_DICTIONARY } from '../CheckoutPage/CheckoutType/constant';
import { usePaymentFlowContext } from '../../paymentFlowContext';
import VideoPlayer from '../../../../components/VideoPlayer';
import Image from '../../../../assets/img/flow-settings.png';
import { VideoPlayerWrapper } from '../../styled';

const FlowSettings = () => {
  const { flow, connectedProcessors, defaultProcessor, loading } = usePaymentFlowContext();

  const checkoutType = useMemo(() => flow?.configuredCheckout ?? CHECKOUT_DICTIONARY.none, [flow?.configuredCheckout]);

  return (
    <>
      <DetailsHeader />
      <VideoPlayerWrapper>
        <VideoPlayer src="https://static.whenthen.com/videos/SettingsScreen.mp4" poster={Image} height="340px" />
      </VideoPlayerWrapper>
      <FlowInfo />
      <PaymentProcessor paymentProcessors={connectedProcessors} loading={loading} defaultProcessor={defaultProcessor} />
      <Checkout paymentProcessors={connectedProcessors} checkoutType={checkoutType} loading={loading} />
    </>
  );
};

export default FlowSettings;
