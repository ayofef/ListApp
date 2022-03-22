import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DoneIcon from '@material-ui/icons/Done';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import queryString from 'query-string';
import CustomLayout from '../../components/layouts/CustomLayout';
import THEME from '../../constants/theme';
import {
  Button,
  Circle,
  Logo,
  SlackButton,
  ColorProvider,
  H1,
  P16,
  P14,
  BorderWrapper,
  StyledBgImage,
  BlockWrap,
  LinkWrapper,
} from '../../components/atoms';
import useAddToSlackUrl from '../../hooks/useAddToSlackUrl';
import BackgroundImage from '../../assets/img/addToSlack2.svg';
import SlackIcon from '../../assets/img/slack.svg';
import { GET_CONNECTIONS_INFO } from '../../utils/queries/public/publicQueries';
import { UI_ROUTES } from '../../constants/routes';
import StepIndicator from '../../components/common/StepIndicator';
import useSetCustomerMetadata from '../../hooks/useSetCustomerMetadata';
import { localStorageService } from '../../utils/localStorageService';
import { STORAGE_KEYS } from '../../constants/storage';
import { StyledImage } from '../../components/styled/StyledImage';
import { FlexContainer } from '../../components/atoms/flex/FlexContainer';
import { LeftSideFormWrapper } from '../../components/forms/LeftSideFormWrapper';

const AddToSlack = () => {
  const { t } = useTranslation();
  const { history } = useHistory();
  const addToSlackUrl = useAddToSlackUrl();
  const {
    push,
    location: { search, state },
  } = history;

  const params = queryString.parse(search);
  const isSkiped = localStorageService.getItem(STORAGE_KEYS.skipSlack) === 'set';

  const isConfigured = !!params.success;
  const { data, loading } = useQuery(GET_CONNECTIONS_INFO, {
    skip: isConfigured,
  });
  const { setMetadata } = useSetCustomerMetadata();

  useEffect(() => {
    if ((!isConfigured && !loading && data?.slackbotAdded) || (isSkiped && !state?.addToSlack)) {
      localStorageService.setItem(STORAGE_KEYS.skipSlack, 'set');
      setMetadata({ skipSlack: true });
      push(UI_ROUTES.root);
    }
  }, [data, loading, isSkiped, push, isConfigured, setMetadata, state]);

  const continueHandler = () => {
    localStorageService.setItem(STORAGE_KEYS.skipSlack, 'set');
    setMetadata({ skipSlack: true });
    push(UI_ROUTES.root);
  };

  const listColor = isConfigured ? THEME.secondaryColors.pink : THEME.primaryColors.black;
  const slackTexts = [
    t('configureSlack.listItems.1'),
    t('configureSlack.listItems.2'),
    t('configureSlack.listItems.3'),
  ];
  return (
    <CustomLayout
      image={<StyledBgImage src={BackgroundImage} alt="invite" />}
      backgroundColor={THEME.designerColors.red}
    >
      <LeftSideFormWrapper spaceBetween>
        <Logo />
        <StepIndicator stepsCount={3} currentStep={2} justifyContent="flex-start" />
        <div>
          <H1 margin="60px 0 32px 0">{t('configureSlack.title')}</H1>
          <P16 margin="30px 0" color={THEME.greyColors.grey1}>
            {t('configureSlack.description')}
          </P16>
          <FlexContainer flexDirection="column" alignItems="flex-start">
            {slackTexts.map((text) => (
              <FlexContainer inline margin="0 0 12px">
                <BlockWrap margin="0 15px 0 0">
                  <ColorProvider color={listColor}>
                    <DoneIcon />
                  </ColorProvider>
                </BlockWrap>
                <P16>{text}</P16>
              </FlexContainer>
            ))}
          </FlexContainer>
          {isConfigured ? (
            <>
              <BorderWrapper margin="40px 0 0" fullWidth maxWidth="376px" padding="16px">
                <FlexContainer width="100%" justifyContent="flex-start">
                  <Circle size="32px">
                    <StyledImage src={SlackIcon} alt="" maxWidth="18px" />
                  </Circle>
                  <P16 margin="0 0 0 16px">Slack was successfully configured.</P16>
                  <ColorProvider margin="0 0 0 auto" color={THEME.secondaryColors.teal}>
                    <DoneIcon />
                  </ColorProvider>
                </FlexContainer>
              </BorderWrapper>
              <BlockWrap margin="auto 0 0">
                <Button
                  ghost={!isConfigured}
                  margin="40px 0 0"
                  className={isConfigured && 'blue'}
                  onClick={() => continueHandler()}
                >
                  {t('buttonsText.Continue')}
                  <ArrowForwardIcon />
                </Button>
              </BlockWrap>
            </>
          ) : (
            <FlexContainer alignItems="center" justifyContent="flex-start" margin="40px 0 32px">
              <BlockWrap margin="0 20px 0 0">
                <SlackButton url={`${addToSlackUrl}&state=${UI_ROUTES.addBillingCard}`}>
                  <P14>
                    Add to <strong>Slack</strong>
                  </P14>
                </SlackButton>
              </BlockWrap>
              <LinkWrapper className="blue" display="inline" onClick={() => continueHandler()}>
                {t('buttonsText.SkipForNow')}
              </LinkWrapper>
            </FlexContainer>
          )}
        </div>
      </LeftSideFormWrapper>
    </CustomLayout>
  );
};

export default AddToSlack;
