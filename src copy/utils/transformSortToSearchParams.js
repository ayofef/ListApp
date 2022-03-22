export const transformSortToSearchParams = (sort) => sort && { [sort[0]?.fieldName]: sort[0]?.order?.toLowerCase() };
