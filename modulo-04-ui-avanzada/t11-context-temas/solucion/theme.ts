// Copia directa de PokeApp/src/constants/theme.ts

export const palette = {
  red:        '#CC0000',
  redDark:    '#A30000',
  redLight:   '#FF3333',
  gray50:     '#F8F9FA',
  gray100:    '#F1F3F5',
  gray200:    '#E9ECEF',
  gray600:    '#868E96',
  gray700:    '#495057',
  gray800:    '#343A40',
  gray900:    '#212529',
  white:      '#FFFFFF',
  black:      '#000000',
} as const;

export type Theme = {
  background:      string;
  backgroundCard:  string;
  textPrimary:     string;
  textSecondary:   string;
  textOnPrimary:   string;
  primary:         string;
  primaryDark:     string;
  border:          string;
};

export const lightTheme: Theme = {
  background:     palette.gray50,
  backgroundCard: palette.white,
  textPrimary:    palette.gray900,
  textSecondary:  palette.gray600,
  textOnPrimary:  palette.white,
  primary:        palette.red,
  primaryDark:    palette.redDark,
  border:         palette.gray200,
};

export const darkTheme: Theme = {
  background:     palette.gray900,
  backgroundCard: palette.gray800,
  textPrimary:    palette.gray50,
  textSecondary:  '#ADB5BD',
  textOnPrimary:  palette.white,
  primary:        palette.redLight,
  primaryDark:    palette.red,
  border:         palette.gray700,
};
