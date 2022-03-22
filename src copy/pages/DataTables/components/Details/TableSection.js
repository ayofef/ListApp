import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';
import capitalize from '@material-ui/core/utils/capitalize';
import { P16B, P14 } from '../../../../components/atoms';
import THEME from '../../../../constants/theme';
import { StyledTable } from '../../../../components/GridSystem/styled';
import { isDefined } from '../../../../utils/helpers';

const STRINGS_TO_IGNORE = ['OBJECT'];
const transformUiLabel = (str) => (STRINGS_TO_IGNORE.includes(str) ? 'N/A' : str);

const TableSection = ({ header, data, dataKey, customComponentsMap, hideLabelKeys }) => {
  const { t } = useTranslation();
  const hasObjectValues = data.type === 'OBJECT' && !isEmpty(data.value);

  return (
    <Box component="section" mt="24px">
      <P16B>{t(header)}</P16B>

      {!hasObjectValues && (
        <StyledTable>
          {dataKey.map((key) => (
            <div key={key}>
              <P14 color={THEME.greyColors.grey1}>{capitalize(key || '')}</P14>
              <P14>{isDefined(data[key]) ? transformUiLabel(data[key]) : <span>N/A</span>}</P14>
            </div>
          ))}
        </StyledTable>
      )}

      {hasObjectValues && (
        <StyledTable>
          {dataKey.map((key) => {
            const line = data.value.find((item) => item.key === key);
            const Component = customComponentsMap[key];

            if (line) {
              return (
                <div key={key}>
                  {!hideLabelKeys.includes(key) && (
                    <P14 color={THEME.greyColors.grey1}>{capitalize(line.label || '')}</P14>
                  )}
                  {Component ? (
                    <Component dataObj={line} />
                  ) : (
                    <P14>
                      {isDefined(line.value) ? line.value.replace('**** **** ****', t('ending in')) : <span>N/A</span>}
                    </P14>
                  )}
                </div>
              );
            }

            return null;
          })}
        </StyledTable>
      )}
    </Box>
  );
};

TableSection.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.shape({}))]),
    type: PropTypes.string,
  }).isRequired,
  dataKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  customComponentsMap: PropTypes.shape({}),
  hideLabelKeys: PropTypes.arrayOf(PropTypes.string),
};

TableSection.defaultProps = {
  customComponentsMap: {},
  hideLabelKeys: [],
};

export default TableSection;
