import React, { useState } from 'react';
import { shape, func, string } from 'prop-types';
import { withFormik, FieldArray } from 'formik';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { NotificationManager } from 'react-notifications';
import invitePeopleSchema, { invitePeopleFields } from '../../../utils/schemas/invitePeopleSchema';
import { FieldsWrapper, FieldRow } from '../formStyles';
import { InputField, Button, MaterialIconStyler, BlockWrap, L12 } from '../../atoms';
import THEME from '../../../constants/theme';
import { useInviteUser } from '../../../hooks/userHooks';
import { useGlobalContext } from '../../../containers/App/context';
import useSetCustomerMetadata from '../../../hooks/useSetCustomerMetadata';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const InvitePeopleForm = ({ values, errors, handleChange, handleBlur, buttonText, handleClose }) => {
  const [showErrors, setShowErrors] = useState(false);
  const [isSuccesShowed, setIsSuccessShowed] = useState(false);
  const { t } = useTranslation();
  const [inviteUser, { loading }] = useInviteUser();
  const { stepsCheckListMeta } = useGlobalContext();
  const { setMetadata } = useSetCustomerMetadata();

  const handleSubmit = () => {
    if (!isEmpty(errors)) {
      setShowErrors(true);
    } else {
      values.team_members.forEach(({ email, name }) => {
        if (!isEmpty(email)) {
          inviteUser({
            variables: {
              companyRole: 'USER',
              email,
              name,
              teamRole: 'USER',
            },
          }).then((res) => {
            if (res && !res.errors) {
              if (!isSuccesShowed) {
                NotificationManager.success(t('uiMessages.successMessage'), t('uiMessages.success'), 5000);
                setIsSuccessShowed(true);
                if (!stepsCheckListMeta.collegues) {
                  setMetadata({ checklist: { ...stepsCheckListMeta, collegues: true } });
                }
              }
              handleClose();
            }
          });
        }
      });
    }
  };

  const onChange = (e) => {
    setShowErrors(false);
    handleChange(e);
  };

  const showTeamMembersErrors = (index, field) =>
    showErrors && errors.team_members && errors.team_members[index] && errors.team_members[index][field];
  return (
    <>
      <FieldArray
        name="team_members"
        render={({ push, remove }) => (
          <>
            {values.team_members.map((member, index) => (
              <FieldsWrapper key={`member-${member?.email}`}>
                <FlexContainer justifyContent="flex-start" alignItems="flex-start">
                  {invitePeopleFields.map(({ field, type, label }) => (
                    <BlockWrap flex="1" width="100%" key={field} margin="0 24px 0 0">
                      <FieldRow>
                        <InputField
                          variant="outlined"
                          autoFocus={(field === 'email' && index === 0) || false}
                          type={type || 'text'}
                          key={field}
                          name={`team_members[${index}].${field}`}
                          label={label}
                          value={member[field]}
                          onChange={onChange}
                          onBlur={handleBlur}
                        />
                        {showTeamMembersErrors(index, field) && (
                          <L12 margin="0" color={THEME.secondaryColors.danger}>
                            {errors.team_members[index][field]}
                          </L12>
                        )}
                      </FieldRow>
                    </BlockWrap>
                  ))}
                  <BlockWrap margin="28px 0 0 0">
                    <MaterialIconStyler
                      icon={CloseIcon}
                      cursor="pointer"
                      onClick={() => index !== 0 && remove(index)}
                    />
                  </BlockWrap>
                </FlexContainer>
              </FieldsWrapper>
            ))}
            <FlexContainer
              onClick={() => push({ email: '', name: '' })}
              justifyContent="flex-start"
              cursor="pointer"
              margin="30px 0 10px"
            >
              <FlexContainer justifyContent="flex-start" margin="0 6px 0 0">
                <AddCircleOutlineIcon />
              </FlexContainer>
              {t('buttonsText.AddAnother')}
            </FlexContainer>
          </>
        )}
      />
      <FlexContainer margin="20px 0 0 0" justifyContent="flex-start">
        <Button
          disabled={isEmpty(values.team_members[0].email)}
          margin="0 0 0 0"
          onClick={handleSubmit}
          loading={loading}
          className="blue"
        >
          {buttonText || t('buttonsText.Invite')}
        </Button>
      </FlexContainer>
    </>
  );
};

InvitePeopleForm.propTypes = {
  values: shape({}).isRequired,
  errors: shape({}).isRequired,
  handleChange: func.isRequired,
  handleBlur: func.isRequired,
  buttonText: string,
  handleClose: func.isRequired,
};

InvitePeopleForm.defaultProps = {
  buttonText: '',
};

export default withRouter(withFormik(invitePeopleSchema)(InvitePeopleForm));
