// import { ThirdParty, Columns, DownloadIcon, FilterListIcon, Reset, Export } from '../../../assets/icons';
import { Columns, DownloadIcon, FilterListIcon, Reset, Export } from '../../../assets/icons';

const noop = () => {};

const DICTIONARY = {
  options: 'options',
  home: 'home',
  column: 'edit columns',
  filter: 'filter data',
  data: 'add third party data',
  save: 'save view',
  reset: 'reset view',
  export: 'export view',
};

const HIDE_EXPORT_MAP = ['customers', 'cards'];

const options = ({ page }) => [
  {
    icon: Columns,
    label: DICTIONARY.column,
    subMenu: true,
  },

  {
    icon: FilterListIcon,
    label: DICTIONARY.filter,
    subMenu: true,
  },
  //       {
  //         icon: ThirdParty,
  //         label: DICTIONARY.data,
  //         subMenu: true,
  //       },
  ...(HIDE_EXPORT_MAP.includes(page)
    ? []
    : [
        {
          icon: Export,
          label: DICTIONARY.export,
        },
      ]),
  ...(!HIDE_EXPORT_MAP.includes(page)
    ? [
        {
          icon: DownloadIcon,
          label: DICTIONARY.save,
        },
      ]
    : []),
  {
    icon: Reset,
    label: DICTIONARY.reset,
  },
];

const subMenuHeader = {
  [DICTIONARY.column]: 'column',
  [DICTIONARY.filter]: 'filter',
  [DICTIONARY.data]: 'Add data',
};

const subMenuDescription = {
  [DICTIONARY.column]: 'choose which columns to show',
};

export { options, noop, subMenuDescription, subMenuHeader, DICTIONARY, HIDE_EXPORT_MAP };
