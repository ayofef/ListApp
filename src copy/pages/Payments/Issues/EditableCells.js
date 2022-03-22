import capitalize from '@material-ui/core/utils/capitalize';
import { shape, string, bool } from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { CircleIndicator } from '../../../components/atoms/Indicator';
import Processor from '../../../components/table/Processor';
import { Tag } from '../../../components/atoms';
import { colors } from './IssueStatusCell';

export const EditableProcessorCell = ({ data: { name, logo } }) => <Processor name={name} logo={logo} />;

EditableProcessorCell.propTypes = {
  data: shape({
    name: string,
    logo: string,
  }).isRequired,
};

export const EditableTextCell = ({ data }) => data;

EditableTextCell.propTypes = {
  data: string.isRequired,
};

export const EditableStatusCell = ({ data, isIssuesDetails }) => {
  const variant = data.toLowerCase();

  return (
    <CircleIndicator $isIssuesDetails={isIssuesDetails} variant={variant}>
      {capitalize(variant || '')}
    </CircleIndicator>
  );
};

EditableStatusCell.propTypes = {
  data: string,
  isIssuesDetails: bool,
};
EditableStatusCell.defaultProps = {
  data: '',
  isIssuesDetails: false,
};

export const IssueStatusButton = ({ data }) => {
  const variant = data.charAt(0) + data.slice(1).toLowerCase();

  return (
    <Tag backgroundColor="transparent" color={colors[data]?.color}>
      <Box component="span" color="rgba(0, 0, 0, 0.87)" fontWeight={400} fontSize="14px" width="50px">
        {variant}
      </Box>
    </Tag>
  );
};

IssueStatusButton.propTypes = {
  data: string.isRequired,
};

export const IssueType = ({ data }) => {
  const value = data.charAt(0) + data.slice(1).toLowerCase();
  return <Box>{value}</Box>;
};
IssueType.propTypes = {
  data: string.isRequired,
};
