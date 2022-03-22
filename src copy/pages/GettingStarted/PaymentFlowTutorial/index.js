import React, { useState, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIosRounded';
import { ButtonRounded, P16, H2 } from '../../../components/atoms';
import { StyledWrapper, StyledCloseButton } from './styled';
import SliderProgress from './SliderProgress';
import TutorialImages from './TutorialImages';
import { TUTORIAL_CONTENT } from './constant';
import { StyledIconButton } from '../../FlowDetailsPage/Header/styled';
import THEME from '../../../constants/theme';
import useCreateFlow from '../../../hooks/useCreateFlow';
import { useNotificationManager } from '../../../hooks/useNotificationManager';

const slideLength = TUTORIAL_CONTENT.length - 1;

const TITLE = 'Flows';

const PaymentFlowTutorial = ({ handleClose }) => {
  const { handleCreateFlow, error } = useCreateFlow();
  const [activeSlide, setActiveSlide] = useState(0);
  const { t } = useTranslation();
  const [opacity, setOpacity] = useState(0);

  useNotificationManager('error', t(error?.message), TITLE);

  const handleChangeSlide = useCallback(
    (state) => {
      setOpacity(0);
      if (activeSlide === slideLength && state === 'next') {
        handleCreateFlow();

        return;
      }

      setActiveSlide((prevState) => (state === 'next' ? prevState + 1 : prevState - 1));
    },
    [activeSlide, handleCreateFlow]
  );

  return (
    <StyledWrapper>
      <Box
        bgcolor="#fff"
        flex="1"
        padding="71px 16px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Box width="400px">
          <SliderProgress length={TUTORIAL_CONTENT.length} activeSlide={activeSlide} />

          <StyledCloseButton onClick={handleClose}>
            <CloseIcon />
          </StyledCloseButton>

          {TUTORIAL_CONTENT && (
            <>
              <H2
                lineHeight="39px"
                fontWeight="700"
                dangerouslySetInnerHTML={{ __html: t(TUTORIAL_CONTENT[activeSlide]?.heading) }} // TODO: rework
              />

              <P16 lineHeight="32px" color="#787F88" margin="16px 0 0 0">
                {t(TUTORIAL_CONTENT[activeSlide]?.description)}
              </P16>
            </>
          )}

          <Box mt="32px" display="flex">
            {activeSlide > 0 && (
              <StyledIconButton
                type="button"
                backgroundColor={THEME.greyColors.grey12}
                activeColor={THEME.greyColors.grey5}
                onClick={() => handleChangeSlide('prev')}
              >
                <ArrowBackIosIcon />
              </StyledIconButton>
            )}

            <ButtonRounded
              ml={activeSlide > 0 ? '8px' : 0}
              type="button"
              color="primary"
              variant="contained"
              onClick={() => handleChangeSlide('next')}
            >
              {t('Continue')}
            </ButtonRounded>
          </Box>
        </Box>
      </Box>
      <Box flex="1.5">
        <TutorialImages activeSlide={activeSlide} opacity={opacity} setOpacity={setOpacity} />
      </Box>
    </StyledWrapper>
  );
};

PaymentFlowTutorial.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default PaymentFlowTutorial;
