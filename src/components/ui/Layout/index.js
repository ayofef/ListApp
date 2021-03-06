import React from 'react';

import { StyledMain, StyledWrapper, StyledFooter } from './styled';
import Header from './Header';
import ErrorBoundary from '../../ErrorBoundary';

function Layout({ children }) {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <Header />
      <StyledMain>
        <StyledWrapper>
          <ErrorBoundary>{children}</ErrorBoundary>
        </StyledWrapper>
      </StyledMain>
      <StyledFooter>List App &copy; {year}</StyledFooter>
    </>
  );
}

export default Layout;
