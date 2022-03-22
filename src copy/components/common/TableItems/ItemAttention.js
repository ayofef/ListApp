import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { string, shape } from 'prop-types';
import Table from '../../tables/Table';
import THEME from '../../../constants/theme';
import { CustomDivider, CircularLoader, P14, BlockWrap, P14M, StyledGrid } from '../../atoms';
import { longFormat } from '../../../utils/datesFormat';

import { StyledColumn } from './styled';

const ItemAttention = (props) => {
  const { id, purchase, reason, dateApproved, attentionData, buttonActions, showAttention } = props;
  const { showQuestions, showDetails } = buttonActions;
  const { data, scheme, setSelectedRows, selectedRows, loading } = attentionData;
  const { t } = useTranslation();

  if (!showAttention) {
    return null;
  }

  return (
    <StyledColumn colSpan="10">
      <BlockWrap margin="10px 0 0">
        <Grid container>
          <Grid item xs={3}>
            <P14>{t('infoRequest.whatFor')}</P14>
            <P14M>{purchase}</P14M>
          </Grid>
          <Grid item xs={3}>
            <P14>{t('infoRequest.reason')}</P14>
            <P14M>{reason}</P14M>
          </Grid>
          <Grid item xs={3}>
            <P14>{t('infoRequest.dateText2')}</P14>
            <P14M>{longFormat(dateApproved)}</P14M>
          </Grid>
          <StyledGrid margin="0 0 0 auto" alignSelf="flex-end" item>
            <P14 color={THEME.secondaryColors.blue} cursor="pointer" onClick={() => showDetails({ id })}>
              {t('buttonsText.SeeDetails')}
            </P14>
          </StyledGrid>
        </Grid>
      </BlockWrap>
      <CustomDivider margin="20px 0" />
      <BlockWrap margin="0">
        <P14 margin="0 0 20px">{t('itemAttention.chooseMathing')}</P14>
        {loading ? (
          <CircularLoader />
        ) : (
          <Table
            headCells={scheme}
            head="none"
            rows={data}
            rowType="approvals"
            attentionData={attentionData}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            showAttention={showAttention}
          />
        )}
      </BlockWrap>
      <CustomDivider margin="0 0 10px" />
      <P14 color={THEME.greyColors.grey1} cursor="pointer" textAlign="right" onClick={() => showQuestions()}>
        Don’t see it?
      </P14>
    </StyledColumn>
  );
};

ItemAttention.propTypes = {
  id: string.isRequired,
  purchase: string.isRequired,
  reason: string.isRequired,
  dateApproved: string.isRequired,
  attentionData: shape({}).isRequired,
  buttonActions: shape({}).isRequired,
  showAttention: shape({}).isRequired,
};

export default ItemAttention;
