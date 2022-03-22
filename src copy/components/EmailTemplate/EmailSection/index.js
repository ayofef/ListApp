import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { useClickAway } from 'react-use';
import LogoEditor from '../EmailLogo/LogoEditor';
import { UI_ROUTES } from '../../../constants/routes';

import { StyledEmailSections, StyledSectionIndicator } from './styled';

const masterTemplateIndicator = (section) => `This ${section} will appear on all of your emails.`;

const IndicatorMap = {
  logo: {
    init: 'Add logo in',
    brandCenter: null,
  },
  content: null,
  signOff: { init: 'Edit action button in', brandCenter: masterTemplateIndicator('sign-off') },
  footer: { init: 'Edit footer in', brandCenter: masterTemplateIndicator('footer') },
};

const EmailSections = ({ children, title, tab, defaultTab, padding, indicator, logoHandler, preview }) => {
  const [showIndicator, setShowIndicator] = useState(false);
  const radioRef = useRef(null);
  const ref = useRef(null);
  useClickAway(ref, () => {
    setShowIndicator(false);
  });

  const { pathname } = useLocation();

  const isBrandCenter = pathname === UI_ROUTES.brandCenter;

  useEffect(() => {
    if (defaultTab && !isBrandCenter) {
      setShowIndicator(true);
    }
  }, [setShowIndicator, defaultTab, isBrandCenter]);

  const setBoxFocus = () => {
    setShowIndicator(true);
  };

  return (
    <StyledEmailSections padding={padding} preview={preview} ref={ref}>
      <input type="checkbox" id={`tab${tab}`} name={`tab-group${tab}`} ref={radioRef} checked={showIndicator} />
      {indicator && IndicatorMap[title] && !preview && (
        <StyledSectionIndicator>
          {!isBrandCenter ? (
            <>
              {IndicatorMap[title].init}
              <br /> <Link to={UI_ROUTES.brandCenter}>brand center</Link>
            </>
          ) : (
            <Box>
              {IndicatorMap[title].brandCenter ? (
                <Box width="180px">{IndicatorMap[title].brandCenter}</Box>
              ) : (
                <LogoEditor logoHandler={logoHandler} />
              )}
            </Box>
          )}
        </StyledSectionIndicator>
      )}

      <Box tabIndex={tab} onFocus={setBoxFocus}>
        {children}
      </Box>
    </StyledEmailSections>
  );
};

EmailSections.propTypes = {
  padding: PropTypes.string,
  indicator: PropTypes.bool,
  defaultTab: PropTypes.bool,
  title: PropTypes.string.isRequired,
  tab: PropTypes.number.isRequired,
  logoHandler: PropTypes.shape({
    logoType: PropTypes.string,
    logoSize: PropTypes.string,
    logoPosition: PropTypes.string,
    handleChange: PropTypes.func,
  }),

  preview: PropTypes.bool.isRequired,
};

EmailSections.defaultProps = {
  padding: '',
  indicator: true,
  defaultTab: false,
  logoHandler: {},
};
export default EmailSections;
