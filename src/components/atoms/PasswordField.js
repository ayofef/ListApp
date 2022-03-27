import React, { useState } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Box from '@material-ui/core/Box';

import InputField from './Input';

function PasswordField(props) {
  const [isMasked, setMasked] = useState(true);
  const toggleIsMasked = () => setMasked((prev) => !prev);

  return (
    <div>
      <InputField
        type={isMasked ? 'password' : 'text'}
        InputProps={{
          endAdornment: (
            <Box onClick={toggleIsMasked} type="button">
              {isMasked ? VisibilityIcon : VisibilityOffIcon}
            </Box>
          ),
        }}
        {...props}
      />
    </div>
  );
}

export default PasswordField;
