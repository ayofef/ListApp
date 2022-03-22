import React, { Fragment } from 'react';
import { Box, Checkbox } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import ExternalSelect from '../ExternalSelect';
import { CheckboxWrapper, DatePickerWrapper, StyledReactMarkdown } from '../styled';
import THEME from '../../../../constants/theme';
import LinkRenderer from '../components/MarkdownRenderers/LinkRenderer';
import { useGlobalContext } from '../../../../containers/App/context';
import { typeHandler } from '../../../../utils/fieldsConsts';
import {
  BlockWrap,
  Button,
  ButtonRounded,
  CustomDivider,
  InputField,
  L12,
  MaterialIconStyler,
  P14,
  P14B,
  StyledSelect,
} from '../../../atoms';

const useGenerateBlock = ({
  copyToClipboard,
  showErrors,
  setShowErrors,
  values,
  setFieldValue,
  errors,
  handleChange,
  handleBlur,
  animatedLabel,
}) => {
  const { t } = useTranslation();
  const { getMeData } = useGlobalContext();
  const currency = getMeData?.we?.currency?.symbol || '';

  const onChangeHandler = (e) => {
    setShowErrors(false);
    handleChange(e);
  };

  const handleFormat = (e) => {
    setShowErrors(false);

    const {
      target: { value },
    } = e;
    e.target.value = value.replace(/[^0-9.-]+/g, '');
    onChangeHandler(e);
  };

  const handleCopy = (textValue) => {
    copyToClipboard(textValue);
  };

  const handleCheckboxUpdate = (valueItem, option) => {
    if (values[valueItem.block_id]) {
      if (values[valueItem.block_id]?.some((item) => item.value === option.value)) {
        setFieldValue(
          valueItem.block_id,
          values[valueItem.block_id].filter((valueObject) => valueObject.value !== option.value)
        );
      } else {
        setFieldValue(valueItem.block_id, [...values[valueItem.block_id], option]);
      }
    } else {
      setFieldValue(valueItem.block_id, [option]);
    }
  };

  const generateBlockFn = (it) => {
    const blocksList = {
      section: (item) => (
        <BlockWrap margin="10px 0 36px">
          <StyledReactMarkdown
            fontSize="14px"
            color={THEME.greyColors.grey11}
            textAlign={animatedLabel ? 'inherit' : 'left'}
            components={{ link: LinkRenderer }}
          >
            {item.text.text}
          </StyledReactMarkdown>
        </BlockWrap>
      ),
      CHECKBOXES: (checkboxItem) => (
        <>
          <P14>{checkboxItem.label.text}</P14>
          <div>
            {checkboxItem.element.options.map((option) => (
              <Button onClick={() => handleCheckboxUpdate(checkboxItem, option)} transparent smaller>
                <CheckboxWrapper>
                  <MaterialIconStyler
                    icon={Checkbox}
                    checked={values[checkboxItem.block_id]?.some(
                      (currentItemValue) => currentItemValue.value === option.value
                    )}
                    color={THEME.secondaryColors.blue}
                  />
                  <P14>{option.text.text}</P14>
                </CheckboxWrapper>
              </Button>
            ))}
          </div>
          {showErrors && errors[checkboxItem.block_id] && (
            <L12 textAlign="left" margin="0 0 24px 0" color={THEME.secondaryColors.danger}>
              {errors[checkboxItem.block_id]}
            </L12>
          )}
        </>
      ),
      DATE: (item) => (
        <>
          <P14>{item.label.text}</P14>
          <DatePickerWrapper>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                value={values[item.block_id] || null}
                onChange={(value) => setFieldValue(item.block_id, value)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </DatePickerWrapper>
          {showErrors && errors[item.block_id] && (
            <L12 textAlign="left" margin="0 0 24px 0" color={THEME.secondaryColors.danger}>
              {errors[item.block_id]}
            </L12>
          )}
        </>
      ),
      EXTERNAL_SELECT: (item) => {
        return (
          <ExternalSelect
            showErrors={showErrors}
            errors={errors}
            item={item}
            setShowErrors={setShowErrors}
            setFieldValue={setFieldValue}
            values={values}
            valueFromEdit
          />
        );
      },
      LONG_TEXT: (item) => (
        <Fragment key={item.block_id}>
          <InputField
            variant="outlined"
            type="text"
            multiline
            rows="8"
            id={item.block_id}
            name={item.block_id}
            label={item.label.text}
            value={values[item.block_id] || ''}
            onChange={onChangeHandler}
            onBlur={handleBlur}
            minheight="187px"
          />
          {showErrors && errors[item.block_id] && (
            <L12 textAlign="left" margin="0 0 24px 0" color={THEME.secondaryColors.danger}>
              {errors[item.block_id]}
            </L12>
          )}
        </Fragment>
      ),
      SELECT: (item) => {
        return (
          <Fragment key={item.block_id}>
            {!animatedLabel && <P14B textAlign="left">{item.label.text}</P14B>}
            <StyledSelect
              name={item.block_id}
              id={item.block_id}
              value={values[item.block_id] || (item.options && item.options[0].value)}
              onChange={onChangeHandler}
              options={item.element.options}
              label={animatedLabel ? item.label.text : ''}
              padding={animatedLabel ? undefined : '8px 16px 8px 32px'}
            />

            {showErrors && errors[item.block_id] && (
              <L12 textAlign="left" margin="0 0 24px 0" color={THEME.secondaryColors.danger}>
                {errors[item.block_id]}
              </L12>
            )}
          </Fragment>
        );
      },
      TEXT: (item) => {
        return (
          <Fragment key={item.block_id}>
            {!animatedLabel && <P14B textAlign="left">{item.label?.text}</P14B>}
            <InputField
              variant="outlined"
              type="text"
              id={item.block_id}
              name={item.block_id}
              label={animatedLabel ? item.label.text : ''}
              padding={animatedLabel ? undefined : '10px 16px'}
              value={
                item.block_id === 'amount'
                  ? (values[item.block_id] && currency + values[item.block_id]) || ''
                  : values[item.block_id] || ''
              }
              onChange={item.block_id === 'amount' ? handleFormat : onChangeHandler}
              onBlur={handleBlur}
            />
            {showErrors && errors[item.block_id] && (
              <L12 textAlign="left" margin="0 0 24px 0" color={THEME.secondaryColors.danger}>
                {errors[item.block_id]}
              </L12>
            )}
          </Fragment>
        );
      },
      COPY_FIELD: (item) => {
        return (
          <Box key={item.block_id}>
            {!animatedLabel && <P14B textAlign="left">{item.label?.text}</P14B>}
            <Box display="flex">
              <Box flex={1}>
                <InputField
                  margin="0"
                  variant="outlined"
                  type="text"
                  id={item.block_id}
                  name={item.block_id}
                  label={animatedLabel ? item.label.text : ''}
                  padding={animatedLabel ? undefined : '10px 16px'}
                  value={item.initial_value}
                  onBlur={handleBlur}
                  height="48px"
                  disabled
                  hover
                />
              </Box>
              <ButtonRounded
                type="button"
                onClick={() => handleCopy(item.initial_value)}
                borderRadius="0 5px 5px 0"
                height="48px"
                ml="-4px"
                color="primary"
                variant="contained"
              >
                {t('Copy link')}
              </ButtonRounded>
            </Box>
          </Box>
        );
      },
      NUMBER: (item) => {
        return (
          <Fragment key={item.block_id}>
            <InputField
              variant="outlined"
              type="text"
              id={item.block_id}
              name={item.block_id}
              label={item.label.text}
              value={
                item.block_id === 'amount'
                  ? (values[item.block_id] && currency + values[item.block_id]) || ''
                  : values[item.block_id] || ''
              }
              onChange={handleFormat}
              onBlur={handleBlur}
            />
            {showErrors && errors[item.block_id] && (
              <L12 textAlign="left" margin="0 0 24px 0" color={THEME.secondaryColors.danger}>
                {errors[item.block_id]}
              </L12>
            )}
          </Fragment>
        );
      },
      AMOUNT: (item) => {
        return (
          <Fragment key={item.block_id}>
            <InputField
              variant="outlined"
              type="text"
              id={item.block_id}
              name={item.block_id}
              label={item.label.text}
              value={
                values[item.block_id] && values[item.block_id].indexOf(currency) > -1
                  ? values[item.block_id]
                  : (values[item.block_id] && currency + values[item.block_id]) || ''
              }
              onChange={handleFormat}
              onBlur={handleBlur}
            />
            {showErrors && errors[item.block_id] && (
              <L12 textAlign="left" margin="0 0 24px 0" color={THEME.secondaryColors.danger}>
                {errors[item.block_id]}
              </L12>
            )}
          </Fragment>
        );
      },
      URL: (item) => {
        return (
          <Fragment key={item.block_id}>
            <InputField
              variant="outlined"
              type="text"
              id={item.block_id}
              name={item.block_id}
              label={item.label.text}
              value={
                item.block_id === 'amount'
                  ? (values[item.block_id] && currency + values[item.block_id]) || ''
                  : values[item.block_id] || ''
              }
              onChange={item.block_id === 'amount' ? handleFormat : onChangeHandler}
              onBlur={handleBlur}
            />
            {showErrors && errors[item.block_id] && (
              <L12 textAlign="left" margin="0 0 24px 0" color={THEME.secondaryColors.danger}>
                {errors[item.block_id]}
              </L12>
            )}
          </Fragment>
        );
      },
      plain_text: () => <div>item.text</div>,
      divider: () => <CustomDivider fullWidth />,
    };

    const fieldType = it.element ? typeHandler(it) : it.type;
    return blocksList[fieldType] && blocksList[fieldType](it);
  };

  return { generateBlockFn };
};

export default useGenerateBlock;
