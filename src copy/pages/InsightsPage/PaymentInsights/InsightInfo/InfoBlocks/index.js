import React, { useState, useCallback, useMemo } from 'react';
import { arrayOf, bool, oneOfType, shape, string } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';

import EmptyInfoBlock from '../EmptyStates/EmptyInfoBlock';
import { ButtonRounded } from '../../../../../components/atoms';
import { StyledGrid, Ul, Li } from './styled';
import StatsModal from './StatsModal';
import ListItem from './ListItem';
import { transformTotalFeesData, FEES_KEYS_MAP } from './constant';
import LoadingInfoBlock from '../LoadingState/LoadingInfoBlock';

const InfoBlock = ({
  name,
  data,
  central,
  dataKey,
  paymentGateways,
  noBottomBorder,
  loading,
  borderTopColor,
  borderRightColor,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = useCallback(() => setIsOpen((prevState) => !prevState), []);
  const parsedData = useMemo(() => (name === FEES_KEYS_MAP.totalFees ? transformTotalFeesData(data) : data), [
    data,
    name,
  ]);

  const showMoreButton = useMemo(() => parsedData?.length > 4, [parsedData]);

  return (
    <StyledGrid item sm={4} $central={central}>
      <Ul
        central={central}
        noBottomBorder={noBottomBorder}
        $borderTopColor={borderTopColor}
        $borderRightColor={borderRightColor}
      >
        <p>{t(name)}</p>
        {loading && <LoadingInfoBlock />}
        {isEmpty(parsedData) && !loading && <EmptyInfoBlock />}
        {!isEmpty(parsedData) && !loading && (
          <ListItem
            name={name}
            data={parsedData?.slice(0, 4) || []}
            dataKey={dataKey}
            paymentGateways={paymentGateways}
          />
        )}

        {showMoreButton && (
          <>
            <Li showMoreButton>
              <ButtonRounded type="button" variant="text" color="primary" onClick={toggleIsOpen}>
                {t('Show more')}
              </ButtonRounded>
            </Li>
            <StatsModal name={name} isOpen={isOpen} toggleIsOpen={toggleIsOpen}>
              <ListItem name={name} data={parsedData || []} dataKey={dataKey} paymentGateways={paymentGateways} />
            </StatsModal>
          </>
        )}
      </Ul>
    </StyledGrid>
  );
};

InfoBlock.propTypes = {
  name: string.isRequired,
  dataKey: string.isRequired,
  data: oneOfType([arrayOf(shape({})), shape({})]).isRequired,
  central: bool,
  paymentGateways: arrayOf(shape({})),
  noBottomBorder: bool,
  loading: bool,
  borderTopColor: string,
  borderRightColor: string,
};

InfoBlock.defaultProps = {
  paymentGateways: [],
  noBottomBorder: false,
  loading: false,
  central: false,
  borderTopColor: undefined,
  borderRightColor: undefined,
};

export default InfoBlock;
