import Chat from '../../../../assets/icons/Profile/Chat';
import Phone from '../../../../assets/icons/Profile/Phone';

const MFA_TYPE = {
  sms: 'SMS',
  authenticatorApp: 'AUTHENTICATOR_APP',
};

const TWO_STEP_AUTH = [
  {
    type: MFA_TYPE.sms,
    icon: Chat,
    text: 'Text Message',
  },
  {
    type: MFA_TYPE.authenticatorApp,
    icon: Phone,
    text: 'Authenticator App',
  },
];

export { MFA_TYPE, TWO_STEP_AUTH };
