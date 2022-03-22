import React from 'react';
import InfoBlockState from '../../Components/InfoBlockState';
import { StyledImage } from '../../../components/styled';
import SPIN_IMG from '../../../../../assets/img/Spinner.png';

const LoadingInfoBlock = () => {
  return (
    <InfoBlockState>
      <StyledImage src={SPIN_IMG} alt="loading-spinner" />
    </InfoBlockState>
  );
};

export default LoadingInfoBlock;
