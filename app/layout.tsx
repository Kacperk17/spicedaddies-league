import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider, createTheme, MantineColorsTuple } from '@mantine/core';
import { Global } from '@mantine/styles';
import ThemeProvider from './ThemeProvider';


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
  '#00973c'
];

const theme = createTheme({
  colors: {
    myColor,
  },
  components: {
    Table: {
      defaultProps: {
        bg: myColor[7]
      }
    },
  },

});

export const metadata = {
  title: 'Spicedaddies',
  description: 'The greatest league in the world',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <ThemeProvider children={children} />
      </body>
    </html>
  );
}
