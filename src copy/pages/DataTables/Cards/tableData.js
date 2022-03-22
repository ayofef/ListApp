import { v4 } from 'uuid';
import {
  CardNumberCell,
  TextCell,
  BoldTextCell,
  DateCell,
  MethodCell,
} from '../../../components/table/ReactTableCells';
import { getCountryName } from '../../../utils/getCountryName';

const WIDTH = 150;

const CELL_SETTINGS = {
  numeric: false,
  disablePadding: false,
  width: WIDTH,
  Cell: TextCell,
};

const CARDS_COLUMNS = {
  cardNumber: 'card number',
  cardHolder: 'cardholder',
  country: 'country',
  expiryDate: 'expiry date',
  cardType: 'card type',
  cardProduct: 'card product',
  bankName: 'Issuer',
  isDefault: 'isDefault',
  createdAt: 'created',
  cardBrand: 'card brand',
};

const headCells = [
  {
    accessor: CARDS_COLUMNS.cardNumber,
    ...CELL_SETTINGS,
    Header: CARDS_COLUMNS.cardNumber,
    Cell: CardNumberCell,
    width: 250,
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
    accessor: CARDS_COLUMNS.createdAt,
    ...CELL_SETTINGS,
    Header: CARDS_COLUMNS.createdAt,
    Cell: DateCell,
  },
  {
    accessor: CARDS_COLUMNS.cardType,
    ...CELL_SETTINGS,
    Header: CARDS_COLUMNS.cardType,
  },
  {
    accessor: CARDS_COLUMNS.cardProduct,
    ...CELL_SETTINGS,
    Header: CARDS_COLUMNS.cardProduct,
  },
  {
    accessor: CARDS_COLUMNS.bankName,
    ...CELL_SETTINGS,
    Header: CARDS_COLUMNS.bankName,
  },
  {
    accessor: CARDS_COLUMNS.cardBrand,
    ...CELL_SETTINGS,
    Header: CARDS_COLUMNS.cardBrand,
    Cell: MethodCell,
  },
];

const transformNodeToRow = (cards) =>
  cards.map(({ node }) => {
    const country = getCountryName(node.country) ?? '';

    return {
      id: node?.token ?? v4(),
      [CARDS_COLUMNS.cardNumber]: node?.number ?? '',
      [CARDS_COLUMNS.cardHolder]: node?.name ?? '',
      [CARDS_COLUMNS.country]: country,
      [CARDS_COLUMNS.expiryDate]: `${node?.expMonth}/${node?.expYear}` ?? '',
      [CARDS_COLUMNS.cardType]: node?.type ?? '',
      [CARDS_COLUMNS.cardProduct]: node?.product ?? '',
      [CARDS_COLUMNS.bankName]: node?.bankName ?? '',
      [CARDS_COLUMNS.createdAt]: node?.systemCreated ?? '',
      [CARDS_COLUMNS.cardBrand]: node?.brand ?? '',
    };
  });

export { transformNodeToRow, headCells, CARDS_COLUMNS, CELL_SETTINGS };
