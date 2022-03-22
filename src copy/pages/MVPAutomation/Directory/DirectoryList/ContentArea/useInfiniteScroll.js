import { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import chunk from 'lodash/chunk';

import { CATEGORY_KEY, RECOMMENDATION_KEY } from '../constant';
import { useGetAutomationTemplates } from '../../../../FlowDetailsPage/hooks/useGetAutomationTemplates';

import useSearch from '../../../../../hooks/useSearch';
import { isDefined } from '../../../../../utils/helpers';

const DEFAULT_MAX = 20;
const OBSERVER_MAX = 10;

const useInfiniteScroll = () => {
  const [hasMore, setHasMore] = useState(false);
  const [templateList, setTemplateList] = useState([]);

  const { templates, loading, recommendedTemplates, paymentProcessingBaseTemplate } = useGetAutomationTemplates();
  const [searchParams] = useSearch();
  // Apply search filter
  const filteredTemplates = useMemo(() => {
    if (searchParams?.[CATEGORY_KEY] === RECOMMENDATION_KEY) {
      return recommendedTemplates;
    }
    return isDefined(searchParams?.[CATEGORY_KEY])
      ? templates.filter((template) => {
          const categories = template?.categories?.map((cat) => cat?.toLowerCase());
          return categories?.includes(searchParams?.[CATEGORY_KEY]);
        })
      : templates;
  }, [templates, searchParams, recommendedTemplates]);

  // set filteredTemplates to templateList
  useEffect(() => {
    const chunks = chunk(filteredTemplates, DEFAULT_MAX);
    const currentlyHasMore = chunks?.length > 1;

    setHasMore(currentlyHasMore);
    setTemplateList(chunks[0] || []);
  }, [filteredTemplates]);

  const loaderRef = useRef(null);

  const loaderRefFn = useCallback(
    (node) => {
      if (loaderRef.current) loaderRef?.current?.disconnect?.();
      loaderRef.current = new IntersectionObserver((entries) => {
        // Update templateList and check if there are more templates left
        if (entries?.[0]?.isIntersecting && hasMore) {
          const newMax = templateList?.length + OBSERVER_MAX;
          const newChunks = chunk(filteredTemplates, newMax);
          const newHasMore = newChunks?.length > 1;

          setHasMore(newHasMore);
          setTemplateList(newChunks[0]);
        }
      });

      if (node) loaderRef?.current?.observe?.(node);
    },
    [hasMore, filteredTemplates, templateList]
  );

  return { loaderRefFn, loading, templateList, paymentProcessingBaseTemplate, templates };
};

export { useInfiniteScroll };
