import React from 'react';
import { arrayOf, string, shape } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Box, capitalize } from '@material-ui/core';
import { P14 } from '../../../../components/atoms';
import THEME from '../../../../constants/theme';
import { ConnectionTileLogo } from '../../Directory/styled';
import GradientActionTriggerIcon from '../../../../assets/icons/GradientActionTrigger';
import { isDefined } from '../../../../utils/helpers';
import ListEmptyState from '../../../../components/ListEmptyState';

const LOGO_SIZE = '40px';
const TITLE = ({ type }) => `${capitalize(type ?? '')} coming soon`;
const DESC = ({ type, connectionName }) =>
  `${connectionName} ${type} will appear here. We’ll let you know once they are available.`;

const TabContent = ({ itemsArray, type, connectionName, connectionLogo }) => {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      width="100%"
      margin="32px 0 0"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      {isEmpty(itemsArray) && (
        <Box minHeight="300px">
          <ListEmptyState title={TITLE({ type })} description={DESC({ type, connectionName })} />
        </Box>
      )}
      {!isEmpty(itemsArray) &&
        itemsArray?.map((data) => (
          <Box
            p="20px"
            key={data?.name}
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            width="243px"
            margin="0 16px 16px 0 "
            border="1px solid #e6e9ec"
            borderRadius="8px"
          >
            {isDefined(connectionLogo) ? (
              <ConnectionTileLogo height={LOGO_SIZE} width={LOGO_SIZE} img={connectionLogo}>
                <img src={connectionLogo} alt={connectionName} />
              </ConnectionTileLogo>
            ) : (
              <GradientActionTriggerIcon />
            )}

            <P14
              margin="0 0 0 16px"
              width="85%"
              fontSize="16px"
              fontWeight="400"
              color={THEME.greyColors.grey11}
              lineHeight="20px"
            >
              {data?.name}
            </P14>
          </Box>
        ))}
    </Box>
  );
};

TabContent.propTypes = {
  itemsArray: arrayOf(
    shape({
      label: string,
      icon: shape({}),
    })
  ).isRequired,
  type: string.isRequired,
  connectionName: string.isRequired,
  connectionLogo: string.isRequired,
};
export default TabContent;
