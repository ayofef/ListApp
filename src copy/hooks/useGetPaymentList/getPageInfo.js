import { ROWS_PER_PAGE } from './constant';

const getPageInfo = ({ pageInfo }) => {
  const endCursor = parseInt(pageInfo?.endCursor, 10);
  const totalPages = Math.ceil(pageInfo?.totalSize / ROWS_PER_PAGE);

  return {
    endCursor,
    hasNextPage: pageInfo?.hasNextPage,
    hasPreviousPage: pageInfo?.hasPreviousPage,
    totalPages,
  };
};

export { getPageInfo };
