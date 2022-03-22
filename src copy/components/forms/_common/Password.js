import React, { useCallback, useMemo, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import styled from 'styled-components';
import pick from 'lodash/pick';
import VisibilityOffIcon from '../../../assets/icons/VisibilityOffIcon';
import VisibilityIcon from '../../../assets/icons/VisibilityIcon';
import { UI_ROUTES } from '../../../constants/routes';
import THEME from '../../../constants/theme';
import { StyledPasswordVisibilityButton } from './styled';

import { InputField, MaterialIconStyler, L12, StyledMaterialLink } from '../../atoms';
import { MESSAGES } from '../../../utils/validators/passwordValidator';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const Error = styled(L12)`
  margin-top: 8px;
  margin-bottom: 14px;
  font-weight: 500;

  & + & {
    margin-top: 0;
  }
`;

const messages = Object.values(pick(MESSAGES, ['required', 'emailEqual']));

const Password = ({ name, label, animateLabel, forgotPassword, signIn, getMeLoading, loading }) => {
  const [isMasked, setMasked] = useState(true);
  const { isSubmitting } = useFormikContext();
  const [{ value, onChange, onBlur }, { touched, error }] = useField(name);
  const toggleIsMasked = useCallback(() => {
    setMasked((prev) => !prev);
  }, []);
  const { t } = useTranslation();

  const messageData = useMemo(
    () => error?.filter((message) => (signIn ? messages.includes(message) : !messages.includes(message))) || [],
    [error, signIn]
  );

  return (
    <Box>
      {!animateLabel && (
        <FlexContainer justifyContent="space-between">
          <L12 textAlign="left" fontWeight={600}>
            {t(label)}
          </L12>
          {forgotPassword && (
            <StyledMaterialLink
              to={UI_ROUTES.forgotPassword}
              textDecoration="none"
              background={THEME.gradient}
              backgroundClip="text"
              textFill="transparent"
              margin="0 0 0 6px"
              color="transparent"
              cursor="pointer"
            >
              {t('signInForm.forgotPassword')}
            </StyledMaterialLink>
          )}
        </FlexContainer>
      )}
      <InputField
        variant="outlined"
        type={isMasked ? 'password' : 'text'}
        autoComplete="new-password"
        name={name}
        label={animateLabel ? t(label) : ''}
        value={value}
        placeholder={animateLabel ? '' : t(label)}
        InputProps={{
          endAdornment: (
            <StyledPasswordVisibilityButton onClick={toggleIsMasked} type="button">
              <MaterialIconStyler
                icon={isMasked ? VisibilityIcon : VisibilityOffIcon}
                cursor="pointer"
                width="20px"
                height="20px"
              />
            </StyledPasswordVisibilityButton>
          ),
        }}
        disabled={getMeLoading || loading || isSubmitting}
        onChange={onChange}
        onBlur={onBlur}
      />
      {touched && messageData?.length > 0 && (
        <Error key={messageData[0]} data-cy="error" color={THEME.secondaryColors.danger}>
          {messageData[0]}
        </Error>
      )}
    </Box>
  );
};

Password.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  animateLabel: PropTypes.bool,
  forgotPassword: PropTypes.bool,
  signIn: PropTypes.bool,
  loading: PropTypes.bool,
  getMeLoading: PropTypes.bool,
};

Password.defaultProps = {
  animateLabel: false,
  forgotPassword: false,
  signIn: false,
  label: '',
  loading: false,
  getMeLoading: false,
};

export default Password;
