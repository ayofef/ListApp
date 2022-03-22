import React from 'react';
import { P as PComponent } from '../P';
import { P11B as P11BComponent } from '../P11B';
import { P12 as P12Component } from '../P12';
import { P14 as P14Component } from '../P14';
import { P14B as P14BComponent } from '../P14B';
import THEME from '../../../../constants/theme';

export const P = (args) => <PComponent {...args}>Paragraph</PComponent>;
export const P11B = (args) => <P11BComponent {...args}>Paragraph 11 Bold</P11BComponent>;
export const P12 = (args) => <P12Component {...args}>Paragraph 12</P12Component>;
export const P14 = (args) => <P14Component {...args}>Paragraph 14</P14Component>;
export const P14B = (args) => <P14BComponent {...args}>Paragraph 14 Bold</P14BComponent>;
PComponent.args = {
  margin: '0',
  padding: '0',
  opacity: '1',
  minHeight: 'auto',
  cursor: 'inherit',
  whiteSpace: 'normal',
  width: 'auto',
  height: 'auto',
  textOverflow: 'initial',
  textTransform: 'none',
  overflow: 'visible',
  maxWidth: 'none',
  letterSpacing: 'normal',
  display: 'block',
  capitalize: false,
  noWrap: false,
};

export default {
  title: 'Typography/Paragraphs',
  component: PComponent,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: [THEME.greyColors.grey3, THEME.primaryColors.black, THEME.primaryColors.green],
      },
    },
  },
};
