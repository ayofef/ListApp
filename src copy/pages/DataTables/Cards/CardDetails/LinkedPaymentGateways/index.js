import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next/src/index';
import isEmpty from 'lodash/isEmpty';
import { P16B } from '../../../../../components/atoms';
import LinkedItem from './LinkedItem';
import EmptyState from '../../../components/Details/DetailsTable/EmptyState';
import { LinkedItemsWrapper } from '../../../../../components/GridSystem/styled';

const TITLE = 'Linked Payment Processors';

const LinkedPaymentGateways = ({ linkedPaymentGateways }) => {
  const { t } = useTranslation();
  const emptyData = useMemo(() => isEmpty(linkedPaymentGateways), [linkedPaymentGateways]);

  return (
    <Box component="section" mt="54px">
      <P16B>{t(TITLE)}</P16B>

      {emptyData && <EmptyState title={TITLE} />}

      {!emptyData && (
        <LinkedItemsWrapper>
          {linkedPaymentGateways?.map((id) => (
            <LinkedItem key={id} id={id} />
          ))}
        </LinkedItemsWrapper>
      )}
    </Box>
  );
};

LinkedPaymentGateways.propTypes = {
  linkedPaymentGateways: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LinkedPaymentGateways;
