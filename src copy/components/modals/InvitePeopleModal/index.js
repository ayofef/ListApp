import React from 'react';
import { useTranslation } from 'react-i18next';
import { bool, func } from 'prop-types';
import THEME from '../../../constants/theme';
import InvitePeopleForm from '../../forms/InvitePeopleForm';
import SimpleModal from '../SimpleModal';
import { H3, P14 } from '../../atoms';
import { FormWrapper } from '../../forms/FormWrapper';

const InvitePeopleModal = ({ open, close }) => {
  const { t } = useTranslation();
  return (
    <SimpleModal open={open} handleClose={close} height="543px">
      <FormWrapper fullWidth spaceBetween padding="0" textAlign="left">
        <H3 margin="0 0 10px 0">{t('spendRequest.invitePeople.title')}</H3>
        <P14 margin="0 0 20px 0" color={THEME.greyColors.grey1}>
          {t('spendRequest.invitePeople.description')}
        </P14>
        <InvitePeopleForm handleClose={close} />
      </FormWrapper>
    </SimpleModal>
  );
};

InvitePeopleModal.propTypes = {
  open: bool.isRequired,
  close: func.isRequired,
};

export default InvitePeopleModal;
