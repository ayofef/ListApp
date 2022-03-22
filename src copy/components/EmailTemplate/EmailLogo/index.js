import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { P18B } from '../../atoms';

import EmailSection from '../EmailSection';
import { StyledImage } from '../styled';
import { StyledLogoText, StyledText } from './styled';

const alignMap = {
  LEFT: 'flex-start',
  CENTER: 'center',
  RIGHT: 'flex-end',
};

const sizeMap = {
  SMALL: { img: '32px', text: '16px' },
  MEDIUM: { img: '64px', text: '24px' },
  LARGE: { img: '96px', text: '32px' },
};

const noImageMap = {
  SMALL: { WH: '70px', fontSize: '14px' },
  MEDIUM: { WH: '100px', fontSize: '18px' },
  LARGE: { WH: '130px', fontSize: '22px' },
};

const EmailLogo = ({
  logo,
  admin,
  defaultTab,
  brandColor,
  logoHandler,
  preview,
  handleLogoText,
  logoTextEditable,
  previewModal,
}) => {
  const [localLogoText, setLocalLogoText] = useState(logoHandler?.logoText);
  const [editable, setEditable] = useState(false);
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const textLogo = !!logoHandler?.logoText && logoHandler?.logoType === 'TEXT';
  const imageLogo = !!logo && logoHandler?.logoType === 'IMG';
  const noImage = logoHandler?.logoType === 'IMG' && !logo;
  const noBrandData = !logoHandler?.logoType;

  const saveLogoText = () => {
    handleLogoText(localLogoText);
    setEditable(false);
  };
  const handleClick = () => {
    if (logoTextEditable) {
      setEditable(!editable);
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  };

  return (
    <EmailSection
      title="logo"
      tab={1}
      padding="0 16px"
      defaultTab={defaultTab}
      logoHandler={logoHandler}
      preview={preview}
    >
      <Box
        width="100%"
        minHeight="64px"
        display="flex"
        justifyContent={alignMap[logoHandler?.logoPosition] || 'flex-start'}
        alignItems="center"
        mb={previewModal && '20px'}
      >
        {logo && !logoHandler?.logoType ? (
          <StyledImage src={logo} alt={admin} height={sizeMap[logoHandler?.logoSize]?.img || '64px'} />
        ) : (
          <>
            {(noImage || noBrandData) && (
              <Box
                bgcolor={noImage || noBrandData ? '#F8F9F9' : 'transparent'}
                borderRadius="8px"
                minWidth={noImageMap[logoHandler?.logoSize]?.WH || 'min-content'}
                height={noImageMap[logoHandler?.logoSize]?.WH || '100px'}
                border={noImage || noBrandData ? '1.1px dashed #C1C3C6' : 'none'}
                display="flex"
                justifyContent="center"
                alignItems="center"
                onClick={handleClick}
              >
                {editable ? (
                  <StyledLogoText
                    type="text"
                    value={localLogoText}
                    ref={inputRef}
                    accentColor={brandColor}
                    fontSize={sizeMap[logoHandler?.logoSize]?.text || '24px'}
                    onBlur={saveLogoText}
                    onChange={(e) => setLocalLogoText(e.target.value)}
                    readOnly={!editable}
                    editable={editable}
                    fromImg={true}
                  />
                ) : (
                  <Box width="100px" display="flex" justifyContent="center" alignItems="center">
                    <P18B
                      fontSize={noImageMap[logoHandler?.logoSize]?.fontSize || '18px'}
                      textAlign="center"
                      color="#787F88"
                      border="1px solid transparent"
                      padding="16px 30px"
                    >
                      {t('YOUR LOGO')}
                    </P18B>
                  </Box>
                )}
              </Box>
            )}
            {textLogo &&
              (editable ? (
                <StyledLogoText
                  type="text"
                  value={localLogoText}
                  ref={inputRef}
                  accentColor={brandColor}
                  fontSize={sizeMap[logoHandler?.logoSize]?.text || '24px'}
                  onBlur={saveLogoText}
                  onChange={(e) => setLocalLogoText(e.target.value)}
                  readOnly={!editable}
                  editable={editable}
                />
              ) : (
                <StyledText
                  accentColor={brandColor}
                  fontSize={sizeMap[logoHandler?.logoSize]?.text || '24px'}
                  padding="16px 0"
                  onClick={handleClick}
                >
                  {logoHandler?.logoText}
                </StyledText>
              ))}
            {imageLogo && <StyledImage src={logo} alt={admin} height={sizeMap[logoHandler?.logoSize]?.img || '64px'} />}
          </>
        )}
      </Box>
    </EmailSection>
  );
};

EmailLogo.propTypes = {
  admin: PropTypes.string.isRequired,
  brandColor: PropTypes.string.isRequired,
  handleLogoText: PropTypes.func.isRequired,
  logo: PropTypes.string,
  logoHandler: PropTypes.shape({
    logoText: PropTypes.string,
    logoType: PropTypes.string,
    logoSize: PropTypes.string,
    logoPosition: PropTypes.string,
    handleChange: PropTypes.func,
  }).isRequired,
  defaultTab: PropTypes.bool,
  preview: PropTypes.bool.isRequired,
  logoTextEditable: PropTypes.bool,
  previewModal: PropTypes.bool,
};

EmailLogo.defaultProps = {
  defaultTab: false,
  logo: '',
  logoTextEditable: false,
  previewModal: false,
};

export default EmailLogo;
