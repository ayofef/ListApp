import React, { useRef, useState, useCallback, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';

import { PaymentsDetailsContextProvider } from './PaymentDetailsContext';
import DetailsHeader from '../../Payments/Details/Header';
import Details from '../../Payments/Details';
import PaymentDetailsDrawer from './PaymentDetailsDrawer';
import { useRightAsideContext } from '../../../providers/RightAsideProvider';
import { CommentsProvider } from '../../Payments/CommentsDrawerContent/CommentsContext';
import IssueCreateModal from '../BottomDrawer/DrawerActions/IssueCreateModal';
import { INTENT_STATUSES } from '../../Payments/Details/constant';

const PaymentDetails = () => {
  const { toggleGlobalFilterState } = useRightAsideContext();
  const [pageContentData, setPageContentData] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isCreateIssuesModalOpen, setCreateIssuesModalOpen] = useState(false);
  const toggleCreateIssuesModal = useCallback(() => setCreateIssuesModalOpen((prevState) => !prevState), []);

  const { detailsId } = useParams();

  const pageContentRefetch = useRef(null);

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
    toggleGlobalFilterState(!drawerOpen);
  };

  const setPageContentRefetch = useCallback((fn) => {
    pageContentRefetch.current = fn;
  }, []);

  const paymentContextValue = useMemo(
    () => ({
      pageContentData,
      pageContentRefetch: pageContentRefetch?.current,
      setPageContentRefetch,
      setPageContentData,
      isCreateIssuesModalOpen,
      toggleCreateIssuesModal,
    }),
    [pageContentData, setPageContentRefetch, setPageContentData, isCreateIssuesModalOpen, toggleCreateIssuesModal]
  );

  const isIntent = INTENT_STATUSES.includes(pageContentData?.status?.value);

  return (
    <PaymentsDetailsContextProvider value={paymentContextValue}>
      <CommentsProvider>
        <Box position="relative" display="flex" flexDirection="column" width="100%" height="100%" bgcolor="transparent">
          <Box padding="16px 32px">
            <DetailsHeader toggleDrawer={toggleDrawer} isIntent={isIntent} />
          </Box>
          <Box display="flex" flexDirection="column" flexGrow="1" p="0px 32px 16px 24px" bgcolor="#fff">
            <Details />
          </Box>
          <PaymentDetailsDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        </Box>

        <IssueCreateModal
          modalShown={isCreateIssuesModalOpen}
          closeModal={toggleCreateIssuesModal}
          selected={[detailsId]}
        />
      </CommentsProvider>
    </PaymentsDetailsContextProvider>
  );
};

export default PaymentDetails;
