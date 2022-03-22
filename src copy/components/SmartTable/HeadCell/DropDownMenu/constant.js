import { PAYMENT_FIELDS } from '../../../../constants/paymentFields';

const BACKEND_SORT_DICTIONARY = {
  [PAYMENT_FIELDS.customer]: 'payment_customer',
  [PAYMENT_FIELDS.processor]: 'payment_gateway_name',
  [PAYMENT_FIELDS.method]: 'payment_method',
  [PAYMENT_FIELDS.phone]: 'payment_customer_phone',
};
const SORT_DICTIONARY = {
  none: 'undefined',
  ascending: 'asc',
  descending: 'desc',
};
const SORT_DICTIONARY_UI = {
  asc: 'ascending',
  desc: 'descending',
};

const HIDE_EDIT_MAP = ['customers', 'cards'];
const getPageDropdownOptions = (page) => [
  {
    label: 'sort',
    withIcon: true,
    subMenuLabels: ['none', 'ascending', 'descending'],
  },
  {
    label: 'hide',
  },
  ...(HIDE_EDIT_MAP.includes(page)
    ? []
    : [
        {
          label: 'edit columns',
        },
      ]),
];

const handleSort = ({ handleRequestSort, event, id }) => {
  event.stopPropagation();
  const { label } = event.currentTarget.dataset;

  handleRequestSort({
    label: BACKEND_SORT_DICTIONARY[id] ?? id?.split(' ')?.join('_'),
    value: SORT_DICTIONARY[label],
  });
};

export { BACKEND_SORT_DICTIONARY, SORT_DICTIONARY, SORT_DICTIONARY_UI, getPageDropdownOptions, handleSort };
