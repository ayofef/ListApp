import { TextCell } from '../../../../../components/table/Cells';
import { FlowIdCell } from '../../components/FlowIdCell';

const COLUMN_NAMES = {
  name: 'name',
  id: 'id',
};

const headCells = [
  {
    id: COLUMN_NAMES.name,
    disablePadding: false,
    label: COLUMN_NAMES.name,
    Cell: TextCell,
  },
  {
    id: COLUMN_NAMES.id,
    disablePadding: false,
    label: COLUMN_NAMES.id,
    Cell: FlowIdCell,
    width: '50%',
  },
];

const transformNodeToRow = ({ id, name }) => ({
  [COLUMN_NAMES.name]: name ?? '',
  [COLUMN_NAMES.id]: id ?? '',
});

export { transformNodeToRow, headCells };
