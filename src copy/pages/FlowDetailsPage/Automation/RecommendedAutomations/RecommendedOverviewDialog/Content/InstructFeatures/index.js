import React from 'react';
import { bool, string, func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { StyledWrapper } from './styled';
import InstructFeature from './InstructFeature';
import { ButtonRounded } from '../../../../../../../components/atoms';

const instructFeatures = [
  'Full control of the payment flow from Checkout to Capture',
  'Maximize conversion with smart routing and Orchestration',
  'Vast library of ready-to-go Recipes',
];

const InstructFeatures = ({ margin, noMinHeight, hideButton, handleConfigure }) => {
  const { t } = useTranslation();
  return (
    <StyledWrapper $margin={margin} $noMinHeight={noMinHeight}>
      {instructFeatures?.map((feature) => (
        <InstructFeature feature={feature} key={feature} />
      ))}
      {!hideButton && (
        <Box display="flex" mt="24px">
          <ButtonRounded type="button" variant="contained" color="primary" onClick={handleConfigure}>
            {t('Got it')}
          </ButtonRounded>
        </Box>
      )}
    </StyledWrapper>
  );
};

InstructFeatures.propTypes = {
  margin: string,
  noMinHeight: bool,
  handleConfigure: func,
  hideButton: bool,
};

InstructFeatures.defaultProps = {
  margin: '40px 0 0 0',
  noMinHeight: false,
  handleConfigure: () => {},
  hideButton: false,
};

export default InstructFeatures;
