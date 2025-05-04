'use client';

import React from 'react';
import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
} from '@mantine/core';
import { Global } from '@mantine/styles';

const myColor: MantineColorsTuple = [
  '#e6ffee',
  '#d3f9e0',
  '#a8f2c0',
  '#7aea9f',
  '#54e382',
  '#3bdf70',
  '#2bdd66',
  '#1bc455',
  '#0bae4a',
  '#00973c',
];

const theme = createTheme({
  colors: {
    myColor,
  },
  components: {
    Table: {
      defaultProps: {
        bg: myColor[7],
      },
    },
  },
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      <Global
        styles={{
          body: {
            margin: 0,
            padding: 0,
            backgroundColor: myColor[1],
          },
        }}
      />
      {children}
    </MantineProvider>
  );
}
