import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PaymentFlow from '../../../assets/icons/EmptyStates/PaymentFlow';
import { StyledBox } from './styled';
import ListEmptyState from '../../../components/ListEmptyState';

const skeletonArray = Array.from(Array(5).keys());

const TITLE_MAP = {
  drafts: 'draft',
};

const TITLE = (currentPage) => `You currently have no ${TITLE_MAP[currentPage] ?? currentPage} flows`;
const DESCRIPTION_MAP = {
  drafts: 'Once you create a draft flow you’ll see it here.',
  published: 'Once you publish flow you’ll see it here.',
  all: 'Once you create a flow you’ll see it here.',
};

const EmptyState = ({ currentPage }) => {
  return (
    <Box height="calc(100vh - 120px)" overflow="hidden">
      {skeletonArray.map((el) => (
        <StyledBox key={el} mb="24px">
          <PaymentFlow />
          <Box className="MoreHorizIcon" position="absolute" right="24px" top="24px">
            <MoreHorizIcon />
          </Box>
        </StyledBox>
      ))}
      <ListEmptyState title={TITLE(currentPage)} description={DESCRIPTION_MAP[currentPage] ?? DESCRIPTION_MAP.all} />
    </Box>
  );
};

EmptyState.propTypes = {
  currentPage: PropTypes.string,
};

EmptyState.defaultProps = {
  currentPage: '',
};

export default EmptyState;
