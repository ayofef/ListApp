import React from 'react';
import { shape } from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { DateCell, ProcessorCell, TextCellMedium } from '../../../components/table/Cells';
import IssueStatusCell from './IssueStatusCell';
import EditableCellContainer from './EditableCellContainer';
import SearchPeopleCell from './components/SearchPeopleCell';
import { EditableProcessorCell, EditableStatusCell, EditableTextCell } from './EditableCells';
import CellDropdown from './components/CellDropdown';
import { PRIORITY_OPTIONS, TYPE_OPTIONS } from './constant';

const COLUMN_NAMES = {
  customer: 'customer',
  type: 'type',
  priority: 'priority',
  date: 'created',
  creator: 'creator',
  assigneeUserId: 'assignee',
  status: 'status',
};

const formEditableCell = (props) => {
  return (
    <TableCell>
      <EditableCellContainer {...props} />
    </TableCell>
  );
};
formEditableCell.propTypes = {
  props: shape({}).isRequired,
};

const headCells = [
  {
    id: COLUMN_NAMES.customer,
    numeric: false,
    disablePadding: false,
    label: COLUMN_NAMES.customer,
    Cell: TextCellMedium,
  },
  {
    id: COLUMN_NAMES.type,
    numeric: false,
    disablePadding: false,
    label: COLUMN_NAMES.type,
    Cell: (data) =>
      formEditableCell({
        ...data,
        issueData: {
          ...data,
          assigneeUser: {
            id: data.assigneeUserId,
          },
        },
        children: <EditableTextCell />,
        EditComponent: CellDropdown,
        options: TYPE_OPTIONS,
        isPopover: true,
      }),
  },
  {
    id: COLUMN_NAMES.priority,
    numeric: false,
    disablePadding: false,
    label: COLUMN_NAMES.priority,
    Cell: (data) =>
      formEditableCell({
        ...data,
        issueData: {
          ...data,
          assigneeUser: {
            id: data.assigneeUserId,
          },
        },
        children: <EditableStatusCell />,
        EditComponent: CellDropdown,
        options: PRIORITY_OPTIONS,
        isPopover: true,
      }),
  },
  {
    id: COLUMN_NAMES.date,
    numeric: false,
    disablePadding: false,
    label: COLUMN_NAMES.date,
    Cell: DateCell,
  },
  {
    id: COLUMN_NAMES.creator,
    numeric: false,
    disablePadding: false,
    label: COLUMN_NAMES.creator,
    Cell: ProcessorCell,
  },
  {
    id: 'assigneeUserId',
    numeric: false,
    disablePadding: false,
    label: COLUMN_NAMES.assigneeUserId,
    Cell: (data) =>
      formEditableCell({
        ...data,
        issueData: {
          ...data,
          assigneeUser: {
            id: data.assigneeUserId,
          },
        },
        children: <EditableProcessorCell />,
        EditComponent: SearchPeopleCell,
        isPopover: true,
      }),
  },
  {
    id: COLUMN_NAMES.status,
    disablePadding: false,
    label: COLUMN_NAMES.status,
    Cell: IssueStatusCell,
  },
];

const transformNodeToRow = ({
  id,
  paymentId,
  type,
  customer,
  priority,
  userCreator,
  assigneeUser,
  status,
  systemCreated,
}) => ({
  id,
  paymentId,
  [COLUMN_NAMES.type]: type ?? '',
  [COLUMN_NAMES.priority]: priority ?? '',
  [COLUMN_NAMES.creator]: {
    name: userCreator?.name ?? '',
    logo: userCreator?.avatar ?? '',
  },
  assigneeUserId: {
    name: assigneeUser?.name ?? '',
    logo: assigneeUser?.avatar ?? '',
    id: assigneeUser?.id ?? '',
  },
  [COLUMN_NAMES.date]: systemCreated ?? '',
  [COLUMN_NAMES.status]: status,
  [COLUMN_NAMES.customer]: customer?.email ?? '',
});

export { transformNodeToRow, headCells };
