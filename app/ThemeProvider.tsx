'use client';

import React from 'react';
import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
} from '@mantine/core';
import { Global } from '@mantine/styles';
import { HeaderSimple } from '@/components/Header';
import { Space } from '@mantine/core';
import { AppShell } from '@mantine/core';

const mainColor: MantineColorsTuple = [
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

const secondaryColor: MantineColorsTuple = [
  "#f5effa",
  "#e5dcf0",
  "#cab4e1",
  "#ae8bd4",
  "#9668c8",
  "#8751c1",
  "#8046bf",
  "#6e38a8",
  "#623197",
  "#381b58"
]

const theme = createTheme({
  colors: {
    mainColor,
    secondaryColor
  },
  components: {
    Title: {
      defaultProps: {
        c: secondaryColor[9]
      }
    },
    Text: {
      defaultProps: {
        c: secondaryColor[9]
      }
    },
    Paper: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
        bg: mainColor[5],
      },
      styles: () => ({
        root: {
          overflow: 'hidden',
        },
      }),
    },

    Drawer: {
      defaultProps: {
        withCloseButton: true, 
        size: '50%',
        position: 'right',
      },
      styles: (theme: any) => ({
        header: {
          backgroundColor: theme.colors.mainColor[5]
        },
        content: {
          backgroundColor: theme.colors.mainColor[5], 
        },
        body: {
          padding: theme.spacing.md,
        }
      }),
    }
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
            backgroundColor: mainColor[1],
          },
        }}
      />

      <AppShell
        header={{ height: 70 }}
        padding={'md'}
      >
        <AppShell.Header>
          <HeaderSimple />
        </AppShell.Header>
        <AppShell.Main>
          {children}
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
