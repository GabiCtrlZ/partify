import { createMuiTheme } from '@material-ui/core'
import MuliRegulrar from '../assets/fonts/Muli-Regular.ttf'
import MuliBold from '../assets/fonts/Muli-Bold.ttf'
import ArimoHeRegulrar from '../assets/fonts/Arimo-Regular.ttf'
import ArimoHeBold from '../assets/fonts/Arimo-Bold.ttf'

export default createMuiTheme({
  palette: {
    primary: {
      light: '#44a5e5',
      main: '#3b9af7',
      dark: '#12a1ff',
    },
    secondary: {
      light: '#7bacd6',
      main: '#3490de',
      dark: '#0a7ee0',
    },
    background: {
      default: 'rgb(240,242,246)',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: 'Muli, Arimo, sans-serif',
  },
  overrides: {
    MuiPaper: {
      root: {
        display: 'flex',
        flexDirection: 'column',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      containedSecondary: {
        color: 'white',
      },
    },
    MuiCssBaseline: {
      '@global': {
        '*': {
          outline: 'none',
        },
        '#gtx-trans': { // hide google translate widget on text selection
          display: 'none',
        },
        '@font-face': [
          {
            fontFamily: 'Muli',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: 400,
            src: `
              url(${MuliRegulrar}) format('truetype')
            `,
            unicodeRange:
              // eslint-disable-next-line max-len
              'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
          },
          {
            fontFamily: 'Muli',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: 700,
            src: `
              url(${MuliBold}) format('truetype')
            `,
            unicodeRange:
              // eslint-disable-next-line max-len
              'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
          },
          {
            fontFamily: 'Arimo',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: 400,
            src: `
              url(${ArimoHeRegulrar}) format('truetype')
            `,
            unicodeRange:
              // eslint-disable-next-line max-len
              'U+0590-05FF, U+20AA, U+25CC, U+FB1D-FB4F',
          },
          {
            fontFamily: 'Arimo',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: 700,
            src: `
              url(${ArimoHeBold}) format('truetype')
            `,
            unicodeRange:
              // eslint-disable-next-line max-len
              'U+0590-05FF, U+20AA, U+25CC, U+FB1D-FB4F',
          },
        ],
        body: {
          margin: 0,
        },
      },
    },
  },
  measurements: {
    headerHeight: 71,
    topMenuHeight: 60,
    intentListWidth: 380,
    entitiesListWidth: 300,
    cardSize: 190,
    cardSizeHeight: 125,
    tagEditorMaxWidth: 1200,
  },

})
