import React, { useCallback } from 'react';
import { number } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { P14, P14B, ButtonRounded } from '../../../components/atoms';
import { L12B } from '../../../components/atoms/Typography/L12B';
import { StyledIntroSection, Block, ImageContainer, StarIcon, ContactContainer, RemainingDays } from './styled';
import Calendar from '../../../assets/icons/Calendar';
import THEME from '../../../constants/theme';
import OnboardingSpecialistAvatar from '../../../assets/img/onboarding-specialist.png';
import { useGlobalContext } from '../../../containers/App/context';
import Star from '../../../assets/icons/GettingStarted/star';
import CircularProgressBar from '../CircularProgressBar';
import { MessageBubble } from '../../../assets/icons';

const CALENDLY_URL = process.env.REACT_APP_CALENDLY_URL;
const DEFAULT_TRIAL_DAYS = 30;

const IntroSection = ({ remainingTrialDays }) => {
  const { t } = useTranslation();
  const { toggleIntercom } = useGlobalContext();

  const handleIntercom = useCallback(() => {
    toggleIntercom();
  }, [toggleIntercom]);

  //transform to a scale of 10
  const progress = 10 - (remainingTrialDays / DEFAULT_TRIAL_DAYS) * 10;

  return (
    <StyledIntroSection>
      <Block>
        <ImageContainer>
          <img className="onboarding-specialist-img" src={OnboardingSpecialistAvatar} alt="WhenThen Automator" />
          <StarIcon>
            <Star />
          </StarIcon>
        </ImageContainer>
        <div>
          <P14B>Kirk</P14B>
          <P14 color={THEME.greyColors.grey1} noHover>
            {t('WhenThen PayGeek')}
          </P14>
        </div>
        <ContactContainer>
          <div className="contact-option">
            <MessageBubble fill={THEME.primaryColors.blue} />
            <ButtonRounded fontWeight="500" color="primary" variant="text" ml="5px" onClick={handleIntercom}>
              {t('Contact')}
            </ButtonRounded>
          </div>

          <div className="contact-option">
            <Calendar stroke={THEME.primaryColors.blue} />
            <ButtonRounded
              component="a"
              variant="text"
              color="primary"
              fontWeight="500"
              ml="5px"
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              {t('Schedule call')}
            </ButtonRounded>
          </div>
        </ContactContainer>
      </Block>

      <Block alignItems="flex-start">
        <RemainingDays>
          <CircularProgressBar progress={progress} />
          <div className="text">
            <L12B>{remainingTrialDays}</L12B>
            <span className="days">{t('Days')}</span>
          </div>
        </RemainingDays>

        <div>
          <P14B margin="0 0 4px 0">{t('Free onboarding support remaining')}</P14B>
          <P14 color={THEME.greyColors.grey1} noHover>
            {t(
              `You have ${remainingTrialDays} days remaining in your trial. Book time with a WhenThen PayGeek before your trial ends.`
            )}
          </P14>
        </div>
      </Block>
    </StyledIntroSection>
  );
};

IntroSection.propTypes = {
  remainingTrialDays: number.isRequired,
};
export default IntroSection;
