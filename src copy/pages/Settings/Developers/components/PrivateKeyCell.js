import React, { useState } from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import TableCell from '@material-ui/core/TableCell/TableCell';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import { Button, CopyToClipboard, P14 } from '../../../../components/atoms';
import THEME from '../../../../constants/theme';

const StyledTableCell = styled(TableCell)`
  width: 350px;
`;

export const PrivateKeyCell = ({ data }) => {
  const { t } = useTranslation();
  const [showPrivateKey, setShowTableKey] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setShowTableKey(true);
  };
  const handleCopy = () => {
    NotificationManager.success(t('Copied private API key to clipboard'), 'Private API Key', 5000);
  };

  return (
    <StyledTableCell onMouseLeave={() => setShowTableKey(false)} padding="none" align="left">
      {showPrivateKey ? (
        <CopyToClipboard className="small" text={data} onCopy={handleCopy}>
          <P14 padding="0" color={THEME.primaryColors.purpleMain} fontFamily="Source Code Pro, monospace">
            {data}
          </P14>
        </CopyToClipboard>
      ) : (
        <Button padding="0 0 0 10px" className="link" margin="0" onClick={handleClick} minHeight="0">
          <P14 color={THEME.primaryColors.blue} padding="0">
            View
          </P14>
        </Button>
      )}
    </StyledTableCell>
  );
};

PrivateKeyCell.propTypes = {
  data: string.isRequired,
};
