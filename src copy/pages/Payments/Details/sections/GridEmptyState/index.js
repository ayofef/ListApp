import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { useTranslation } from 'react-i18next';
import {
  BarOne,
  BarTwo,
  BarThree,
  BarFour,
  ListIcon,
  CardIcon,
  Attachments,
} from '../../../../../assets/icons/EmptyStates/PaymentDetails';
import { P14B, P14 } from '../../../../../components/atoms';

const StyledBox = withStyles({
  root: {
    transform: 'translate(-50%, -50%)',

    '&::before': {
      content: "''",
      position: 'absolute',
      top: '55%',
      left: '50%',
      width: '400px',
      height: '260px',
      backgroundColor: '#fff',
      transform: 'translate(-50%, -50%)',
      zIndex: '-1',
      filter: 'blur(60px)',
      borderRadius: '12px',
    },
  },
})(Box);
const skeletonArray = Array.from(Array(5).keys());

const COPY_MAP = {
  default: {
    title: 'Not yet available',
    desc: 'Data will be populated when the payment has been attempted.',
  },
  Attachments: {
    title: 'Not yet available',
    desc: 'You are able to upload attachments when the payment has been attempted.',
  },
};
const ICON_MAP = {
  default: ListIcon,
  Attachments: Attachments,
  'Payment Method': CardIcon,
};

const GridEmptyState = ({ title, copy, mb, top }) => {
  const { t } = useTranslation();

  const Icon = ICON_MAP[title] ?? ICON_MAP.default;

  return (
    <Box position="relative" mb={mb}>
      <Box width="95%">
        {skeletonArray.map((key) => (
          <Box mb="26px" key={key} display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <BarOne />
            </Box>
            <Box>
              <BarTwo />
            </Box>
            <Box>
              <BarOne />
            </Box>
            <Box>
              <BarThree />
            </Box>
            <Box>
              <BarFour />
            </Box>
          </Box>
        ))}
      </Box>
      <StyledBox position="absolute" top={top} left="50%" textAlign="center">
        <Box mb="20px">
          <Icon />
        </Box>
        <P14B margin="0 0 8px 0">{t(copy?.title ?? COPY_MAP[title]?.title ?? COPY_MAP.default.title)}</P14B>
        <P14 color="#787F88" width="328px">
          {t(copy?.desc ?? COPY_MAP[title]?.desc ?? COPY_MAP.default.desc)}
        </P14>
      </StyledBox>
    </Box>
  );
};

GridEmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  mb: PropTypes.string,
  top: PropTypes.string,
  copy: PropTypes.shape({
    title: PropTypes.string,
    desc: PropTypes.string,
  }),
};

GridEmptyState.defaultProps = {
  copy: undefined,
  mb: '72px',
  top: '60%',
};

export default GridEmptyState;
