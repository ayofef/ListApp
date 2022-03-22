import React, { useMemo } from 'react';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import useGetPaymentIssues from './issuesHooks';
import { headCells } from './tableData';
import Table from '../Table';
import useSearch from '../../../hooks/useSearch';
import EmptyState from './EmptyState';
import { useNotificationManager } from '../../../hooks/useNotificationManager';
import ListSkeleton from '../../../components/ListSkeleton';

const ROWS_PER_PAGE = 50;
const CREATED_DATA_KEY = 'created';

const AllPaymentsIssues = () => {
  const { loading, error, rows } = useGetPaymentIssues();
  const [searchParams] = useSearch();
  useNotificationManager('error', error?.message, 'Payment Issues', 5000);

  const sortedRows = useMemo(() => {
    if (!Array.isArray(rows)) {
      return [];
    }

    const [sortData] = Object.entries(searchParams?.sort || {});
    const [field, sortOrder] = sortData || [];

    if (!field || !sortOrder) {
      // Default sort -> created
      return rows?.slice()?.sort((a, b) => moment(b[CREATED_DATA_KEY]).diff(moment(a[CREATED_DATA_KEY])));
    }

    const sortedArray = [...rows].sort((a, b) => {
      if (field === CREATED_DATA_KEY) {
        return moment(a[CREATED_DATA_KEY]).diff(moment(b[CREATED_DATA_KEY]));
      }

      if (field === 'assigneeUserId' || field === 'creator') {
        return a[field].name.localeCompare(b[field].name);
      }

      return a[field].localeCompare(b[field]);
    });

    return sortOrder === 'asc' ? sortedArray : sortedArray.reverse();
  }, [searchParams?.sort, rows]);

  // tag rows if they are resolved so the styling can be applied
  const taggedRows = sortedRows.map((row) => {
    return {
      resolved: row.status === 'RESOLVED',
      ...row,
    };
  });

  const taggedHeadCells = headCells.map((headCell) => {
    return {
      breakpoint: headCell.id === 'creator' ? 'visibleDesktopLarge' : '',
      ...headCell,
    };
  });

  const isEmpty = !loading && sortedRows !== undefined && (!sortedRows?.length || sortedRows.length === 0);

  return (
    <>
      {/* DO NOT CHANGE structure. DO NOT PUT ListSkeleton or EmptyState to Table */}
      <Box>
        <Table headCells={taggedHeadCells} rows={taggedRows} />
      </Box>

      {loading && <ListSkeleton rowNumber={ROWS_PER_PAGE} height={38} p={0.2} />}

      {isEmpty && <EmptyState />}
    </>
  );
};

export default AllPaymentsIssues;
