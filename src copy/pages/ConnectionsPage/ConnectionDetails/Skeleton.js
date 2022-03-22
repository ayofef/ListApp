import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';

const generateArray = (n) => Array.from(Array(n).keys());
const descriptionArray = generateArray(2);
const buttonArray = generateArray(2);
const tabArray = generateArray(2);
const triggerActionItemArray = generateArray(6);

const ConnectionDetailsSkeleton = () => (
  <Box width="100%" m="50px 0px">
    {/*CONNECT BLOCK */}
    <Box display="flex">
      {/*TITLE */}
      <Box mr="40px" display="flex" flex={1}>
        <Box marginBottom="16px" borderRadius="50%" width="80px" height="80px" overflow="hidden" mr="16px">
          <Skeleton variant="rect" height={90} width={90} animation="wave" />
        </Box>
        <Box>
          <Box borderRadius="6px" overflow="hidden" width="140px" height="30px" mb="4px">
            <Skeleton variant="rect" height={90} width={200} animation="wave" />
          </Box>
          <Box borderRadius="6px" overflow="hidden" width="180px" height="30px" mb="4px">
            <Skeleton variant="rect" height={90} width={200} animation="wave" />
          </Box>
          <Box borderRadius="4px" overflow="hidden" width="120px" height="14px" mb="4px">
            <Skeleton variant="rect" height={90} width={140} animation="wave" />
          </Box>
          <Box borderRadius="8px" overflow="hidden" width="100px" height="40px" mt="20px">
            <Skeleton variant="rect" height={90} width={140} animation="wave" />
          </Box>
        </Box>
      </Box>
      {/*DESCRIPTION */}
      <Box flex={1.5}>
        <Box>
          {descriptionArray.map((key) => (
            <Box key={`description:${key}`} width="100%" borderRadius="4px" overflow="hidden" mb="4px">
              <Skeleton variant="rect" height={14} width="100%" animation="wave" />
            </Box>
          ))}
          <Box width="70%" borderRadius="4px" overflow="hidden" mb="4px">
            <Skeleton variant="rect" height={14} width="100%" animation="wave" />
          </Box>
        </Box>
        {/*DESCRIPTION LINKS */}
        <Box display="flex" mt="40px">
          {buttonArray.map((key) => (
            <Box
              key={`button:${key}`}
              width="140px"
              borderRadius="4px"
              overflow="hidden"
              mb="4px"
              height="26px"
              mr="38px"
            >
              <Skeleton variant="rect" height={50} width="100%" animation="wave" />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>

    {/*CONTENT BLOCK */}
    <Box width="100%" mt="60px" overflow="hidden">
      <Box borderBottom="1px solid #E6E9EC" pb="24px">
        <Box display="flex">
          {tabArray.map((key) => (
            <Box key={`tab:${key}`} width="100px" borderRadius="4px" overflow="hidden" mb="4px" height="26px" mr="32px">
              <Skeleton variant="rect" height={50} width="100%" animation="wave" />
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        width="100%"
        margin="32px 0 0"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {triggerActionItemArray.map((key) => (
          <Box
            key={`triggerActionItem:${key}`}
            p="20px"
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            width="243px"
            margin="0 16px 16px 0"
            border="1px solid #e6e9ec"
            borderRadius="8px"
          >
            <Box width="40px" height="40px" borderRadius="50%" overflow="hidden" mr="16px">
              <Skeleton variant="rect" height={50} width={50} animation="wave" />
            </Box>
            <Box>
              <Box width="90px" borderRadius="4px" overflow="hidden" mb="4px">
                <Skeleton variant="rect" height={14} width="100%" animation="wave" />
              </Box>
              <Box width="120px" borderRadius="4px" overflow="hidden">
                <Skeleton variant="rect" height={14} width="100%" animation="wave" />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);

export default ConnectionDetailsSkeleton;
