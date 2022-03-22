import { GT, BT, LT } from '../../../../../utils/filterToSearchParams/constants';

const OPTIONS = [
  { value: GT, title: 'After' },
  { value: LT, title: 'Before' },
  { value: BT, title: 'Between' },
];
const RANGE_OPTIONS = [
  {
    value: 'today',
    text: { text: 'Today' },
  },
  {
    value: 'yesterday',
    text: { text: 'Yesterday' },
  },
  {
    value: 'this_week',
    text: { text: 'This week' },
  },
  {
    value: 'last_7_days',
    text: { text: 'Last 7 days' },
  },
  {
    value: 'this_month',
    text: { text: 'This month' },
  },
  {
    value: 'last_month',
    text: { text: 'Last month' },
  },
  {
    value: 'this_year',
    text: { text: 'This year' },
  },
];

export { OPTIONS, RANGE_OPTIONS };
