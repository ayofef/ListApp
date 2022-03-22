/* eslint-disable array-callback-return */
/* eslint-disable no-case-declarations */
import get from 'lodash/get';

const filterFn = (el, search) =>
  el
    ?.toString()
    ?.toLowerCase()
    .indexOf(search?.toString()?.toLowerCase()) > -1;

const parseBySearch = (data, search, type) => {
  return data.filter((el) => {
    const _data = el?.node ?? {};

    if (type === 'customer') {
      return (
        filterFn(_data?.name, search) ||
        filterFn(_data?.email, search) ||
        filterFn(_data?.phone, search) ||
        filterFn(_data?.description, search) ||
        filterFn(_data?.id, search) ||
        filterFn(_data?.defaultPaymentMethod, search)
      );
    }

    if (type === 'cards') {
      return (
        filterFn(_data?.name, search) ||
        filterFn(_data?.type, search) ||
        filterFn(_data?.token, search) ||
        filterFn(_data?.vaultCustomerId, search) ||
        filterFn(_data?.brand, search) ||
        filterFn(_data?.country, search) ||
        filterFn(_data?.product, search) ||
        filterFn(_data?.bankName, search) ||
        filterFn(_data?.id, search)
      );
    }

    return true;
  });
};

const SORT_DICTIONARY = {
  default_payment_method: 'defaultPaymentMethod',
  card_number: 'number',
  cardholder: 'name',
  expiry_date: 'expiryDate',
  card_type: 'type',
  card_product: 'product',
  card_brand: 'brand',
  Issuer: 'bankName',
};

const parseBySort = (data, sort) => {
  const [key, sortValue] = Object.entries(sort).flat();
  const dataKey = SORT_DICTIONARY[key] ?? key;

  if (!sortValue) {
    return data;
  }
  let sortFn;

  switch (dataKey) {
    case 'created':
      sortFn = (a, b) => new Date(a?.node?.systemCreated) - new Date(b?.node?.systemCreated);
      break;
    case SORT_DICTIONARY.expiry_date:
      sortFn = (a, b) =>
        new Date(a?.node?.expYear, a?.node?.expMonth - 1, 1) - new Date(b?.node?.expYear, b?.node?.expMonth - 1, 1);
      break;
    default:
      sortFn = (a, b) => a?.node?.[dataKey]?.localeCompare(b?.node?.[dataKey]);
      break;
  }

  const result = data?.slice()?.sort((a, b) => (sortValue === 'asc' ? sortFn(a, b) : sortFn(b, a)));

  return result;
};

const parseByFilter = (data, filter) => {
  return data.filter((dataObj) => {
    let filterResult = true;
    Object.keys(filter ?? {}).map((filterKey) => {
      const value = get(dataObj?.node, filterKey);
      const filterValue = filter[filterKey];

      if (filterKey === 'systemCreated') {
        const { lt, gt } = filterValue;
        if (lt) {
          filterResult = new Date(value) < new Date(lt);
        }
        if (gt) {
          filterResult = new Date(value) > new Date(gt);
        }

        if (lt && gt) {
          filterResult = new Date(value) < new Date(lt) && new Date(value) > new Date(gt);
        }
      }

      if (Array.isArray(filterValue)) {
        filterResult = filterValue?.includes(value?.toLowerCase());
      }

      if (typeof filterValue === 'string') {
        filterResult = value?.toLowerCase().indexOf(filter[filterKey]?.toLowerCase()) > -1;
      }
    });
    return filterResult;
  });
};

export { parseBySearch, parseBySort, parseByFilter };
