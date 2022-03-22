import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { stringify } from 'qs';

import { transformFilterToSearchParams } from '../../utils/filterToSearchParams/transformFilterToSearchParams';
import { transformSortToSearchParams } from '../../utils/transformSortToSearchParams';
import { STRINGIFY_OPTIONS } from '../useSearch';
import { GQL_Q_LIST_PAYMENT_VIEW } from '../../utils/queries/payments/paymentsQueries';
import { UI_ROUTES } from '../../constants/routes';

const useGetViews = () => {
  const { data } = useQuery(GQL_Q_LIST_PAYMENT_VIEW);

  return useMemo(() => {
    return data?.listPaymentViews?.views?.reduce((acc, view) => {
      if (!view) {
        return acc;
      }

      return { ...acc, [view.id]: view };
    }, {});
  }, [data?.listPaymentViews?.views]);
};

const useGetViewLinks = () => {
  const { loading, error, data, ...rest } = useQuery(GQL_Q_LIST_PAYMENT_VIEW);

  const links = useMemo(() => {
    const listPaymentViews = data?.listPaymentViews?.views;

    return (
      listPaymentViews?.map((view) => {
        const sort = transformSortToSearchParams(view?.sort);
        const filter = transformFilterToSearchParams(view?.filter);

        return {
          id: view?.id,
          title: view?.name,
          to: {
            pathname: `${UI_ROUTES.payments}/views/${view?.id}`,
            search: `?${stringify({ ...(filter && { filter }), ...(sort && { sort }) }, STRINGIFY_OPTIONS)}`,
          },
        };
      }) ?? []
    );
  }, [data?.listPaymentViews?.views]);

  return { loading, error, links, ...rest };
};

export { useGetViewLinks, useGetViews };
