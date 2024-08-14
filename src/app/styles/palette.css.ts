import { darken, lighten } from 'polished';

export default {
  common: {
    white: '#ffffff',
    black: '#000000',
  },
  primary: {
    light: '#901ded',
    main: '#491b6e',
    dark: '#3b105e',
  },
  secondary: {
    main: '#491b6e',
  },
  link: {
    light: '#ffffff',
    main: '#1e3c68',
    dark: '#1e3c68',
  },
  success: {
    light: '#d4edda',
    main: '#28a745',
    dark: '#155724',
  },
  warning: {
    light: lighten(0.1, '#E28100'),
    main: '#E28100',
    dark: darken(0.1, '#E28100'),
  },
  info: {
    light: '#d1ecf1',
    main: '#72DBCF',
    dark: '#0c5460',
  },
  error: {
    light: '#f8d7da',
    main: '#dc3545',
    dark: '#721c24',
  },
  background: {
    light: 'rgb(245, 245, 245)',
    main: 'rgb(53, 64, 82)',
    dark: '#1a2029',
  },
  notification: 'rgb(74 105 155)',
  boxShadow: {
    main: 'rgb(0 0 0 / 25%) 0px 1px 5px -1px',
  },
  grey: {
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#515151',
    800: '#424242',
    900: '#212121',
  },
};
