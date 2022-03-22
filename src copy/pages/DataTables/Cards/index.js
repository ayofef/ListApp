import React, { useState, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';

import Header from '../components/Header';
import Table from '../Table';
import { useGetCards } from '../../../hooks/dataTables/useGetCards';
import { useNotificationManager } from '../../../hooks/useNotificationManager';
import { headCells, transformNodeToRow } from './tableData';
import { TableStarterContextProvider, useTableStarter } from '../hooks/useTableStarter';
import { INITIAL_TABLE_STATE, transformHiddenColumnsFn } from './constant';
import { ButtonRounded } from '../../../components/atoms';
import CreateCardDrawer from './CreateCardDrawer';
import EmptyStateTemplate from '../components/EmptyStateTemplate';
import { ICON_WRAPPER_PROPS } from '../constant';
import CardsIcon from '../../../assets/icons/EmptyStates/Cards';

const Cards = () => {
  const value = useTableStarter();
  const { t } = useTranslation();

  const { loading, error, cards, pageInfo } = useGetCards();
  const isEmpty = !loading && cards !== undefined && (!cards?.length || cards?.length === 0);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = useCallback(() => setIsOpen((prevState) => !prevState), []);

  useNotificationManager('error', error?.message, 'All Payments', 5000);

  const customButton = () => {
    return (
      <ButtonRounded type="button" color="primary" variant="contained" onClick={toggleDrawer}>
        {t('Create card')}
      </ButtonRounded>
    );
  };
  const emptyStateComponent = (props) => (
    <EmptyStateTemplate
      description="You currently have no cards"
      buttonLabel="Create card"
      handleButtonEvent={toggleDrawer}
      iconWrapperProps={ICON_WRAPPER_PROPS}
      iconComponent={CardsIcon}
      {...props}
      title=""
    />
  );

  return (
    <TableStarterContextProvider value={value}>
      <Box position="relative" display="flex" flexDirection="column" width="100%" height="100%" bgcolor="transparent">
        <Box padding="16px 32px">
          <Header primaryText="cards" customButton={customButton} />
        </Box>

        <Box display="flex" flexDirection="column" flexGrow="" p="0px 32px 16px 24px" bgcolor="#fff">
          <Table
            data={transformNodeToRow(cards) ?? []}
            loading={loading}
            isEmpty={isEmpty}
            pageInfo={pageInfo}
            headCells={headCells}
            initialTableState={INITIAL_TABLE_STATE}
            transformHiddenColumnsFn={transformHiddenColumnsFn}
            emptyStateComponent={emptyStateComponent}
          />
        </Box>
      </Box>
      <CreateCardDrawer toggleDrawer={toggleDrawer} isOpen={isOpen} />
    </TableStarterContextProvider>
  );
};
export default Cards;
