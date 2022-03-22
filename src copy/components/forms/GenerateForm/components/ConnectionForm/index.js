/* eslint-disable react/no-array-index-key */
import React from 'react';
import { func, string, bool, arrayOf, shape } from 'prop-types';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SubTitle from '../../../../FlowEditor/components/AutomationDetails/SubTitle';
import CircleImage from '../../../../table/CircleImage';
import WhenThenLogo from '../../../../../assets/img/WhenThenLogo.png';
import { COMMON_CONNECTION_STYLE_PROPS, CONTAINER_HEIGHT, getConnectionFormBlock } from '../../constant';
import { H2 } from '../../../../atoms';
import useGenerateBlock from '../../hook/useGenerateBlock';

const ConnectionForm = ({
  copyToClipboard,
  connectionName,
  connectionLogo,
  description,
  form,
  values,
  showErrors,
  setShowErrors,
  errors,
  setFieldValue,
  handleChange,
  handleBlur,
  animatedLabel,
}) => {
  const { t } = useTranslation();
  const { generateBlockFn } = useGenerateBlock({
    copyToClipboard,
    values,
    showErrors,
    setShowErrors,
    errors,
    setFieldValue,
    handleChange,
    handleBlur,
    animatedLabel,
  });
  const { textBlock, inputBlock } = getConnectionFormBlock(form);

  return (
    <Box display="flex" pb="0">
      <Box
        {...COMMON_CONNECTION_STYLE_PROPS}
        borderRight="1px solid rgba(193, 195, 198, 0.2)"
        pl="0"
        height={CONTAINER_HEIGHT}
        justifyContent="flex-start"
      >
        <Box display="flex" alignItems="center" mb="32px">
          <Box display="flex" alignItems="center" position="relative" zIndex={1}>
            <CircleImage text="WhenThen" logo={WhenThenLogo} size={44} />
          </Box>
          <Box display="flex" alignItems="center" position="relative" left="-4px">
            <CircleImage text={connectionName} logo={connectionLogo} size={44} />
          </Box>
        </Box>

        <H2 fontWeight="700">
          {t('Allow WhenThen to')}
          <br />
          {t('access your')}
          <br />
          {connectionName} {t('account')}
        </H2>

        <SubTitle mt="24px">{t(description)}</SubTitle>

        <Box mt="24px">
          {textBlock?.map((item, index) => (
            <Box key={`${item.type}-${item.block_id}-${index}`}>{generateBlockFn(item)}</Box>
          ))}
        </Box>
      </Box>

      <Box {...COMMON_CONNECTION_STYLE_PROPS} flex="1 0 520px" height={CONTAINER_HEIGHT}>
        {inputBlock?.map((item, index) => (
          <Box mb="10px" width="100%" key={`${item.type}-${item.block_id}-${index}`}>
            {generateBlockFn(item)}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

ConnectionForm.propTypes = {
  copyToClipboard: func,
  connectionName: string.isRequired,
  connectionLogo: string.isRequired,
  description: string.isRequired,
  form: arrayOf(shape({})).isRequired,
  showErrors: bool,
  setShowErrors: func,
  values: shape({}),
  setFieldValue: func,
  errors: shape({}),
  handleChange: func,
  handleBlur: func,
  animatedLabel: bool,
};

ConnectionForm.defaultProps = {
  copyToClipboard: null,
  showErrors: false,
  setShowErrors: null,
  values: {},
  setFieldValue: null,
  errors: {},
  handleChange: null,
  handleBlur: null,
  animatedLabel: false,
};

export default ConnectionForm;
