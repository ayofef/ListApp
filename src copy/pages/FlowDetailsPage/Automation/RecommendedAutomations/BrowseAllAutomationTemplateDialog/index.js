import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import omit from 'lodash/omit';
import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
  StyledScrollIndicator,
} from '../../../../../components/Dialog/styled';
import SideBar from './SideBar';
import ContentArea from './ContentArea';
import { SIDEBAR_WIDTH, CATEGORY_KEY } from './constant';
import useSearch from '../../../../../hooks/useSearch';
import CloseButton from '../../../../../components/Dialog/CloseButton';
import { handleScrollIndicator } from '../../../../../components/Dialog/handleScrollIndicator';

const ID = 'flow-automation-browse-recommendation';

const BrowseAllAutomationTemplateDialog = ({ isOpen, toggleIsOpen }) => {
  const { t } = useTranslation();
  const [, setSearchParams] = useSearch();

  const [scroll, setScroll] = useState(true);
  const toggleScroll = useCallback(() => setScroll((prevState) => !prevState), []);

  const handleContentScroll = useCallback(
    (e) => {
      handleScrollIndicator(e, scroll, toggleScroll);
    },
    [scroll, toggleScroll]
  );

  const handleClose = useCallback(() => {
    setSearchParams((prevState) => omit(prevState, [CATEGORY_KEY]));
    toggleIsOpen();
  }, [toggleIsOpen, setSearchParams]);

  return (
    <StyledDialog
      open={isOpen}
      scroll="paper"
      maxWidth="xl"
      $height="100%"
      PaperComponent={StyledPaper}
      onClose={handleClose}
      aria-labelledby={ID}
    >
      <CloseButton onClick={handleClose} top="30px" />

      <StyledDialogTitle padding="36px 24px" id={`${ID}-title`} disableTypography>
        {t('Automations')}
      </StyledDialogTitle>

      <StyledDialogContent px="0" onScroll={handleContentScroll} $overflowX="hidden">
        <Box width="1040px" minHeight="500px" position="relative" overflow="hidden" boxSizing="border-box">
          <SideBar />

          <ContentArea />
        </Box>
      </StyledDialogContent>

      <StyledScrollIndicator width={`calc(100% - ${SIDEBAR_WIDTH})`} left={SIDEBAR_WIDTH} scrollEnd={!scroll}>
        &nbsp;
      </StyledScrollIndicator>
    </StyledDialog>
  );
};

BrowseAllAutomationTemplateDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
};

export default BrowseAllAutomationTemplateDialog;
