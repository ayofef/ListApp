import React, { useRef } from 'react';
import { arrayOf, func, string, shape, bool } from 'prop-types';

import styled from 'styled-components';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import { useUpdateIssue } from './issuesHooks';

export const FieldCover = styled.div`
  background: ${({ isEditing }) => (isEditing ? 'white' : 'transparent')};
  position: relative;
  cursor: text;
  border-radius: 4px;
  &:hover {
    background-color: ${({ isEditing }) => (isEditing ? 'white' : '#E6E9EC')};
  }
`;

const TOAST_TIMEOUT = 5000;

const EditableField = ({
  children,
  EditComponent,
  issueData,
  refetch,
  options,
  isPopover,
  fieldKey,
  padding,
  pseudoWidth,
  ...rest
}) => {
  const selectedData = useRef(null);
  const { updateIssue } = useUpdateIssue();
  const { t } = useTranslation();

  const updateSpecificIssue = (issuedData) => {
    const params = {
      assigneeUserId: issuedData.assigneeUser.id,
      priority: issuedData.priority,
      type: issuedData.type,
      status: issuedData.status,
    };
    const value = selectedData.current.target?.value || selectedData.current;

    updateIssue({
      variables: {
        paymentId: rest.paymentId || issuedData.paymentId,
        paymentIssueId: rest.rowId,
        paymentIssue: {
          ...params,
          [fieldKey]: value,
        },
      },
    }).then((res) => {
      if (!res.errors) {
        if (refetch) {
          refetch();
        }
        NotificationManager.success('Issue have been updated', t('uiMessages.great'), TOAST_TIMEOUT);
      } else {
        NotificationManager.error('Issues update error', t('uiMessages.error'), TOAST_TIMEOUT);
      }
    });
  };

  const handleChange = (data) => {
    selectedData.current = data;
    updateSpecificIssue(issueData);
  };

  return (
    <EditComponent padding={padding} pseudoWidth={pseudoWidth} options={options} handleChange={handleChange}>
      {React.Children.map(children, (child) => React.cloneElement(child, rest))}
    </EditComponent>
  );
};

EditableField.propTypes = {
  value: string.isRequired,
  updateValue: func.isRequired,
  reset: func.isRequired,
  options: arrayOf(shape({})),
  EditComponent: func.isRequired,
  refetch: func,
  issueData: shape({
    assigneeUser: shape({
      id: string,
    }),
    priority: string,
    type: string,
    status: string,
    paymentId: string,
  }),
  isPopover: bool,
  fieldKey: string.isRequired,
  padding: string,
  pseudoWidth: string,
};
EditableField.defaultProps = {
  options: null,
  refetch: () => null,
  issueData: null,
  isPopover: false,
  padding: undefined,
  pseudoWidth: undefined,
};

export default EditableField;
