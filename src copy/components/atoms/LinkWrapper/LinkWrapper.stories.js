import React from 'react';
import { P16 } from '../Typography/P16';
import THEME from '../../../constants/theme';
import { LinkWrapper as LinkWrapperComponent } from './LinkWrapper';

export const LinkWrapper = (args) => (
  <LinkWrapperComponent
    cursor={args.cursor}
    className={args.className}
    color={args.color}
    noUnderline={args.noUnderline}
  >
    <P16 color={THEME.primaryColors.primary}>Link</P16>
  </LinkWrapperComponent>
);

LinkWrapper.args = {
  cursor: 'pointer',
  className: 'blue',
  color: 'blue',
  noUnderline: true,
};

export default {
  title: 'Atoms/LinkWrapper',
  component: LinkWrapperComponent,
};
