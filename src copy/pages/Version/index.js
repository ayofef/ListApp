import React from 'react';
import styled from 'styled-components';

import packageInfo from '../../../package.json';

const VersionPage = () => <StyledH2>Current version: {packageInfo.version}</StyledH2>;

export default VersionPage;

const StyledH2 = styled.h2`
  font-weight: 500;
  font-size: 32px;
  line-height: 52px;
  text-align: center;
`;
