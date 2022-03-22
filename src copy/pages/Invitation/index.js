import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import queryString from 'query-string';
import InvitationForm from '../../components/forms/InvitationForm';

import PureLayout from '../../components/layouts/PureLayout';
import PureLayoutBox from '../../components/layouts/PureLayoutBox';
import { useRegistrationStorage } from '../../hooks/registration';
import { ONBOARDING_STATUS } from '../../constants/registration';

const Invitation = ({
  history: {
    location: { search },
  },
}) => {
  const [invitationParams, setInvitationParam] = useState({});
  const [registrationSession, setRegistrationSession] = useRegistrationStorage();

  useEffect(() => {
    const params = queryString.parse(search);

    let inviteToken;
    let inviteEmail;

    if (params?.token && params?.email) {
      inviteEmail = params.email;
      inviteToken = params.token;

      setRegistrationSession({
        [ONBOARDING_STATUS.completeInvitation]: {
          token: params.token,
          email: params.email,
        },
        onboardingStatus: ONBOARDING_STATUS.completeInvitation,
      });
    } else {
      inviteEmail = registrationSession?.[ONBOARDING_STATUS.completeInvitation]?.email;
      inviteToken = registrationSession?.[ONBOARDING_STATUS.completeInvitation]?.token;
    }

    setInvitationParam({
      inviteToken,
      inviteEmail,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <PureLayout>
      <PureLayoutBox>
        <InvitationForm email={invitationParams.inviteEmail} token={invitationParams.inviteToken} />
      </PureLayoutBox>
    </PureLayout>
  );
};

Invitation.propTypes = {
  history: shape({
    location: shape({ search: string }).isRequired,
  }).isRequired,
};

export default Invitation;
