import { DateCell } from '../../../components/table/Cells';
import { PrivateKeyCell } from './components/PrivateKeyCell';
import { PublicKeyCell } from './components/PublicKeyCell';
import { ActionCell } from './components/ActionCell';

const COLUMN_NAMES = {
  id: 'id',
  publicKey: 'public Key',
  privateKey: 'private Key',
  lastUsedDate: 'last Used',
  actions: 'Actions',
  createdDate: 'created',
};

const headCells = [
  {
    id: COLUMN_NAMES.publicKey,
    numeric: false,
    disablePadding: false,
    label: COLUMN_NAMES.publicKey,
    Cell: PublicKeyCell,
    sortable: false,
  },
  {
    id: COLUMN_NAMES.privateKey,
    numeric: false,
    disablePadding: false,
    label: COLUMN_NAMES.privateKey,
    Cell: PrivateKeyCell,
  },
  {
    id: COLUMN_NAMES.createdDate,
    numeric: false,
    disablePadding: false,
    label: COLUMN_NAMES.createdDate,
    Cell: DateCell,
  },
  {
    id: COLUMN_NAMES.lastUsedDate,
    numeric: false,
    disablePadding: false,
    label: COLUMN_NAMES.lastUsedDate,
    Cell: DateCell,
  },
  {
    id: COLUMN_NAMES.actions,
    numeric: false,
    disablePadding: false,
    label: '',
    Cell: ActionCell,
  },
];

const transformNodeToRow = ({ id, publicKey, privateKey, lastUsedDate, createdDate }) => ({
  id,
  [COLUMN_NAMES.publicKey]: publicKey ?? '',
  [COLUMN_NAMES.privateKey]: privateKey ?? '',
  [COLUMN_NAMES.lastUsedDate]: lastUsedDate ?? '',
  [COLUMN_NAMES.createdDate]: createdDate ?? '',
  [COLUMN_NAMES.actions]: id ?? '',
});

export { transformNodeToRow, headCells };
