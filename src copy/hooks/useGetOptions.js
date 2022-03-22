import { gql, useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';

import CircleImage from '../components/atoms/CircleImage/CircleImage';
import { CircleIndicator } from '../components/atoms/Indicator';
import { useGetCustomers } from './dataTables/useGetCustomers';
import { useGetCards } from './dataTables/useGetCards';
import { STATUS_UI_LABEL_MAP, transformStatusUiLabel } from '../components/table/Cells/constant';
import useGetPaymentFlow from './useGetPaymentFlow';

const AND_SEARCH_KEY = '__AND__';

/**
 *
 * @param {Array<String>} data
 * @param {*Boolean} skipLowerCase
 * @param hasReservedCharacter
 * @returns {Array<Object>}
 */
const createUniqueOptions = (data, skipLowerCase, hasReservedCharacter) => {
  if (!Array.isArray(data)) {
    return [];
  }

  const set = new Set();

  return data.reduce((acc, item) => {
    const value = skipLowerCase ? item : item?.toLowerCase();

    if (!value || set.has(value)) {
      return acc;
    }

    set.add(value);

    //& character is reserved for search params
    if (hasReservedCharacter && item.includes('&')) {
      return [...acc, { value: value.replace(/&/g, AND_SEARCH_KEY), title: item.toUpperCase() }];
    }

    return [...acc, { value, title: item.toUpperCase() }];
  }, []);
};

const useGetStatuses = () => {
  const { loading, data } = useQuery(
    gql`
      {
        listPaymentFilterValues {
          statuses
        }
      }
    `
  );

  const options = useMemo(
    () =>
      data?.listPaymentFilterValues?.statuses?.reduce((acc, item) => {
        if (typeof item !== 'string') return acc;

        const value = item.toLowerCase();

        return [
          ...acc,
          {
            value,
            title: (
              <CircleIndicator variant={value}>
                {STATUS_UI_LABEL_MAP[item]?.toUpperCase() || transformStatusUiLabel(item)}
              </CircleIndicator>
            ),
          },
        ];
      }, []) || [],
    [data?.listPaymentFilterValues?.statuses]
  );

  return { loading, options };
};

const useGetCurrencies = () => {
  const { loading, data } = useQuery(
    gql`
      {
        listPaymentFilterValues {
          currencies
        }
      }
    `
  );

  const options = useMemo(() => createUniqueOptions(data?.listPaymentFilterValues?.currencies), [
    data?.listPaymentFilterValues?.currencies,
  ]);

  return { loading, options };
};

const Title = ({ name, logoUrl }) => (
  <Box display="flex" alignItems="center">
    <CircleImage src={logoUrl} size={20} margin="0 10px 0 0" alt={`logo ${name}`} />

    <Box component="span">{name}</Box>
  </Box>
);
Title.propTypes = {
  name: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
};

const useGetPaymentGateways = () => {
  const { loading, data } = useQuery(
    gql`
      query listPaymentFilterValues {
        listPaymentFilterValues {
          paymentGateways {
            id
            name
            logo
          }
        }
      }
    `
  );
  const paymentGateways = useMemo(() => data?.listPaymentFilterValues?.paymentGateways ?? [], [data]);
  const options = useMemo(
    () =>
      data?.listPaymentFilterValues?.paymentGateways?.map((item) => {
        return { value: item.name, title: <Title name={item.name} logoUrl={item.logo} /> };
      }) || [],
    [data]
  );

  return { loading, options, paymentGateways };
};

const useGetMethod = () => {
  const { loading, data: queryData } = useQuery(
    gql`
      {
        listPaymentFilterValues {
          paymentMethods
        }
      }
    `
  );
  const data = queryData?.listPaymentFilterValues?.paymentMethods;

  const options = useMemo(() => createUniqueOptions(data), [data]);

  return { loading, options };
};

const useGetCategories = () => {
  const { loading, data } = useQuery(
    gql`
      {
        listPaymentFilterValues {
          categories
        }
      }
    `
  );

  const options = useMemo(() => createUniqueOptions(data?.listPaymentFilterValues?.categories, true, true), [
    data?.listPaymentFilterValues?.categories,
  ]);

  return { loading, options };
};

const useGetFlowFilter = () => {
  const { flow, loading } = useGetPaymentFlow();

  const options = useMemo(() => {
    const instructAutomations = flow.automations?.filter((automation) => automation.instruct);
    const instructAutomationsOptions = instructAutomations?.map((automation) => ({
      title: automation.name,
      value: automation.id,
    }));

    return instructAutomationsOptions ?? [];
  }, [flow]);

  return { loading, options };
};

const useGetCountries = () => {
  const { loading, data } = useQuery(
    gql`
      query listPaymentFilterValues {
        listPaymentFilterValues {
          countries {
            name
            alpha3
          }
        }
      }
    `
  );

  const options = useMemo(() => {
    const countries = data?.listPaymentFilterValues?.countries;

    if (!Array.isArray(countries)) {
      return [];
    }

    const set = new Set();

    return countries.reduce(
      (acc, country) => {
        const value = country?.alpha3;

        if (!value || set.has(value)) {
          return acc;
        }
        set.add(value);

        return [...acc, { value, title: country.name }];
      },
      [{ value: 'Intl', title: 'Other' }]
    );
  }, [data?.listPaymentFilterValues?.countries]);

  return { loading, options };
};

const createOptions = (arr) => arr.map((title) => ({ value: title.toLowerCase(), title }));

const useGetType = () =>
  useMemo(
    () => ({
      options: createOptions(['Payment', 'Payout', 'Transfer']),
    }),
    []
  );

const useGetIssueStatuses = () =>
  useMemo(
    () => ({
      options: createOptions(['Open', 'Refunded', 'Resolved', 'Completed']),
    }),
    []
  );

const useGetIntentStatuses = () =>
  useMemo(
    () => ({
      options: createOptions(['Intent', 'Active', 'Inactive', 'Complete']),
    }),
    []
  );

const useGetIssueType = () =>
  useMemo(
    () => ({
      options: createOptions(['Customer', 'Issuer']),
    }),
    []
  );

const useGetIssuePriority = () =>
  useMemo(
    () => ({
      options: createOptions(['High', 'Medium', 'Low']),
    }),
    []
  );

/**CUSTOMERS */
const useGetCustomerDefaultPaymentMethod = () => {
  const { loading, customers } = useGetCustomers(99);

  const getPaymentMethod = useMemo(() => customers.map(({ node }) => node?.defaultPaymentMethod), [customers]);

  const options = useMemo(() => createUniqueOptions(getPaymentMethod) ?? createOptions(['Credit', 'Debit']), [
    getPaymentMethod,
  ]);
  return { loading, options };
};
/**CARDS*/
const useGetCardsCountry = () => {
  const { loading, cards } = useGetCards(99);

  const getCountries = useMemo(() => cards.map(({ node }) => node?.country), [cards]);
  const options = useMemo(() => createUniqueOptions(getCountries), [getCountries]);

  return { loading, options };
};
const useGetBankName = () => {
  const { loading, cards } = useGetCards(99);

  const getBankNames = useMemo(() => cards.map(({ node }) => node?.bankName), [cards]);
  const options = useMemo(() => createUniqueOptions(getBankNames), [getBankNames]);

  return { loading, options };
};
const useGetCardTypes = () => {
  const { loading, cards } = useGetCards(99);

  const getCardTypes = useMemo(() => cards.map(({ node }) => node?.type), [cards]);
  const options = useMemo(() => createUniqueOptions(getCardTypes), [getCardTypes]);

  return { loading, options };
};
const useGetCardProduct = () => {
  const { loading, cards } = useGetCards(99);

  const getCardProducts = useMemo(() => cards.map(({ node }) => node?.product), [cards]);
  const options = useMemo(() => createUniqueOptions(getCardProducts), [getCardProducts]);

  return { loading, options };
};
const useGetCardBrand = () => {
  const { loading, cards } = useGetCards(99);

  const getCardBrands = useMemo(() => cards.map(({ node }) => node?.brand), [cards]);
  const options = useMemo(() => createUniqueOptions(getCardBrands), [getCardBrands]);

  return { loading, options };
};

export {
  useGetStatuses,
  useGetCurrencies,
  useGetFlowFilter,
  useGetCategories,
  useGetPaymentGateways,
  useGetMethod,
  useGetType,
  useGetCountries,
  useGetIssueStatuses,
  useGetIssueType,
  useGetIssuePriority,
  useGetIntentStatuses,
  useGetCustomerDefaultPaymentMethod,
  useGetCardsCountry,
  useGetBankName,
  useGetCardTypes,
  useGetCardProduct,
  useGetCardBrand,
  AND_SEARCH_KEY,
};
