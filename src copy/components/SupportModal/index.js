import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { Link } from 'react-router-dom';
import { StyledPaper, StyledWrapper } from './styled';
import { StyledDialog } from '../Dialog/styled';
import { L14 } from '../atoms';
import { MODAL_CONTENT, FN_MAP } from './constant';
import CloseButton from '../Dialog/CloseButton';

const ID = 'wt-support-community';

const Support = ({ toggleIsOpen, isOpen, toggleIntercom }) => {
  const { t } = useTranslation();

  const handleIntercom = useCallback(() => {
    toggleIsOpen();
    toggleIntercom();
  }, [toggleIntercom, toggleIsOpen]);

  const fnMap = {
    [FN_MAP.contact]: handleIntercom,
  };

  return (
    <StyledDialog
      open={isOpen}
      scroll="paper"
      maxWidth="sm"
      PaperComponent={StyledPaper}
      onClose={toggleIsOpen}
      aria-labelledby={ID}
      $customWidth="496px"
    >
      <CloseButton onClick={toggleIsOpen} />

      <StyledWrapper>
        <Box borderBottom="1px solid #e6e9ec">
          <L14 padding="0 0 20px 24px" fontWeight="600" fontSize="16px" noHover>
            {t('Support & Community')}
          </L14>
        </Box>
        <Box component="ul">
          {MODAL_CONTENT.map(({ icon, title, description, badge, type, link }) => {
            const Icon = icon;
            const component = type === 'fn' ? 'div' : Link;
            const componentProps =
              type === 'fn'
                ? {
                    onClick: fnMap[title],
                  }
                : {
                    to: {
                      pathname: link,
                    },
                    target: '_blank',
                    rel: 'noreferrer noopener',
                  };

            return (
              <Box component="li" key={title}>
                <Box component={component} {...componentProps}>
                  <Box>
                    <Icon />
                  </Box>
                  <Box ml="19px" mr="auto">
                    <L14 lineHeight="20px" fontWeight="600" noHover>
                      {t(title)}
                    </L14>
                    <L14 lineHeight="20px" color="#787F88" noHover>
                      {t(description)}
                    </L14>
                  </Box>
                  {badge && (
                    <Box component="p" className="new-badge">
                      {t('New')}
                    </Box>
                  )}
                  <Box className="forward-icon">
                    <ArrowForwardIosIcon />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </StyledWrapper>
    </StyledDialog>
  );
};

Support.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
  toggleIntercom: PropTypes.func.isRequired,
};

export default Support;
