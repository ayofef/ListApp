const step1Options = ['ecomm', 'saas', 'marketplace', 'service based'];

const transformValuesToBool = (values) => {
  return Object.entries(values)?.reduce((acc, [key, value]) => {
    if (typeof value === 'string' && step1Options?.includes(value)) {
      return { ...acc, [key]: [value] };
    }

    if (typeof value === 'string') {
      return { ...acc, [key]: value === 'true' };
    }
    return { ...acc, [key]: value };
  }, {});
};

export { transformValuesToBool };
