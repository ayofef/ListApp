import { CARDS_COLUMNS } from './tableData';

const hiddenByDefault = [
  CARDS_COLUMNS.cardType,
  CARDS_COLUMNS.cardProduct,
  CARDS_COLUMNS.bankName,
  CARDS_COLUMNS.createdAt,
  CARDS_COLUMNS.cardBrand,
];

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
