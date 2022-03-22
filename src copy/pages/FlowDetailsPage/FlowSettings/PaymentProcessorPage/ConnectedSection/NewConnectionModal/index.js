import React, { useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';

import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
  StyledPaper,
  StyledScrollIndicator,
} from '../../../../../../components/Dialog/styled';
import { useListConnections } from '../../../hooks/useListConnections';
import ConnectionsList from './ConnectionsList';
import SearchFilter from './SearchFilter';
import { NewConnectionProvider } from './context';
import LoadingState from './LoadingState/LoadingState';
import EmptyState from './EmptyState';
import CloseButton from '../../../../../../components/Dialog/CloseButton';
import { handleScrollIndicator } from '../../../../../../components/Dialog/handleScrollIndicator';

const ID = 'flow-add-new-connection';
const CONNECTION_STATUS = ['NOT_CONNECTED'];

const NewConnectionModal = ({ isOpen, closeModal, status, types }) => {
  const { t } = useTranslation();
  const { availableConnections, loading } = useListConnections({ status, types });
  const [scroll, setScroll] = useState(true);
  const toggleScroll = useCallback(() => setScroll((prevState) => !prevState), []);
  const isEmptyData = useMemo(() => isEmpty(availableConnections), [availableConnections]);
  const contextValue = useMemo(() => ({ closeModal }), [closeModal]);

  const handleContentScroll = useCallback(
    (e) => {
      handleScrollIndicator(e, scroll, toggleScroll);
    },
    [scroll, toggleScroll]
  );

  return (
    <NewConnectionProvider value={contextValue}>
      <StyledDialog
        open={isOpen}
        scroll="paper"
        maxWidth="xl"
        $height="700px"
        PaperComponent={StyledPaper}
        onClose={closeModal}
        aria-labelledby={ID}
      >
        <CloseButton onClick={closeModal} top="30px" />
        <SearchFilter />

        <StyledDialogTitle padding="36px 24px" id={`${ID}-title`} disableTypography>
          {t('Connections')}
        </StyledDialogTitle>

        <StyledDialogContent onScroll={handleContentScroll}>
          <Box width="1040px" pb="24px" mt="16px" minHeight="588px">
            {loading && <LoadingState />}
            {!loading && isEmptyData && <EmptyState />}
            {!loading && !isEmptyData && <ConnectionsList connections={availableConnections} />}
          </Box>
        </StyledDialogContent>
        <StyledScrollIndicator scrollEnd={!scroll}>&nbsp;</StyledScrollIndicator>
      </StyledDialog>
    </NewConnectionProvider>
  );
};

NewConnectionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  status: PropTypes.arrayOf(PropTypes.string),
  types: PropTypes.arrayOf(PropTypes.string),
};

NewConnectionModal.defaultProps = {
  status: CONNECTION_STATUS,
  types: null,
};

export default NewConnectionModal;
