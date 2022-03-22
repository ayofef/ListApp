import { v4 } from 'uuid';
import { CustomerNameCell, DateCell, TextCell, MethodCell } from '../../../components/table/ReactTableCells';

const WIDTH = 150;

const CELL_SETTINGS = {
  numeric: false,
  disablePadding: false,
  width: WIDTH,
  Cell: TextCell,
};

const CUSTOMER_COLUMNS = {
  id: 'id',
  email: 'email',
  name: 'name',
  phone: 'phone',
  createdAt: 'created',
  defaultPaymentMethod: 'default payment method',
};

const headCells = [
  {
    accessor: CUSTOMER_COLUMNS.name,
    ...CELL_SETTINGS,
    Header: CUSTOMER_COLUMNS.name,
    Cell: CustomerNameCell,
    width: 270,
  },
  {
    accessor: CUSTOMER_COLUMNS.phone,
    ...CELL_SETTINGS,
    Header: CUSTOMER_COLUMNS.phone,
  },
  {
    accessor: CUSTOMER_COLUMNS.defaultPaymentMethod,
    ...CELL_SETTINGS,
    Header: CUSTOMER_COLUMNS.defaultPaymentMethod,
    Cell: MethodCell,
  },
  {
    accessor: CUSTOMER_COLUMNS.createdAt,
    ...CELL_SETTINGS,
    Header: CUSTOMER_COLUMNS.createdAt,
    Cell: DateCell,
  },
  {
    accessor: CUSTOMER_COLUMNS.id,
    ...CELL_SETTINGS,
    Header: CUSTOMER_COLUMNS.id,
  },
];

const transformNodeToRow = (customers) =>
  customers.map(({ node }) => ({
    [CUSTOMER_COLUMNS.id]: node?.id ?? v4(),
    [CUSTOMER_COLUMNS.name]: {
      name: node?.name ?? '',
      email: node?.email ?? '',
    },
    [CUSTOMER_COLUMNS.phone]: node?.phone ?? '',
    [CUSTOMER_COLUMNS.createdAt]: node?.systemCreated ?? '',
    [CUSTOMER_COLUMNS.defaultPaymentMethod]: node?.defaultPaymentMethod ?? 'N/A',
  }));

export { transformNodeToRow, headCells, CUSTOMER_COLUMNS };
