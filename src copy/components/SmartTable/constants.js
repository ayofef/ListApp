/**Column names for export only
 * visibleFields is used on the BE for data export and requires
 * a name different from the the one used on the ui
 */
import { COLUMN_NAMES } from './ExportFiles/exportDictionary';

const ROWS_PER_PAGE = 45;

const localDefaultTableState = {
  columnOrder: [],
  hiddenColumns: [],
};

const getItemStyle = ({ isDragging, isDropAnimating }, draggableStyle, vertical) => ({
  ...draggableStyle,
  ...(!isDragging && {
    transform: 'translate(0,0)',
  }),
  ...(isDropAnimating && { transitionDuration: '0.001s' }),
  ...(vertical && draggableStyle),
});

/**
 * if columns item is an object
 * it's used for visibleFields -> data export automation
 * key - name of the column
 * value - backend key to look up the column, otherwise column will be empty
 */
const transformTableToFields = (columns) => ({
  fields: columns?.map((item) =>
    typeof item === 'object'
      ? { key: COLUMN_NAMES[item?.accessor] ?? item?.accessor, value: item?.accessor }
      : { key: item, value: item }
  ),
});

const transformStateToTable = (state) => ({
  columnOrder: state?.tableState?.columnOrder ?? [],
  columnResizing: {
    columnWidths:
      state?.tableState?.columnResizing?.columnWidths?.reduce((acc, item) => {
        const key = Object.keys(item)[0];
        return { ...acc, [key]: item[key] };
      }, {}) ?? {},
  },
});

const transformTableToState = (state) => ({
  columnOrder: state?.columnOrder ?? [],
  columnResizing: {
    columnWidths: Object.entries(state?.columnResizing?.columnWidths)?.reduce((acc, [field, width], index) => {
      acc[index] = { [field]: width };

      return acc;
    }, []),
  },
});

export {
  getItemStyle,
  ROWS_PER_PAGE,
  localDefaultTableState,
  transformTableToFields,
  transformTableToState,
  transformStateToTable,
};
