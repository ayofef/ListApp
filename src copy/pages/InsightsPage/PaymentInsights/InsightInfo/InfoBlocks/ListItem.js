import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { Li } from './styled';
import { ICON_MAP, parseLabel, getObjKey, OTHERS_KEY, customSortBy } from './constant';
import { PAYMENT_METHOD_ICON_MAP } from '../../../../../assets/icons/PaymentMethods';
import CircleImage from '../../../../../components/table/CircleImage';
import { getCountryName } from '../../../../../utils/getCountryName';

const ListItem = ({ dataKey, paymentGateways, name, data }) => {
  const clonedData = Array.isArray(data) ? data.slice() : [];
  const dataList = customSortBy(clonedData, OTHERS_KEY);

  return (
    <>
      {dataList.map((item) => {
        const objKey = getObjKey(item);
        const Icon = typeof ICON_MAP[name] === 'function' ? ICON_MAP[name](objKey) : ICON_MAP[name];
        const paymentGateway = paymentGateways?.find((el) => el?.name === objKey) ?? '';
        const Method = PAYMENT_METHOD_ICON_MAP[objKey] ?? PAYMENT_METHOD_ICON_MAP.UNKNOWN_CARD;

        return (
          <Li key={objKey}>
            <div className="name-icon">
              {ICON_MAP[name] && <CircleImage text={objKey} logo={Icon} size={24} borderRadius="7px" />}
              {name === 'Payment gateways' && <CircleImage text={objKey} logo={paymentGateway?.logo} size={24} />}
              {(name === 'Payment methods' || name === 'Card type') && <Method />}

              <span className="name">{name === 'Countries' ? getCountryName(objKey) : parseLabel(objKey)}</span>
            </div>

            {name === 'Total paid fees' ? (
              <span>{item[objKey]?.amount?.formattedAmount}</span>
            ) : (
              <span>{dataKey === 'count' ? item[objKey]?.count : item[objKey]?.amount?.formattedAmount}</span>
            )}
          </Li>
        );
      })}
    </>
  );
};
ListItem.propTypes = {
  name: string.isRequired,
  dataKey: string.isRequired,
  data: arrayOf(shape({})).isRequired,
  paymentGateways: arrayOf(shape({})),
};

ListItem.defaultProps = {
  paymentGateways: [],
};

export default ListItem;
