import React from 'react';
import styled from 'styled-components';
import { string, element, func, node } from 'prop-types';
import { Link } from 'react-router-dom';
import THEME from '../../constants/theme';
import { Button, H2, H5, P14, BlockWrap, TextWrap } from '../atoms';
import { FlexContainer } from '../atoms/flex/FlexContainer';

const Wrapper = styled.div`
  padding: ${({ padding }) => padding || '120px 32px'};
  margin: ${({ margin }) => margin || '20px 0'};
  border-radius: 8px;
  border: 1px solid ${THEME.greyColors.grey4};
  text-align: center;
  .link {
    text-decoration: none;
    cursor: pointer;
  }
`;

const IconBoxScreen = ({
  blockTitle,
  mainTitle,
  icon,
  description,
  description2,
  buttonText,
  onButtonClick,
  padding,
  linkText,
  linkUrl,
  iconMargin,
  onLinkClick,
  button,
  ...props
}) => (
  <>
    <H5>{blockTitle}</H5>
    <Wrapper padding={padding} {...props}>
      <FlexContainer width="100%" flexDirection="column">
        <TextWrap maxWidth="533">
          <FlexContainer margin={iconMargin || '0 0 28px 0'}>{icon}</FlexContainer>
          {mainTitle && <H2>{mainTitle}</H2>}
          <BlockWrap margin="16px 0 0 0">
            <P14 color={THEME.greyColors.grey1}>{description}</P14>
            {description2 && <P14 color={THEME.greyColors.grey1}>{description2}</P14>}
          </BlockWrap>
          {buttonText && (
            <BlockWrap margin="40px 0 0 0">
              <Button className="blue" onClick={onButtonClick} smaller>
                {buttonText}
              </Button>
            </BlockWrap>
          )}
          {!onLinkClick && linkText && (
            <BlockWrap margin="40px 0 0 0">
              <Link to={linkUrl} className="link">
                <P14 color={THEME.secondaryColors.blue}>{linkText}</P14>
              </Link>
            </BlockWrap>
          )}
          <BlockWrap margin="20px 0 0 0">{button}</BlockWrap>
          {onLinkClick && linkText && (
            <BlockWrap margin="40px 0 0 0">
              <P14 onClick={onLinkClick} className="link" color={THEME.secondaryColors.blue}>
                {linkText}
              </P14>
            </BlockWrap>
          )}
        </TextWrap>
      </FlexContainer>
    </Wrapper>
  </>
);

IconBoxScreen.propTypes = {
  blockTitle: string,
  mainTitle: string,
  icon: element,
  description: string.isRequired,
  description2: string,
  onButtonClick: func,
  buttonText: string,
  padding: string,
  linkText: string,
  linkUrl: string,
  iconMargin: string,
  onLinkClick: func,
  button: node,
};

IconBoxScreen.defaultProps = {
  blockTitle: '',
  mainTitle: '',
  onButtonClick: () => false,
  buttonText: '',
  padding: '',
  linkText: '',
  linkUrl: '',
  iconMargin: '',
  description2: '',
  onLinkClick: null,
  button: <i />,
  icon: null,
};

export default IconBoxScreen;
