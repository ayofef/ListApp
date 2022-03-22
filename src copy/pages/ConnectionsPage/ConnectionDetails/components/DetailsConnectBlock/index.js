import React, { useMemo } from 'react';
import { func, shape, string } from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import CallMadeIcon from '@material-ui/icons/CallMadeRounded';
import capitalize from '@material-ui/core/utils/capitalize';
import THEME from '../../../../../constants/theme';
import { ButtonRounded, P14, P12 } from '../../../../../components/atoms';
import { ConnectionTileLogo } from '../../../Directory/styled';
import { StyledIcon } from '../styled';
import EditableField from '../../../components/EditableField';
import { useEditableFieldHook } from '../../../hooks/useEditableFieldHook';
import { generateUserPilotAttribute } from '../../../../../constants/generateUserPilotLabel';
import { USER_PILOT_SECTION_ID } from '../../../constant';
import { LOGO_SIZE, SUB_TEXT_TRANSFORM, BUTTON_TYPES_MAP } from './constant';
import { CONNECTION_STATUS } from '../../../components/constant';
import { SectionLeft, SectionRight, ButtonsContainer, ConfigButton } from './styled';

const DetailsConnectBlock = ({ connection, statusActionHandlers, handleViewConfiguration }) => {
  const { t } = useTranslation();
  const { nameText, setNameText, handleFieldReset, handleSubmitName } = useEditableFieldHook(connection);

  const { label, event } = statusActionHandlers[connection?.status] ?? statusActionHandlers.NOT_CONNECTED;
  const isConnected = connection.status === CONNECTION_STATUS.CONNECTED;

  const linkText = useMemo(() => {
    const link = connection?.company?.homepageUrl?.replace(/(^\w+:|^)\/\//, '')?.replace('www.', '');
    return link?.charAt(link?.length - 1) === '/' ? link?.slice(0, -1) : link ?? '';
  }, [connection]);

  return (
    <Box display="flex" alignItems="center" mb="54px">
      <SectionLeft>
        <ConnectionTileLogo height={LOGO_SIZE} width={LOGO_SIZE} img={connection?.company?.logo}>
          <img src={connection?.company?.logo} alt={connection?.company?.name} />
        </ConnectionTileLogo>

        <Box ml="22px">
          <Box maxWidth="290px">
            <EditableField
              nameText={nameText}
              updateValue={setNameText}
              value={nameText}
              reset={handleFieldReset}
              submit={handleSubmitName}
              multiline
              height="auto"
              width="260px"
              fontSize="32px !important"
              fontWeight="700"
              lineHeight="37px"
              editingTransform="translateX(-2px)"
              padding="0 0 0 2px !important"
              {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, 'details', 'connection_name')}
            />

            <P14 color={THEME.greyColors.grey1}>{connection?.company?.categories[0]}</P14>

            <ButtonsContainer display="flex" mt="16px">
              {isConnected && (
                <ConfigButton mr="10px">
                  <ButtonRounded type="button" variant="contained" color="primary" onClick={handleViewConfiguration}>
                    {t('View Configuration')}
                  </ButtonRounded>
                </ConfigButton>
              )}

              <ButtonRounded
                type="button"
                variant="contained"
                color={BUTTON_TYPES_MAP[connection?.status]}
                onClick={event}
                alignSelf={!isConnected ? 'flex-start' : ''}
                {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, 'details', 'primary_button')}
              >
                {label}
              </ButtonRounded>
            </ButtonsContainer>
          </Box>
        </Box>
      </SectionLeft>

      <SectionRight>
        <P14 color={THEME.greyColors.grey11} lineHeight="24px">
          {connection?.company?.longDescription}
        </P14>
        <Box display="flex" mt="24px">
          <Box display="flex" mr="40px" flexDirection="column">
            <P12 color={THEME.greyColors.grey1} transform={SUB_TEXT_TRANSFORM}>
              {capitalize(t('Read more'))}
            </P12>
            <ButtonRounded
              component="a"
              variant="text"
              color="primary"
              href={connection?.company?.homepageUrl}
              target="_blank"
              rel="noreferrer noopener"
              inlineBlock
            >
              <Box display="flex">
                <Box component="span" fontWeight="normal">
                  {capitalize(linkText ?? '')}
                </Box>
                <StyledIcon>
                  <CallMadeIcon color="inherit" fontSize="inherit" />
                </StyledIcon>
              </Box>
            </ButtonRounded>
          </Box>

          <Box display="flex" flexDirection="column">
            <P12 color={THEME.greyColors.grey1} transform={SUB_TEXT_TRANSFORM}>
              {capitalize(t('Support'))}
            </P12>

            <ButtonRounded
              component="a"
              variant="text"
              color="primary"
              href={connection?.company?.supportUrl}
              target="_blank"
              rel="noreferrer noopener"
              inlineBlock
            >
              <Box display="flex">
                <Box component="span" fontWeight="normal">
                  {capitalize(connection?.company?.name ?? '')} Support
                </Box>
                <StyledIcon>
                  <CallMadeIcon color="inherit" fontSize="inherit" />
                </StyledIcon>
              </Box>
            </ButtonRounded>
          </Box>
        </Box>
      </SectionRight>
    </Box>
  );
};

DetailsConnectBlock.propTypes = {
  connection: shape({
    status: string,
    name: string,
    company: shape({
      name: string,
      logo: string,
      homepageUrl: string,
      supportUrl: string,
      longDescription: string,
    }),
  }).isRequired,
  statusActionHandlers: shape({}).isRequired,
  handleViewConfiguration: func.isRequired,
};

export default DetailsConnectBlock;
