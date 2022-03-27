import React from 'react';
import {
  StyledHeader,
  StyledHeaderContent,
  StyledHeaderContentRight,
  StyledHeaderContentLeft,
  StyledHamburgerButton,
} from './styled';
import { useGlobalContext } from '../../../../context';
import IconButton from '../../../atoms/IconButton';
import Logo from '../../../../assets/icons/Logo';
import { P24 } from '../../../atoms/P24';
import UserMenu from './UserMenu';

function Header() {
  const { isAuthenticated, hasCompletedProfile, signOut, menuIsOpen, toggleMenu } = useGlobalContext();

  return (
    <StyledHeader>
      <StyledHeaderContent>
        <StyledHeaderContentRight to="/">
          <Logo size={38} />
          <P24 $fontWeight="600">ListApp</P24>
        </StyledHeaderContentRight>

        <StyledHeaderContentLeft>
          {isAuthenticated &&
            (hasCompletedProfile ? (
              <UserMenu />
            ) : (
              <IconButton showIcon={false} onClick={signOut} label="Sign out" width="auto" border="1px solid #fff" />
            ))}

          <StyledHamburgerButton type="button" onClick={toggleMenu} $menuIsOpen={menuIsOpen}>
            <span>&nbsp;</span>
          </StyledHamburgerButton>
        </StyledHeaderContentLeft>
      </StyledHeaderContent>
    </StyledHeader>
  );
}

export default Header;
