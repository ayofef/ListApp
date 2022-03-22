import { v4 } from 'uuid';

import { CardNumberCell, BoldTextCell, DefaultCardCell } from '../../../../components/table/ReactTableCells';
import { CARDS_COLUMNS, CELL_SETTINGS } from '../../Cards/tableData';
import { getCountryName } from '../../../../utils/getCountryName';

const ROW_DETAILS = ['id', 'phone', 'email'];

const headCells = [
  {
    accessor: CARDS_COLUMNS.cardNumber,
    ...CELL_SETTINGS,
    Header: CARDS_COLUMNS.cardNumber,
    Cell: CardNumberCell,
    width: 220,
  },
  {
    accessor: CARDS_COLUMNS.cardHolder,
    ...CELL_SETTINGS,
    Header: CARDS_COLUMNS.cardHolder,
    Cell: BoldTextCell,
  },
  {
    accessor: CARDS_COLUMNS.country,
    ...CELL_SETTINGS,
    Header: CARDS_COLUMNS.country,
  },
  {
    accessor: CARDS_COLUMNS.expiryDate,
    ...CELL_SETTINGS,
    Header: CARDS_COLUMNS.expiryDate,
  },
  {
    accessor: CARDS_COLUMNS.isDefault,
    ...CELL_SETTINGS,
    Header: CARDS_COLUMNS.isDefault,
    Cell: DefaultCardCell,
  },
];

const transformNodeToRow = (cards) =>
  cards.map((node) => ({
    id: node?.token ?? v4(),
    [CARDS_COLUMNS.cardNumber]: node?.number ?? '',
    [CARDS_COLUMNS.cardHolder]: node?.name ?? '',
    [CARDS_COLUMNS.country]: getCountryName(node?.country) ?? '',
    [CARDS_COLUMNS.expiryDate]: `${node?.expMonth}/${node?.expYear}` ?? '',
    [CARDS_COLUMNS.cardType]: node?.type ?? '',
    [CARDS_COLUMNS.cardProduct]: node?.product ?? '',
    [CARDS_COLUMNS.bankName]: node?.bankName ?? '',
    [CARDS_COLUMNS.isDefault]: node?.isDefault ?? '',
    [CARDS_COLUMNS.cardBrand]: node?.brand ?? '',
  }));

export { ROW_DETAILS, headCells, transformNodeToRow };
