import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useField, useFormikContext } from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { parseInitials } from '../../../../../utils/parseInitials';
import CircleImage from '../../../../table/CircleImage';
import { P14, P12, Tag } from '../../../../atoms';
import { StyledWrapper, StyledCheckbox } from './styled';
import { FlexContainer } from '../../../../atoms/flex/FlexContainer';

const TeamMember = ({ user, sharedWith }) => {
  const { t } = useTranslation();
  const { isSubmitting } = useFormikContext();
  const [{ onChange }] = useField('ids');
  const userId = user?.id?.replace('customer:', '');
  const isInvited = sharedWith?.includes(userId);

  return (
    <StyledWrapper isInvited={isInvited}>
      <FlexContainer justifyContent="space-between">
        <FlexContainer>
          <CircleImage
            text={parseInitials(user?.name).toUpperCase()}
            logo={user?.avatar}
            size={30}
            bgColor="#c4cbd2"
            color="#fff"
            fontSize="14px"
          />
          <Box>
            <P14 margin="0 0 0 12px">{user?.name}</P14>
            <P12 color=" #787F88" margin="0 0 0 12px">
              {user?.email}
            </P12>
          </Box>
        </FlexContainer>
        <FlexContainer justifyContent="space-between" alignItems="center">
          {isInvited && (
            <Box>
              <Tag backgroundColor="rgba(28, 206, 106, 0.1)" color="#06AA4E">
                {t('Invited')}
              </Tag>
            </Box>
          )}
          <Box ml="20px">
            <FormControlLabel
              value={userId}
              disabled={isSubmitting || isInvited}
              control={
                <StyledCheckbox onChange={onChange} name="ids" isInvited={isInvited} defaultChecked={isInvited} />
              }
            />
          </Box>
        </FlexContainer>
      </FlexContainer>
    </StyledWrapper>
  );
};

TeamMember.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  sharedWith: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TeamMember;
