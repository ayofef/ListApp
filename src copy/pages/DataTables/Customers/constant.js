import { CUSTOMER_COLUMNS } from './tableData';

const hiddenByDefault = [CUSTOMER_COLUMNS.id];

const INITIAL_TABLE_STATE = {
  tableState: {
    columnResizing: {
      columnWidths: [],
    },
    columnOrder: [],
    sortBy: [],

    hiddenColumns: hiddenByDefault,
  },
};

const transformHiddenColumnsFn = (state) => state?.hiddenFields?.fields?.map((item) => item?.value) ?? hiddenByDefault;

export { INITIAL_TABLE_STATE, transformHiddenColumnsFn, hiddenByDefault };
