import React from 'react';
import PropTypes from 'prop-types';
import WhiteClose from '../../assets/img/icons/white-close.svg';
import CircleGradientStar from '../../assets/img/icons/circle-gradient-star.svg';
import CommunityBadge from '../../assets/img/p-badge.svg';
import WhiteSlack from '../../assets/img/icons/white-slack.svg';
import WhiteTwitter from '../../assets/img/icons/white-twitter.svg';
// import WhiteMail from '../../assets/img/icons/white-mail.svg';

import {
  CommunityModalBox,
  CommunityModalWrapper,
  CommunityModalBackdrop,
  CommunityModalSpacer,
  CommunityModalCloser,
  CommunityModalHeader,
  DividerLine,
} from './styled';

const CommunityModal = ({ toggleCommunityModal }) => {
  return (
    <CommunityModalWrapper>
      <CommunityModalBackdrop onClick={toggleCommunityModal} />
      <CommunityModalSpacer />
      <CommunityModalBox>
        <CommunityModalCloser
          onClick={toggleCommunityModal}
          onKeyDown={toggleCommunityModal}
          type="button"
          tabIndex={0}
        >
          <img src={WhiteClose} alt="" />
        </CommunityModalCloser>
        <CommunityModalHeader>
          <img src={CircleGradientStar} alt="" />
          <img src={CommunityBadge} alt="" />
        </CommunityModalHeader>
        <h2 className="h3">
          Join the
          <br /> community
        </h2>
        <p>
          We’d love to have you in our community.
          <br />
          Click on the links below to connect with fellow payments professionals.
        </p>

        <a href="https://swegr7b6gsn.typeform.com/to/t9khGJnC" target="_blank" rel="noopener noreferrer">
          <span>Join WhenThen Slack</span>
          <img src={WhiteSlack} alt="" />
        </a>
        <DividerLine />
        <a href="https://twitter.com/whenthenhq" target="_blank" rel="noopener noreferrer">
          <span>Join the conversation on Twitter</span>
          <img src={WhiteTwitter} alt="" />
        </a>
        {/* <DividerLine />
      <a href="https://swegr7b6gsn.typeform.com/to/t9khGJnC" target="_blank" rel="noopener noreferrer">
        <span>Subscribe to our newsletter</span>
        <img src={WhiteMail} alt="" />
      </a> */}
      </CommunityModalBox>
      <CommunityModalSpacer />
    </CommunityModalWrapper>
  );
};

CommunityModal.propTypes = {
  toggleCommunityModal: PropTypes.func.isRequired,
};

export default CommunityModal;
