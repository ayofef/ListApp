import React, { useCallback } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import { useTranslation } from 'react-i18next';
import { StyledDialogActions, StyledDialogContent, StyledDialogTitle, StyledPaper } from '../../Dialog/styled';
import { ButtonRounded, CircularLoader } from '../../atoms';
import { useUserDispatch } from '../../../providers/User/UserContext';
import { setIsGreet } from '../../../providers/User/state/actions';
import VideoPlayer from '../../VideoPlayer';
import { useSwitchDemo } from '../../../hooks/useSwitchDemo';
import { useNotificationManager } from '../../../hooks/useNotificationManager';
import { SET_CUSTOMER_METADATA } from '../../../utils/queries/public/publicMutations';
import { mergeDeep } from '../../../utils/mergeDeep';
import { FIRST_TIME_ENTRY } from '../../../providers/User/utils';

const Greeting = () => {
  const { t } = useTranslation();
  const { loading: getMetadataLoading, error: getMetadataError, data } = useQuery(
    gql`
      query GetMetadata {
        we {
          id
          metadata
        }
      }
    `,
    { fetchPolicy: 'cache-only' }
  );
  const [
    setCustomerMetadataPromise,
    { loading: setCustomerMetadataLoading, error: setCustomerMetadataError },
  ] = useMutation(SET_CUSTOMER_METADATA);
  const metadata = data?.we?.metadata;
  const isLoading = getMetadataLoading || setCustomerMetadataLoading;
  useNotificationManager('error', getMetadataError?.message, 'Get Metadata');
  useNotificationManager('error', setCustomerMetadataError?.message, 'Update Customer metadata');
  const switchDemo = useSwitchDemo();
  const userDispatch = useUserDispatch();
  const handleClose = useCallback(() => {
    if (isLoading) {
      return;
    }

    const options = {
      variables: { metadata: mergeDeep(metadata, { [FIRST_TIME_ENTRY]: { isGreeted: true } }) },
    };

    setCustomerMetadataPromise(options).then(({ errors }) => {
      if (errors) {
        // eslint-disable-next-line no-console
        console.error(errors);
        return;
      }

      userDispatch(setIsGreet(true));
      switchDemo();
    });
  }, [isLoading, metadata, setCustomerMetadataPromise, switchDemo, userDispatch]);

  return (
    <Dialog open={true} onClose={handleClose} PaperComponent={StyledPaper} aria-labelledby="greeting" fullWidth>
      <StyledDialogTitle>
        <Box component="span" display="block" fontSize="24px">
          {t('Welcome to WhenThen')}
        </Box>

        <Box component="span" display="block" fontSize="14px" fontWeight="normal" color="#787F88">
          {t('This 2 min intro video will give you a quick overview of the platform')}
        </Box>
      </StyledDialogTitle>

      <StyledDialogContent>
        <VideoPlayer src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" disableButton />
      </StyledDialogContent>

      <StyledDialogActions>
        <Box width="100%" display="flex" alignItems="center">
          <Box component="span" fontSize="16px" color="#787F88">
            {t('Visit our Help Center for more instruction videos ↗')}
          </Box>

          <Box mr="auto">
            <ButtonRounded
              variant="contained"
              color="primary"
              endIcon={isLoading && <CircularLoader bgcolor="#fff" size="16px" thickness={5} />}
              disabled={isLoading}
              onClick={handleClose}
            >
              {t('Done')}
            </ButtonRounded>
          </Box>
        </Box>
      </StyledDialogActions>
    </Dialog>
  );
};

export default Greeting;
