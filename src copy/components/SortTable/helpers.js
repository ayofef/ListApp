import keys from 'lodash/keys';

export const getOrderDataFromSearchParamsSort = (sort) => {
  const orderBy = keys(sort)?.[0];
  const order = orderBy && sort[orderBy];
  return {
    order,
    orderBy,
  };
};
