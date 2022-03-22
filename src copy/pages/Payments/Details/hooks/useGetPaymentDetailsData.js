import { useMemo, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_PAYMENT_GQL } from '../../../../utils/queries/payments/paymentsQueries';
import { usePaymentsDetailsContext } from '../../../DataTables/PaymentDetails/PaymentDetailsContext';
import { useCommentsContext } from '../../CommentsDrawerContent/CommentsContext';

const ISSUE_STATUS_MAP = {
  RESOLVED: 'RESOLVED',
};

const useGetPaymentDetailsData = () => {
  const { detailsId: id, issueId, issueDetails } = useParams();
  const { setPageContentData, setPageContentRefetch } = usePaymentsDetailsContext();
  const { setCommentsData } = useCommentsContext();

  const {
    replace,
    location: { pathname, search },
  } = useHistory();

  const { loading, error, data, refetch } = useQuery(GET_PAYMENT_GQL(issueId || issueDetails), {
    variables: {
      id,
      issueId: issueId || issueDetails,
    },
    skip: !id,
  });

  useEffect(() => {
    if (!issueId) {
      const fixedId = data?.listPaymentIssues?.find((issue) => issue.status !== ISSUE_STATUS_MAP.RESOLVED)?.id;
      if (fixedId) {
        replace(`${pathname}/payment-issues/${fixedId}${search}`);
      }
    }
  }, [data, issueId, pathname, replace, search]);

  const hasDataError = useMemo(() => data?.getPaymentDescribed?.some((value) => !value), [data]);

  const payment = useMemo(
    () =>
      (!hasDataError &&
        data?.getPaymentDescribed?.reduce(
          (acc, { key, ...rest }) => ({
            ...acc,
            [key]: rest,
          }),
          {}
        )) ||
      {},
    [data, hasDataError]
  );

  const intent = useMemo(() => data?.getLinkedIntent || {}, [data?.getLinkedIntent]);

  useEffect(() => {
    setPageContentData(payment);
    setPageContentRefetch(refetch);
  }, [payment, data, refetch, setPageContentData, setPageContentRefetch]);

  useEffect(() => {
    if (!loading && data) {
      setCommentsData({
        comments: data?.listPaymentComments || [],
        paymentId: id,
        issueId: issueId,
      });
    }
  }, [data, loading, id, issueId, setCommentsData]);

  return { payment, intent, loading, error, id };
};

export { useGetPaymentDetailsData };
