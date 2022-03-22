const buildValidator = (schema) => (values) =>
  schema
    .validate(values, { abortEarly: false })
    .then(() => null)
    .catch(({ inner }) =>
      inner.reduce((acc, { path, message }) => {
        acc[path] = acc[path] || [];
        acc[path].push(message);
        return acc;
      }, {})
    );

export default buildValidator;
