import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { capitalize } from '@material-ui/core';
import { ReactMultiEmail } from 'react-multi-email';
import { useTranslation } from 'react-i18next';
import { StyledOptionBlock, StyledMultiEmail } from './styled';

const EmailOptions = ({ initValue, title }) => {
  const [value, setValue] = useState(initValue);
  const inputRef = useRef(null);
  const { t } = useTranslation();

  if (title === 'to' || title === 'subject') {
    return (
      <StyledOptionBlock
        bgcolor="#F0F2F4"
        mb="16px"
        borderRadius="8px"
        p="20px 24px"
        onClick={() => inputRef.current.focus()}
      >
        <label htmlFor={title}>
          {t(capitalize(`${title}`))}:
          <input type="text" name={title} value={value} onChange={(e) => setValue(e.target.value)} ref={inputRef} />
        </label>
      </StyledOptionBlock>
    );
  }
  return (
    <StyledMultiEmail
      bgcolor="#F0F2F4"
      mb="16px"
      borderRadius="8px"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
    >
      <p>{t(capitalize(`${title}`))}:</p>
      <ReactMultiEmail
        placeholder=""
        emails={value}
        onChange={(emails) => {
          setValue(emails);
        }}
        getLabel={(email, index, removeEmail) => {
          return (
            <div className="labeledEmail" data-tag key={index}>
              {email}
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      />
    </StyledMultiEmail>
  );
};

EmailOptions.propTypes = {
  initValue: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  title: PropTypes.string.isRequired,
};

export default EmailOptions;
