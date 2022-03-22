import React, { useMemo, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import capitalize from '@material-ui/core/utils/capitalize';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIosRounded';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import flatten from 'lodash/flatten';
import { useTranslation } from 'react-i18next';
import { SIDEBAR_WIDTH, CATEGORY_KEY, RECOMMENDATION_KEY } from '../constant';
import { StyledList, ListItem, StyledButton } from './styled';
import { useGetAutomationTemplates } from '../../../../hooks/useGetAutomationTemplates';
import LoadingState from './LoadingState';
import useSearch from '../../../../../../hooks/useSearch';
import { parseCategoryLabel } from '../../constant';
import { isDefined } from '../../../../../../utils/helpers';

const SideBar = () => {
  const { t } = useTranslation();

  const { templates, loading } = useGetAutomationTemplates();
  const [searchParams, setSearchParams] = useSearch();

  const categories = useMemo(() => {
    const tagArr = flatten(templates?.map((el) => el?.categories));
    return [...new Set(tagArr?.map((tag) => tag?.toLowerCase()))];
  }, [templates]);
  const allIsActive = useMemo(() => !isDefined(searchParams?.[CATEGORY_KEY]), [searchParams]);

  const handleAllCategory = useCallback(() => {
    setSearchParams((prevState) => omit(prevState, [CATEGORY_KEY]));
  }, [setSearchParams]);

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      const { category } = e.currentTarget.dataset;
      setSearchParams((prevState) => ({ ...prevState, [CATEGORY_KEY]: category }));
    },
    [setSearchParams]
  );

  return (
    <Box
      component="aside"
      position="fixed"
      display="block"
      height="min-content"
      width={SIDEBAR_WIDTH}
      bgcolor="#fff"
      boxSizing="border-box"
      zIndex={999}
    >
      <StyledList>
        {loading && <LoadingState />}
        {!loading && !isEmpty(templates) && (
          <>
            <ListItem>
              <StyledButton type="button" isActive={allIsActive} onClick={handleAllCategory}>
                {t('All')} <ArrowForwardIosIcon />
              </StyledButton>
            </ListItem>

            <ListItem>
              <StyledButton
                type="button"
                onClick={handleClick}
                data-category={RECOMMENDATION_KEY}
                isActive={searchParams?.[CATEGORY_KEY] === RECOMMENDATION_KEY}
              >
                {capitalize(t(RECOMMENDATION_KEY))} <ArrowForwardIosIcon />
              </StyledButton>
            </ListItem>

            {categories.map((el) => {
              const isActive = searchParams?.[CATEGORY_KEY] === el;
              return (
                <ListItem key={el}>
                  <StyledButton type="button" onClick={handleClick} data-category={el} isActive={isActive} capitalize>
                    {t(parseCategoryLabel(el))} <ArrowForwardIosIcon />
                  </StyledButton>
                </ListItem>
              );
            })}
          </>
        )}
      </StyledList>
    </Box>
  );
};

export default SideBar;
