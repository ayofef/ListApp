import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import BrandCenterSection from './BrandCenterSection';
import { StyledWrapper } from './styled';
import ButtonStyle from './ButtonStyle';
import ColorPicker from './BrandColor';
import SocialNetworks from './SocialNetwork';
import Graphics from './Graphics';
import Email from '../EmailTemplate/Email';
import { SectionDesc } from './constants';

const BrandCenter = ({
  data,
  we,
  handleButtonStyle,
  handleAccentColor,
  handleSocialEdit,
  handleGraphics,
  handleLogoConfig,
  handleSaveFooterText,
  handleSaveSignOffContent,
  handleLogoText,
}) => {
  return (
    <StyledWrapper>
      <BrandCenterSection section={SectionDesc.graphic} minHeight="350px">
        <Graphics handleGraphics={handleGraphics} brandImages={{ logo: data?.logoUrl, favicon: data?.faviconUrl }} />
      </BrandCenterSection>
      <BrandCenterSection section={SectionDesc.accent}>
        <ColorPicker color={data?.accentColor || '#777777'} handleColorPick={handleAccentColor} />
      </BrandCenterSection>
      <BrandCenterSection section={SectionDesc.button}>
        <ButtonStyle handleChange={handleButtonStyle} color={data?.accentColor} defaultValue={data?.actionButton} />
      </BrandCenterSection>
      <BrandCenterSection section={SectionDesc.social}>
        <SocialNetworks socialNetwork={data?.socialNetworks} handleSocialEdit={handleSocialEdit} />
      </BrandCenterSection>
      <BrandCenterSection section={SectionDesc.template}>
        <Box maxWidth="700px">
          <Email
            logoTextEditable={true}
            brandInfo={data}
            we={we}
            editorContent=""
            editorProperties={[]}
            handleLogoText={handleLogoText}
            handleLogoConfig={handleLogoConfig}
            handleSaveFooterText={handleSaveFooterText}
            handleSaveSignOffContent={handleSaveSignOffContent}
          />
        </Box>
      </BrandCenterSection>
    </StyledWrapper>
  );
};

BrandCenter.propTypes = {
  we: PropTypes.string.isRequired,
  handleButtonStyle: PropTypes.func.isRequired,
  handleAccentColor: PropTypes.func.isRequired,
  handleSocialEdit: PropTypes.func.isRequired,
  handleGraphics: PropTypes.func.isRequired,
  handleLogoText: PropTypes.func.isRequired,
  handleLogoConfig: PropTypes.func.isRequired,
  handleSaveSignOffContent: PropTypes.func.isRequired,
  handleSaveFooterText: PropTypes.func.isRequired,
  data: PropTypes.shape({
    accentColor: PropTypes.string,
    actionButton: PropTypes.string,
    socialNetworks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        iconUrl: PropTypes.string,
        linkUrl: PropTypes.string,
      })
    ),
    logoUrl: PropTypes.string,
    faviconUrl: PropTypes.string,
    templateConfig: PropTypes.shape({
      signOffContent: PropTypes.string,
      footerText: PropTypes.string,
      logoType: PropTypes.string,
      logoPosition: PropTypes.string,
      logoSize: PropTypes.string,
    }),
  }).isRequired,
};

export default BrandCenter;
