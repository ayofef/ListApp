import React from 'react';
import { string, bool, node, number } from 'prop-types';
import { LayoutWrapper, Header, Content } from './styled';
import { Button } from '../../atoms';
import THEME from '../../../constants/theme';
import { useGlobalContext } from '../../../containers/App/context';

const PureLayout = ({ children, theme, signupStepIndicator, backgroundColor, image, fullPage, ...restProps }) => {
  const { logOut, isLogin } = useGlobalContext();

  return (
    <LayoutWrapper {...restProps} theme={theme}>
      <Header>
        {isLogin && (
          <Button className="blue small" onClick={() => logOut()}>
            Logout
          </Button>
        )}
      </Header>
      <Content>{children}</Content>
    </LayoutWrapper>
  );
};

PureLayout.propTypes = {
  backgroundColor: string,
  theme: string,
  signupStepIndicator: number,
  fullPage: bool,
  image: node,
  children: node.isRequired,
};

PureLayout.defaultProps = {
  backgroundColor: THEME.secondaryColors.yellow,
  theme: 'light',
  signupStepIndicator: -1,
  fullPage: false,
  image: null,
};

export default PureLayout;
