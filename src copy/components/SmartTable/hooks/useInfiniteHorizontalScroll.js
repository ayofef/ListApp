import { useRef, useCallback, useState, useEffect } from 'react';
import chunk from 'lodash/chunk';

const DEFAULT_MAX = 8;
const OBSERVER_MAX = 5;

const useInfiniteHorizontalScroll = ({ headCells, checkboxEditMode, defaultVisibleColumns }) => {
  const [hasMore, setHasMore] = useState(false);
  const [chunkedColumns, setChunkedColumns] = useState([]);

  const loaderRef = useRef(null);

  useEffect(() => {
    const defaultVisibleColumnsLength = defaultVisibleColumns.length;
    const defaultChunkLength = defaultVisibleColumnsLength < DEFAULT_MAX ? DEFAULT_MAX : defaultVisibleColumnsLength;

    const filteredColumns = headCells.filter(Boolean);

    const chunks = chunk(filteredColumns, defaultChunkLength);
    const currentlyHasMore = chunks.length > 1;

    setHasMore(currentlyHasMore);
    setChunkedColumns(chunks[0] || []);

    return () => {
      setHasMore(false);
      setChunkedColumns([]);
    };

    /**
     * Note: defaultVisibleColumns should not be added as a dependency as it causes inconsistent horizontal scroll position when user checks/unchecks a column.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headCells, checkboxEditMode]);

  const loaderRefFn = useCallback(
    (node) => {
      if (loaderRef.current) loaderRef.current.disconnect?.();
      loaderRef.current = new IntersectionObserver((entries) => {
        // Update chunkedColumns and check if there are more templates left

        if (entries?.[0]?.isIntersecting && hasMore) {
          const newMax = chunkedColumns.length + OBSERVER_MAX;
          const newChunks = chunk(headCells.filter(Boolean), newMax);
          const newHasMore = newChunks.length > 1;

          setHasMore(newHasMore);
          setChunkedColumns(newChunks[0] || []);
        }
      });

      if (node) loaderRef.current.observe?.(node);
    },
    [hasMore, chunkedColumns, headCells]
  );

  return {
    loaderRefFn,
    chunkedColumns,
  };
};

export default useInfiniteHorizontalScroll;
