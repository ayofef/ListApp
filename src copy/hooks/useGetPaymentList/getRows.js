const getRows = ({ edges, transformFn }) => {
  const set = new Set();

  return edges?.reduce((acc, edge) => {
    const payment = edge?.node;
    const id = payment?.id;

    if (!id || set.has(id)) {
      return acc;
    }

    set.add(id);

    return [...acc, transformFn(payment)];
  }, []);
};

export { getRows };
