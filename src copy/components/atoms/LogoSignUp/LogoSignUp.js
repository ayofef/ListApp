import React from 'react';
import styled from 'styled-components';
import logoSmall from '../../../assets/img/logo-small.svg';

const Image = styled.img`
  display: block;
  width: 32px;
  margin-bottom: 32px;
`;

const LogoSignUp = () => <Image src={logoSmall} alt="when then" />;

export default LogoSignUp;
