import isEmpty from 'lodash/isEmpty';
import StatusCell from '../../../../components/SortTable/Cells/StatusCell';
import CountCell from '../../../../components/SortTable/Cells/CountCell';
import { ACTIVE_STATUSES } from '../../../FlowDetailsPage/Automation/AutomationBar/constant';
import NameWithDraftCell from '../../../../components/SortTable/Cells/NameWithDraftCell';
import ErrorIconCell from '../../../../components/SortTable/Cells/ErrorIconCell';
import { createTags } from '../../../../constants/createTags';

export const COLUMN_NAMES = {
  name: 'name',
  error: '',
  status: 'status',
  runs: 'runs',
  runWithIssues: 'run with issues',
  actions: '',
};

export const headCells = [
  {
    id: COLUMN_NAMES.name,
    label: COLUMN_NAMES.name,
    Cell: NameWithDraftCell,
  },
  {
    id: COLUMN_NAMES.status,
    label: COLUMN_NAMES.status,
    Cell: StatusCell,
  },
  {
    id: COLUMN_NAMES.runs,
    label: COLUMN_NAMES.runs,
    tooltip: 'How many times the automation attempted to run',
    sortable: true,
    Cell: CountCell,
  },
  {
    id: 'error',
    label: COLUMN_NAMES.error,
    Cell: ErrorIconCell,
  },
];

const checkError = (config) => config?.steps?.some((step) => step?.validationErrors?.length > 0);

export const getRows = (automationsList, push) => {
  return automationsList?.map((automation) => {
    const [status] = createTags(automation, 'flows');
    const hasDraft = ACTIVE_STATUSES.includes(automation?.status) && !isEmpty(automation?.draftConfig);
    const hasDraftErrors = Boolean(checkError(automation?.draftConfig));
    const hasErrors = Boolean(checkError(automation?.config));
    const systemCreated = automation?.config?.systemCreated || automation?.draftConfig?.systemCreated;
    const systemUpdated = automation?.config?.systemUpdated || automation?.draftConfig?.systemUpdated;

    const handleEdit = (e) => {
      e.stopPropagation();
      push({
        pathname: `/automations/${automation?.id}/editor`,
        state: { prevRoute: 'flow' },
      });
    };
    return {
      id: automation?.id,
      name: automation?.name,
      errors: automation?.errorCount,
      draft: automation?.status === 'NEVER_PUBLISHED',
      running: ACTIVE_STATUSES.includes(automation?.status),
      instruct: automation?.instruct,
      systemCreated,
      systemUpdated,
      error: {
        hasErrors,
        hasDraftErrors,
      },
      status: {
        status,
        hasDraft,
      },
      runs: {
        total: automation?.flowInstanceCount,
        withIssues: automation?.errorCount,
      },
      actions: {
        automationId: automation?.id,
        automationName: automation?.name,
        automationStatus: automation?.status,
        hasDraft,
        hasDraftErrors,
        handleEdit,
      },
    };
  });
};
