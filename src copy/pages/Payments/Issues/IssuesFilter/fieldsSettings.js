import * as Yup from 'yup';
import { SEARCH_KEYS } from '../../../../utils/filterToSearchParams/constants';
import FieldsWithSelect from '../../FilterList/fields/FieldsWithSelect';
import { OPTIONS as dateOptions } from '../../FilterList/fields/DateField/settings';
import CustomDateField from '../../FilterList/fields/DateField/CustomField';
import AsyncFieldset from '../../FilterList/fields/AsyncFieldset';
import { createFilterPropsFromSettings } from '../../../../utils/createFilterPropsFromSettings';
import { useGetIssueStatuses, useGetIssueType, useGetIssuePriority } from '../../../../hooks/useGetOptions';

const FIELDS_SETTINGS = [
  {
    name: SEARCH_KEYS.issueStatus,
    label: 'status',
    component: AsyncFieldset,
    props: { useGetOptions: useGetIssueStatuses },
    defaultValue: [],
  },
  {
    name: SEARCH_KEYS.issueType,
    label: 'type',
    component: AsyncFieldset,
    props: { useGetOptions: useGetIssueType },
    defaultValue: [],
  },
  {
    name: SEARCH_KEYS.issuePriority,
    label: 'priority',
    component: AsyncFieldset,
    props: { useGetOptions: useGetIssuePriority },
    defaultValue: [],
  },
  {
    name: SEARCH_KEYS.date,
    label: 'date',
    component: FieldsWithSelect,
    props: { options: dateOptions, component: CustomDateField, divider: 'and' },
    defaultValue: {},
  },
];

const { FIELDS, SHAPE, DEFAULT_VALUES } = createFilterPropsFromSettings(FIELDS_SETTINGS);

const validationSchema = Yup.object().shape(SHAPE);

export { FIELDS, validationSchema, DEFAULT_VALUES };
