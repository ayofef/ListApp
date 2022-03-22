import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import THEME from '../../../../../../constants/theme';
import { P14B } from '../../../../../../components/atoms';

const Cover = styled(Box)`
  position: relative;
  border: 1px solid ${THEME.greyColors.grey4};
  background: white;
  align-items: center;
  min-height: 40px;
  padding: 9px 16px 9px;
  margin-bottom: 8px;
  border-radius: 8px;
  display: inline-flex !important;
  align-items: center;
  z-index: 2;
  margin-top: 8px;
  ${({ hasline }) =>
    hasline &&
    `
    position: relative;
  `}

  > p {
    margin-left: 12px;
  }
`;

const IconBox = styled(Box)`
  position: relative;
  * {
    display: block;
  }
`;

const TimelineHead = ({ data, hasLine }) => {
  const { icon: Icon, title, iconSize } = data;
  const IconComponent = <Icon stroke="black" size={iconSize} />;
  return (
    <Cover hasline={hasLine.toString()}>
      <IconBox>{IconComponent}</IconBox>
      {title && (
        <P14B margin="0" component="p" fontWeight={600}>
          {title}
        </P14B>
      )}
    </Cover>
  );
};

TimelineHead.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.elementType,
    iconSize: PropTypes.string,
  }).isRequired,
  hasLine: PropTypes.bool.isRequired,
};

export default TimelineHead;
