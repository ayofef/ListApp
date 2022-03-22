export const getFirstErrorMessage = (errors) => {
  return errors?.[0]?.message;
};
