import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';

import { H2 } from '../../atoms/H2';
import { StyledFormWrapper } from './styled';
import Layout from '../../ui/Layout';

function FormContainer({ title, children }) {
  return (
    <Layout>
      <StyledFormWrapper>
        <Box>
          <H2 $textAlign="center" $margin="0 0 40px 0">
            {title}
          </H2>

          {children}
        </Box>
      </StyledFormWrapper>
    </Layout>
  );
}

FormContainer.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default FormContainer;
