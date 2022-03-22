import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import logoLightTheme from '../../../assets/img/Logo.svg';
import logoDarkTheme from '../../../assets/img/logoDarkTheme.svg';

const Image = styled.img`
  display: block;
  width: 100%;
`;

const Logo = ({ theme }) => <Image src={theme === 'light' ? logoLightTheme : logoDarkTheme} alt="when then" />;

Logo.propTypes = {
  theme: string,
};

Logo.defaultProps = {
  theme: 'light',
};

export default Logo;
