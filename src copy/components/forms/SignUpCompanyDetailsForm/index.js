import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import { Form } from 'formik';
import { bool } from 'prop-types';

import { BlockWrap } from '../../atoms';
import { confirmDetailsFields, confirmDetailsNames } from '../../../utils/schemas/confirmDetailsSchema';
import CustomSelect from './CustomSelect';
import { FieldsWrapper } from '../formStyles';
import Input from '../_common/Input';
import { SELECT_OPTIONS, CUSTOM_SELECT_PROPS } from './consts';
import SubmitButton from '../_common/SubmitButton';
import { isDefined } from '../../../utils/helpers';
import SelectWithOthers from './SelectWithOthers';
import AcceptTermsAndCondition from './AcceptTermsAndCondition';
import AcceptNewsletter from './AcceptNewsletter';

const COMPONENTS_MAP = {
  [confirmDetailsNames.companyName]: Input,
  [confirmDetailsNames.companySize]: CustomSelect,
  [confirmDetailsNames.currency]: CustomSelect,
  [confirmDetailsNames.paymentNeeds]: SelectWithOthers,
  [confirmDetailsNames.paymentProcessors]: SelectWithOthers,
};

const COMPONENTS_PROPS_MAP = {
  [confirmDetailsNames.companyName]: { customLabel: true },
  [confirmDetailsNames.companySize]: {},
  [confirmDetailsNames.currency]: {},
  [confirmDetailsNames.paymentNeeds]: {},
  [confirmDetailsNames.paymentProcessors]: {},
};

const SignUpCompanyDetailsForm = ({ loading }) => {
  const { t } = useTranslation();

  return (
    <>
      <h1>
        {t('Company')}
        <br />
        {t('details')}
      </h1>
      <BlockWrap margin="37px 0 0">
        <FieldsWrapper>
          <Form>
            {confirmDetailsFields.map(({ field, type, label, ...rest }, index) => {
              const Component = COMPONENTS_MAP[field] || Input;
              const addCustomMargin = field === confirmDetailsNames.companySize;

              return (
                <Component
                  key={field}
                  name={field}
                  {...(isDefined(SELECT_OPTIONS[field]) && { options: SELECT_OPTIONS[field], ...CUSTOM_SELECT_PROPS })}
                  type={type}
                  label={label}
                  index={index}
                  {...COMPONENTS_PROPS_MAP[field]}
                  {...rest}
                  {...(addCustomMargin && {
                    margin: '12px 0 0 0',
                    errorProps: {
                      margin: '6px 0 14px 0',
                    },
                  })}
                />
              );
            })}

            <Box mt="12px">
              <SubmitButton
                type="submit"
                likeDisabled={loading}
                className="gradient"
                margin="28px 0 0 0"
                data-cy="submit"
                disabled={loading}
                isLoading={loading}
              >
                {t('common.continueText')}
              </SubmitButton>
            </Box>

            <AcceptTermsAndCondition name={confirmDetailsNames.acceptedTC} />

            <AcceptNewsletter name={confirmDetailsNames.acceptedNewsletter} />
          </Form>
        </FieldsWrapper>
      </BlockWrap>
    </>
  );
};

SignUpCompanyDetailsForm.propTypes = { loading: bool };

SignUpCompanyDetailsForm.defaultProps = { loading: false };

export default SignUpCompanyDetailsForm;
