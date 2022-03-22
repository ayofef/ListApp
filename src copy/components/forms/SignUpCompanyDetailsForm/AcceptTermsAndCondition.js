import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import isEmpty from 'lodash/isEmpty';

import { useFormStyle } from '../formStyles';
import THEME from '../../../constants/theme';
import { LinkWrapper, L12, Checkbox } from '../../atoms';
import { UI_ROUTES } from '../../../constants/routes';

const ACCEPT_TC_LINK_PROPS = {
  noUnderline: true,
  target: '_blank',
  rel: 'noopener noreferrer',
};

const AcceptTermsAndCondition = ({ name }) => {
  const [{ value }, { touched, error }, { setValue }] = useField(name);
  const { t } = useTranslation();
  const classes = useFormStyle();

  const handleOnChange = () => {
    setValue(!value, true);
  };

  return (
    <>
      <FormControlLabel
        classes={classes}
        control={
          <Box mr="16px" ml="8px">
            <Checkbox
              transform="scale(1.5) translateX(-0.4px)"
              width="24px"
              height="24px"
              name={name}
              checked={value}
              onChange={handleOnChange}
            />
          </Box>
        }
        label={
          <L12 display="inline">
            {t("I accept WhenThen's")}{' '}
            <LinkWrapper href={UI_ROUTES.pilotAgreement} {...ACCEPT_TC_LINK_PROPS}>
              <span>{t('Pilot Agreement')}</span>
            </LinkWrapper>
            ,{' '}
            <LinkWrapper href={UI_ROUTES.termsOfService} {...ACCEPT_TC_LINK_PROPS}>
              <span>{t('Terms of Service')}</span>
            </LinkWrapper>{' '}
            and{' '}
            <LinkWrapper href={UI_ROUTES.policyNotice} {...ACCEPT_TC_LINK_PROPS}>
              <span>{t('Privacy Statement')}</span>
            </LinkWrapper>
            .
          </L12>
        }
        onKeyPress={handleOnChange}
      />
      {touched &&
        !isEmpty(error) &&
        error?.map((message) => (
          <L12
            key={message}
            data-cy="error"
            fontWeight="500"
            margin="6px 0 10px 44px"
            color={THEME.secondaryColors.danger}
          >
            {t(message)}
          </L12>
        ))}
    </>
  );
};

AcceptTermsAndCondition.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AcceptTermsAndCondition;
