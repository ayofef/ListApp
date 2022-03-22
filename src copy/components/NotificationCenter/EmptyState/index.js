import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
// import withStyles from '@material-ui/core/styles/withStyles';
import { useTranslation } from 'react-i18next';

import { P14, P14B } from '../../atoms';
import Actions from '../../../assets/icons/EmptyStates/Actions';
import Inbox from '../../../assets/icons/EmptyStates/Inbox';
import ActionsLine from '../../../assets/icons/EmptyStates/ActionsLine';
import { StyledBox, StyledLineBox } from './styled';

const skeletonArray = Array.from(Array(3).keys());

const ListEmptyState = ({ title, description, type }) => {
  const { t } = useTranslation();

  return (
    <Box mt="32px">
      <Box>
        {skeletonArray.map((key) => (
          <StyledLineBox key={key} opacity={key + 2.4} mb="20px">
            <ActionsLine />
          </StyledLineBox>
        ))}
      </Box>
      <StyledBox position="absolute" top="70px" left="50%" textAlign="center" width="100%">
        <Box>
          {type === 'inbox' && <Inbox />}
          {type === 'actions' && <Actions />}
        </Box>
        <P14B margin="0 0 8px 0">{t(title)}</P14B>
        <P14 color="#545A61">{t(description)}</P14>
      </StyledBox>
    </Box>
  );
};

ListEmptyState.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['inbox', 'actions']).isRequired,
};

export default ListEmptyState;
