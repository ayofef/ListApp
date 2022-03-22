import React from 'react';
import { string, func } from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { P14, ButtonRounded } from '../../../../components/atoms';
import { StyledWrapper } from '../styled';
import { TempH4 } from '../../../../components/atoms/Typography/H4';

const NewAutomationItem = ({ title, subTitle, buttonText, buttonAction, ImageComponent }) => {
  const { t } = useTranslation();
  return (
    <StyledWrapper>
      <Box maxWidth="264px" textAlign="center">
        <Box minHeight="120px" display="flex" justifyContent="center" alignItems="center">
          <ImageComponent />
        </Box>
        <Box mb="16px">
          <TempH4 fontSize="20px" lineHeight="">
            {t(title)}
          </TempH4>
        </Box>
        <Box mb="16px">
          <P14 mb="16px">{t(subTitle)}</P14>
        </Box>
        <ButtonRounded type="button" variant="contained" color="primary" onClick={buttonAction}>
          {t(buttonText)}
        </ButtonRounded>
      </Box>
    </StyledWrapper>
  );
};

NewAutomationItem.propTypes = {
  title: string,
  subTitle: string,
  buttonText: string,
  ImageComponent: func,
  buttonAction: func.isRequired,
};
NewAutomationItem.defaultProps = {
  title: '',
  subTitle: '',
  buttonText: '',
  ImageComponent: null,
};
export default NewAutomationItem;
