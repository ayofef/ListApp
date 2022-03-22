import React from 'react';
import { string } from 'prop-types';
import TableCell from '@material-ui/core/TableCell/TableCell';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import { CopyToClipboard, P14B } from '../../../../components/atoms';
import { TableCellInner } from './styled';

export const PublicKeyCell = ({ data }) => {
  const { t } = useTranslation();
  const handleCopy = () => {
    NotificationManager.success(` ${t('Copied public API key to clipboard')}`, t('Public API Key'), 5000);
  };
  return (
    <TableCell align="left" padding="none">
      <TableCellInner>
        <CopyToClipboard className="small" text={data} onCopy={handleCopy}>
          <P14B padding="0 0 0 10px" color="#232629" fontFamily="Source Code Pro, monospace">
            {data}
          </P14B>
        </CopyToClipboard>
      </TableCellInner>
    </TableCell>
  );
};

PublicKeyCell.propTypes = {
  data: string.isRequired,
};
