import { ROWS_PER_PAGE } from '../FlowMonitorDetailsDrawer/helpers';

const usePageInfo = (pageInfo) => {
  const endCursor = parseInt(pageInfo?.endCursor, 10);
  const totalPages = Math.ceil(pageInfo?.totalSize / ROWS_PER_PAGE);

  return {
    endCursor,
    hasNextPage: pageInfo?.hasNextPage,
    hasPreviousPage: pageInfo?.hasPreviousPage,
    totalSize: pageInfo?.totalSize,
    totalPages,
  };
};

export default usePageInfo;
