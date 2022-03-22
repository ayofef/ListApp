import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { SkeletonFlex } from './styled';
import { ConnectionItem } from '../../../FlowDetailsPage/FlowSettings/PaymentProcessorPage/ConnectedSection/NewConnectionModal/LoadingState/LoadingState';

const skeletonArray = Array.from(Array(4).keys());
const sectionArray = Array.from(Array(3).keys());

const ConnectionsSkeleton = () => (
  <>
    {sectionArray.map((id, index) => (
      <Box key={`section${id}`} mt={index === 0 ? '20px' : '40px'} borderBottom="1px solid #e6e9ec">
        <Box mb="20px">
          <Skeleton variant="rect" height={25} width={200} />
        </Box>
        <SkeletonFlex>
          {skeletonArray.map((key) => (
            <ConnectionItem key={key} />
          ))}
        </SkeletonFlex>
      </Box>
    ))}
  </>
);

export default ConnectionsSkeleton;
