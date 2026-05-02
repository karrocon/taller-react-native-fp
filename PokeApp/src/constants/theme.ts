// ─── Paleta base ─────────────────────────────────────────────────────────────
export const palette = {
  red:        '#CC0000',
  redDark:    '#A30000',
  redLight:   '#FF3333',

  blue:       '#3B5BDB',
  blueLight:  '#74C0FC',

  yellow:     '#FAB005',
  yellowLight:'#FFE066',

  gray50:     '#F8F9FA',
  gray100:    '#F1F3F5',
  gray200:    '#E9ECEF',
  gray300:    '#DEE2E6',
  gray400:    '#CED4DA',
  gray500:    '#ADB5BD',
  gray600:    '#868E96',
  gray700:    '#495057',
  gray800:    '#343A40',
  gray900:    '#212529',

  white:      '#FFFFFF',
  black:      '#000000',
} as const;

// ─── Tokens por tema ──────────────────────────────────────────────────────────
export type Theme = {
  background:       string;
  backgroundCard:   string;
  backgroundInput:  string;
  textPrimary:      string;
  textSecondary:    string;
  textDisabled:     string;
  textOnPrimary:    string;
  primary:          string;
  primaryDark:      string;
  primaryLight:     string;
  border:           string;
  shadow:           string;
};

export const lightTheme: Theme = {
  background:       palette.gray50,
  backgroundCard:   palette.white,
  backgroundInput:  palette.gray100,
  textPrimary:      palette.gray900,
  textSecondary:    palette.gray600,
  textDisabled:     palette.gray400,
  textOnPrimary:    palette.white,
  primary:          palette.red,
  primaryDark:      palette.redDark,
  primaryLight:     palette.redLight,
  border:           palette.gray200,
  shadow:           palette.black,
};

export const darkTheme: Theme = {
  background:       palette.gray900,
  backgroundCard:   palette.gray800,
  backgroundInput:  palette.gray700,
  textPrimary:      palette.gray50,
  textSecondary:    palette.gray400,
  textDisabled:     palette.gray600,
  textOnPrimary:    palette.white,
  primary:          palette.redLight,
  primaryDark:      palette.red,
  primaryLight:     '#FF6666',
  border:           palette.gray700,
  shadow:           palette.black,
};
