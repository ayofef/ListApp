import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import capitalize from '@material-ui/core/utils/capitalize';
import { FieldArray, useFormikContext, Field } from 'formik';
import isEmpty from 'lodash/isEmpty';
import AddIcon from '@material-ui/icons/Add';
import { inviteFieldNames } from './fieldsSettings';
import { P, ButtonRounded } from '../atoms';
import InputField from './InputField';
import { Error } from '../forms/_common/Input';
import THEME from '../../constants/theme';

const error = (errors) => {
  const unique = [...new Set(Object.values(errors).flat())][0];

  if (unique.includes(']')) {
    return unique.split(']')[1]?.trim();
  }
  return unique?.trim();
};

const MultiEmailInput = () => {
  const { values, dirty, errors } = useFormikContext();
  const { t } = useTranslation();

  return (
    <Box>
      <P fontSize="12px" fontWeight={600} width="100%" textAlign="left" lineHeight="30px">
        {t('Email address')}
      </P>

      <FieldArray
        name={inviteFieldNames.emails}
        render={(arrayHelpers) => (
          <div>
            {values[inviteFieldNames.emails].map((field, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Field key={index} name={`${inviteFieldNames.emails}.${index}`} component={InputField} />
            ))}

            {dirty && !isEmpty(errors) && (
              <Box>
                <Error color={THEME.secondaryColors.danger}>{capitalize(t(error(errors)) ?? '')}</Error>
              </Box>
            )}

            {values[inviteFieldNames.emails]?.length < 5 && (
              <ButtonRounded type="button" variant="text" color="secondary" onClick={() => arrayHelpers.push('')}>
                <Box display="flex" ml="-8px">
                  <Box component="i" mr="8px">
                    <AddIcon color="inherit" fontSize="small" />
                  </Box>
                  {t('Add another')}
                </Box>
              </ButtonRounded>
            )}
          </div>
        )}
      />
    </Box>
  );
};

export default MultiEmailInput;
