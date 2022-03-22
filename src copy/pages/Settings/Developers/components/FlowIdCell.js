import React from 'react';
import { string } from 'prop-types';
import TableCell from '@material-ui/core/TableCell/TableCell';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { CopyToClipboard, P14B } from '../../../../components/atoms';
import { TableCellInner } from './styled';

const TITLE = 'Flow Id';
const MESSAGE = 'Copied flow id to clipboard';
const TIME_OUT = 5000;

export const FlowIdCell = ({ data }) => {
  const { t } = useTranslation();

  const handleCopy = () => {
    NotificationManager.success(` ${t(MESSAGE)}`, t(TITLE), TIME_OUT);
  };

  return (
    <TableCell align="left" padding="none">
      <TableCellInner>
        <Box padding="14px 0" display="flex">
          <CopyToClipboard className="small" text={data} onCopy={handleCopy}>
            <P14B padding="0 0 0 10px" color="#232629" fontFamily="Source Code Pro, monospace">
              {data}
            </P14B>
          </CopyToClipboard>
        </Box>
      </TableCellInner>
    </TableCell>
  );
};

FlowIdCell.propTypes = {
  data: string.isRequired,
};
