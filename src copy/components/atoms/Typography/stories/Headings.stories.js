import React from 'react';
import { H1 } from '../H1';
import { H2 } from '../H2';
import { H3 } from '../H3';
import { H4, TempH4 } from '../H4';
import { H5 } from '../H5';
import { TempH2 } from '../TempH2';
import { H5New } from '../H5New';
import { H3B } from '../H3B';
import { H1Dashboard } from '../H1Dashboard';

export const Heading1 = () => <H1>Heading 1</H1>;
export const Heading2 = () => <H2>Heading 2</H2>;
export const TempHeading2 = () => <TempH2>Temp Heading 2</TempH2>;
export const Heading3 = () => <H3>Heading 3</H3>;
export const Heading3Bold = () => <H3B>Heading 3 Bold</H3B>;
export const Heading4 = () => <H4>Heading 4</H4>;
export const TempHeading4 = () => <TempH4>Temp Heading 4</TempH4>;
export const Heading5 = () => <H5>Heading 5</H5>;
export const Heading5New = () => <H5New>Heading 5 New</H5New>;
export const Heading1Dashboard = () => <H1Dashboard>Heading 1 Dashboard</H1Dashboard>;

export default {
  title: 'Typography/Headings',
  component: H1,
};
