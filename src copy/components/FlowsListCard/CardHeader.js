import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { H4, L14M } from '../atoms';
import THEME from '../../constants/theme';
import { createTags } from '../../constants/createTags';
import Tag from '../atoms/Tag/Tag';

const CardHeader = ({ flowName, flowStatus, errorMessage }) => {
  const tags = useMemo(() => createTags({ status: flowStatus }, 'flows'), [flowStatus]);
  const { t } = useTranslation();

  return (
    <Box
      pb="28px"
      p="28px 24px"
      borderBottom="1px solid #E6E9EC"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box display="flex">
        <H4>{flowName}</H4>
      </Box>

      <Box display="flex" justifyContent="flex-end" alignItems="center">
        {tags?.map((tag) => (
          <Box key={tag?.title} mr="10px">
            <L14M color={THEME.greyColors.grey9}>{t(tag?.title)}</L14M>
          </Box>
        ))}
        {errorMessage && (
          <Tag
            color={THEME.statusColors.failed}
            backgroundColor="rgba(183, 66, 66, 0.1)"
            borderColor={THEME.primaryColors.white}
          >
            {t(errorMessage)}
          </Tag>
        )}

        {/* <DropDownMenu
          id="invited-user"
          button={
            <StyledButton>
              <MoreHorizIcon />
            </StyledButton>
          }
          options={options}
        /> */}
      </Box>
    </Box>
  );
};

CardHeader.propTypes = {
  flowName: PropTypes.string.isRequired,
  flowStatus: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

CardHeader.defaultProps = {
  errorMessage: null,
};

export default CardHeader;
