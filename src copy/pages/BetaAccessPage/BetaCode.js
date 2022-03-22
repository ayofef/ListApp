import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useBetaAccess from './betaAccessHook';
import ChevronRight from '../../assets/img/arrows/chevron-right-primary.svg';
import OtpBlock from '../../components/common/OtpBlock';
import { P16, BlockWrap } from '../../components/atoms';
import THEME from '../../constants/theme';
import { JoinComunityBlock } from './styled';

const DESCRIPTION =
  "Thank you for registering, we're in private beta at the moment and a member of the WhenThen team will be in touch to give you a beta code.";

const COMMUNITY = 'Join the community';

const BetaCode = ({ toggleCommunityModal }) => {
  const { t } = useTranslation();
  const { handleSubmit, loading, pass, setPass } = useBetaAccess();

  return (
    <div>
      <h1>Private beta</h1>
      <P16 color={THEME.greyColors.grey1}>{t(DESCRIPTION)}</P16>
      <BlockWrap margin="40px 0 0 0">
        <OtpBlock
          pass={pass}
          setPass={setPass}
          numInputs={4}
          loading={loading}
          submitFunc={handleSubmit}
          resetButtonPosition={null}
        />
      </BlockWrap>
      <JoinComunityBlock>
        <div onClick={toggleCommunityModal}>
          {t(COMMUNITY)}
          <img src={ChevronRight} alt="" />
        </div>
      </JoinComunityBlock>
    </div>
  );
};

BetaCode.propTypes = {
  toggleCommunityModal: PropTypes.func.isRequired,
};

export default BetaCode;
