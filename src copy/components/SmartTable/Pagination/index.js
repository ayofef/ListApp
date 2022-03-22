import React from 'react';
import Box from '@material-ui/core/Box';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import { P14, P14B } from '../../atoms';
import useSearch from '../../../hooks/useSearch';
import { PageSkeleton, ButtonSkeleton } from './Skeleton';
import { StyledIconButton } from '../../atoms/Buttons/StyledIconButton';

const Pagination = ({ loading, pageInfo }) => {
  const [searchParams, setSearchParams] = useSearch();
  const { endCursor, totalPages, hasNextPage, hasPreviousPage } = pageInfo;

  const handleClick = (event) => {
    const { label } = event.currentTarget.dataset;
    const cursor = endCursor * 1;
    const page = label === 'prev' ? cursor - 1 : cursor + 1;
    setSearchParams((prevSearchParams) =>
      page === 1 ? omit(prevSearchParams, 'page') : { ...prevSearchParams, page }
    );
  };

  return (
    <Box display="flex" justifyContent="flex-start" mt="16px" alignItems="center" width="100%">
      <Box display="flex">
        {loading ? (
          <PageSkeleton />
        ) : (
          <>
            <P14>Page:</P14>&nbsp;
            <P14B>
              {endCursor} of {totalPages}
            </P14B>
          </>
        )}
      </Box>
      <Box display="flex" marginLeft="auto">
        {loading ? (
          <ButtonSkeleton />
        ) : (
          <>
            <Box minWidth="40px" minHeight="40px">
              {hasPreviousPage && (
                <Box color="#787F88">
                  <StyledIconButton data-label="prev" type="button" onClick={handleClick}>
                    <ArrowLeftIcon />
                  </StyledIconButton>
                </Box>
              )}
            </Box>
            <Box minWidth="40px" minHeight="40px">
              {hasNextPage && searchParams?.page !== totalPages && (
                <Box marginLeft="16px" color="#787F88">
                  <StyledIconButton data-label="next" type="button" onClick={handleClick}>
                    <ArrowRightIcon />
                  </StyledIconButton>
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

Pagination.propTypes = {
  loading: PropTypes.bool.isRequired,
  pageInfo: PropTypes.shape({
    endCursor: PropTypes.number,
    totalPages: PropTypes.number,
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
  }).isRequired,
};

export default Pagination;
