import React from 'react';
import Box from '@material-ui/core/Box';
import { string, bool, node } from 'prop-types';
import { useWindowSize } from 'react-use';
import styled from 'styled-components';
import { LayoutWrapper } from './styled';
import THEME from '../../../constants/theme';
import InfoScreen from '../../common/InfoScreen';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const Wrapper = styled(FlexContainer)`
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background: ${({ backgroundColor }) => backgroundColor};
  padding: ${({ padding }) => padding};
`;

const CustomLayout = ({ children, isModal, withInfoScreen, backgroundColor, image, fullPage, ...restProps }) => {
  const { width } = useWindowSize();
  return (
    <LayoutWrapper {...restProps}>
      <Box alignSelf="center">{children}</Box>
      {width > THEME.breakPoints.tablet && !fullPage && withInfoScreen ? (
        <Wrapper isModal={isModal} backgroundColor={backgroundColor}>
          {image}
        </Wrapper>
      ) : (
        <InfoScreen isModal={isModal} backgroundColor={backgroundColor}>
          {image}
        </InfoScreen>
      )}
    </LayoutWrapper>
  );
};

CustomLayout.propTypes = {
  backgroundColor: string,
  isModal: bool,
  withInfoScreen: bool,
  fullPage: bool,
  image: node,
  children: node.isRequired,
};

CustomLayout.defaultProps = {
  backgroundColor: THEME.secondaryColors.yellow,
  isModal: false,
  withInfoScreen: false,
  fullPage: false,
  image: null,
};

export default CustomLayout;
