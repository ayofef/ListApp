import React, { useMemo } from 'react';
import styled from 'styled-components';
import { string, bool } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../atoms/Buttons/Button';
import { useGlobalContext } from '../../containers/App/context';
import { UI_ROUTES } from '../../constants/routes';
import { LogoutButtonCover } from '../../pages/PlanSelection/styled';
import { FlexContainer } from '../atoms/flex/FlexContainer';

const Wrapper = styled(FlexContainer)`
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  width: ${({ width }) => width || '100%'};
  background: ${({ backgroundColor }) => backgroundColor};
  padding: ${({ padding }) => padding};
  overflow: hidden;
  position: relative;
`;

const unloginedRoutes = [UI_ROUTES.signIn, UI_ROUTES.signUp, UI_ROUTES.signUpPersonalDetails, UI_ROUTES.forgotPassword];

const ScreenBody = styled.div`
  height: 100%;
  background: ${({ backImg }) => backImg || 'transparent'};
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  width: calc(100% - 592px);
  min-width: 50vw;
  top: 0;
  right: 0;
  padding: 60px;
  box-sizing: border-box;

  img,
  svg {
    display: block;
    width: 100%;
    height: auto;
    max-height: 100%;
    max-width: 800px;
    border-radius: 8px;
    overflow: hidden;
    object-fit: contain;
  }
`;

const InfoScreen = ({ children, isModal, backgroundColor, height, padding, width, ...restProps }) => {
  const { logOut } = useGlobalContext();
  const history = useHistory();
  const { t } = useTranslation();

  const hasLogout = useMemo(() => !unloginedRoutes.some((route) => route === history.location.pathname), [history]);
  return (
    <Wrapper isModal={isModal} backgroundColor={backgroundColor} padding={padding} width={width} {...restProps}>
      {hasLogout && (
        <LogoutButtonCover>
          <Button
            color="#fff"
            background="#000074"
            onClick={logOut}
            smaller
            className="ghost"
            margin="0 22px 0 0"
            white
          >
            {t('Log out')}
          </Button>
        </LogoutButtonCover>
      )}

      <ScreenBody className={children && children.props.className}>{children}</ScreenBody>
    </Wrapper>
  );
};

InfoScreen.propTypes = {
  backgroundColor: string.isRequired,
  isModal: bool.isRequired,
  height: string,
  padding: string,
  width: string,
};

InfoScreen.defaultProps = {
  height: '100',
  padding: '60px',
  width: 'auto',
};

export default InfoScreen;
