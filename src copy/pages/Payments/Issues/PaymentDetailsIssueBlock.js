import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { GET_ISSUE_DETAILS } from '../../../utils/queries/issues/issuesQueries';
import { useLoadingIndicator } from '../../../hooks/useLoadingIndicator';
import { globalLoadingConst } from '../../../constants/globalLoadingConsts';
import { ISSUES_DATA_KEYS, ISSUES_DETAILS_COLUMN_MAP } from './constant';
import { P16B, ButtonRounded } from '../../../components/atoms';
import { usePaymentsDetailsContext } from '../../DataTables/PaymentDetails/PaymentDetailsContext';
import IssuesPriorityComponent from './PaymentIssuesBlockComponents/IssuesPriorityComponent';
import CreatorAssigneeComponent from './PaymentIssuesBlockComponents/CreatorAssigneeComponent';
import IssueTypeComponent from './PaymentIssuesBlockComponents/IssueTypeComponent';
import DateComponent from './PaymentIssuesBlockComponents/DateComponent';
import StatusComponent from './PaymentIssuesBlockComponents/StatusComponent';

const COMPONENT_MAP = {
  [ISSUES_DETAILS_COLUMN_MAP.issueType]: IssueTypeComponent,
  [ISSUES_DETAILS_COLUMN_MAP.issueDate]: DateComponent,
  [ISSUES_DETAILS_COLUMN_MAP.issuesAssigneeCreator]: CreatorAssigneeComponent,
  [ISSUES_DETAILS_COLUMN_MAP.issuePriority]: IssuesPriorityComponent,
  [ISSUES_DETAILS_COLUMN_MAP.issueStatus]: StatusComponent,
};

const PaymentDetailsIssueBlock = () => {
  const { t } = useTranslation();
  const { toggleCreateIssuesModal } = usePaymentsDetailsContext();
  const { detailsId: paymentId, issueId } = useParams();

  const { loading, error, data, refetch } = useQuery(GET_ISSUE_DETAILS, {
    variables: {
      paymentIssueId: issueId,
    },
    skip: !issueId,
  });

  useLoadingIndicator(globalLoadingConst.listIssue, loading);

  const issueData = useMemo(() => (!error && data?.getPaymentIssue ? data?.getPaymentIssue : {}), [
    data?.getPaymentIssue,
    error,
  ]);

  const newCols = isEmpty(issueData)
    ? []
    : ISSUES_DATA_KEYS.map((key) => {
        const Component = COMPONENT_MAP[key];

        return {
          key,
          children: <Component dataKey={key} issueData={issueData} refetch={refetch} />,
        };
      });

  const noData = !issueData || Object.keys(issueData).length === 0;

  return (
    <Box component="section" mt="40px" mb="32px">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <P16B>{t('Issues')}</P16B>
        {noData && paymentId && (
          <ButtonRounded type="button" variant="text" color="primary" onClick={toggleCreateIssuesModal}>
            {t('Create New')}
          </ButtonRounded>
        )}
      </Box>

      {noData && (
        <Box display="flex" marginTop="24px" justifyContent="center">
          <Box color="#787F88">No open issues.</Box>
        </Box>
      )}

      <Box display="flex" alignItems="center" justifyContent="space-between" mt="12px">
        {newCols.map((col) => (
          <Box key={col.key}>{col.children || 'N/A'}</Box>
        ))}
      </Box>
    </Box>
  );
};

export default PaymentDetailsIssueBlock;
