import PropTypes from 'prop-types';
import React, { useLayoutEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

import { useRouteMatch } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { StyledButton } from './styled';
import { CloseIcon } from '../../../../assets/icons';

const Button = ({ handleClick, show, isFlowDetails, customStyles }) => {
  return (
    <StyledButton
      onClick={handleClick}
      show={show}
      {...(isFlowDetails && { top: 'calc(100vh - 615px)' })}
      {...(customStyles && customStyles)}
    >
      <CloseIcon stroke="#fff" />
    </StyledButton>
  );
};

Button.propTypes = {
  customStyles: PropTypes.shape({}).isRequired,
  handleClick: PropTypes.func.isRequired,
  isFlowDetails: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
};

const INTERCOM_CLASS_NAME = 'intercom-messenger-frame';
const CUSTOM_BUTTON_ID = 'wt-custom-intercom-button';
const effectDelay = 100;

const CloseIntercom = ({ intercomCloseButton, toggleIntercom }) => {
  const [isValid, setIsValid] = useState(false);
  const isFlowDetails = !!useRouteMatch('/flows/:id/details/');

  const handleClick = useCallback(() => {
    toggleIntercom();
  }, [toggleIntercom]);

  useLayoutEffect(() => {
    setTimeout(() => {
      const intercomElement = document.getElementsByClassName(INTERCOM_CLASS_NAME)[0];
      if (!isEmpty(intercomElement)) {
        setIsValid(true);
        const customElement = document.createElement('div');
        customElement.id = CUSTOM_BUTTON_ID;
        intercomElement.appendChild(customElement);

        ReactDOM.render(
          React.createElement(
            'div',
            {},
            <Button
              handleClick={handleClick}
              show={intercomCloseButton}
              isFlowDetails={false}
              customStyles={{ right: '12px', top: '12px' }}
            />
          ),
          document.getElementById(CUSTOM_BUTTON_ID)
        );
      }
    }, effectDelay);

    return () => {
      const intercomElement = document.getElementsByClassName(INTERCOM_CLASS_NAME)[0];
      const createdButton = document.getElementById(CUSTOM_BUTTON_ID);
      if (!isEmpty(createdButton)) {
        intercomElement?.removeChild?.(createdButton);
      }
    };
  }, [setIsValid, handleClick, isValid, intercomCloseButton, isFlowDetails]);

  if (isValid) {
    //button is appended to the container
    return null;
  }

  return (
    <Button
      handleClick={handleClick}
      show={intercomCloseButton}
      isFlowDetails={isFlowDetails && !isValid}
      customStyles={{}}
    />
  );
};

CloseIntercom.propTypes = {
  intercomCloseButton: PropTypes.bool.isRequired,
  toggleIntercom: PropTypes.func.isRequired,
};

export default CloseIntercom;
