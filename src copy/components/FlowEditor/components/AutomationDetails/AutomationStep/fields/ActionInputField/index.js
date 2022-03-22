import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import capitalize from '@material-ui/core/utils/capitalize';
import Title from '../../../Title';
import SelectPropertyInput from './SelectPropertyInput';
import TextPropertyInput from './TextPropertyInput';
import EmailMessageInput from './EmailMessageInput';
import ActionInputProvider from './ActionInputProvider';
import LookupInput from './LookupInput';
import UserOrGroupInput from './UserOrGroupInput';
import ConnectionInputField from '../ConnectionInputField';
import SubTitle from '../../../SubTitle';

const INPUTS = {
  EMAIL_MESSAGE: EmailMessageInput,
  ID: SelectPropertyInput,
  LOOKUP: LookupInput,
  USER_OR_GROUP_LIST: UserOrGroupInput,
};

const ActionInputField = ({
  fieldId,
  fieldName,
  fieldType,
  placeholder,
  validationMessage,
  required,
  selectedActionType,
  subTitle,
}) => {
  const { t } = useTranslation();
  const Input = INPUTS[fieldType] || TextPropertyInput;

  return (
    <ActionInputProvider
      fieldId={fieldId}
      fieldName={fieldName}
      fieldType={fieldType}
      placeholder={placeholder}
      validationMessage={validationMessage}
    >
      {fieldType === 'CONNECTION_ID_PAYMENT_GATEWAY' ? (
        <ConnectionInputField />
      ) : (
        <Box component="section">
          <Title display="flex">
            <Box component="span" flexGrow="1">
              {t(capitalize(fieldName?.toLowerCase()) ?? '')}
            </Box>
            {required && (
              <Box component="span" color="#4e40ef">
                *
              </Box>
            )}
          </Title>
          {subTitle && <SubTitle>{t(subTitle)}</SubTitle>}
          <Input selectedActionType={selectedActionType} />
        </Box>
      )}
    </ActionInputProvider>
  );
};

ActionInputField.propTypes = {
  fieldId: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  validationMessage: PropTypes.string,
  required: PropTypes.bool,
  selectedActionType: PropTypes.string,
  subTitle: PropTypes.string,
};

ActionInputField.defaultProps = {
  validationMessage: '',
  required: false,
  selectedActionType: null,
  placeholder: null,
  subTitle: null,
};

export default ActionInputField;
