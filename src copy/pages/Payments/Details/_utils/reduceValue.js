/**
 * @param {Array<{ key: string, value: any }>} values
 * */
const reduceValue = (values) => values?.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {}) ?? {};

export default reduceValue;
