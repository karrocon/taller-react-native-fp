import { Platform } from 'react-native';

const fontFamily = Platform.select({
  ios:     'System',
  android: 'Roboto',
  default: 'System',
});

export const typography = {
  // Tamaños
  xs:   { fontFamily, fontSize: 10, lineHeight: 14 },
  sm:   { fontFamily, fontSize: 12, lineHeight: 16 },
  md:   { fontFamily, fontSize: 14, lineHeight: 20 },
  lg:   { fontFamily, fontSize: 16, lineHeight: 24 },
  xl:   { fontFamily, fontSize: 20, lineHeight: 28 },
  xxl:  { fontFamily, fontSize: 24, lineHeight: 32 },
  xxxl: { fontFamily, fontSize: 32, lineHeight: 40 },

  // Pesos semánticos
  weights: {
    regular:   '400' as const,
    medium:    '500' as const,
    semibold:  '600' as const,
    bold:      '700' as const,
  },

  // Estilos de texto predefinidos
  numPokemon: {
    fontFamily,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500' as const,
    letterSpacing: 0.3,
  },
  nombrePokemon: {
    fontFamily,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700' as const,
    textTransform: 'capitalize' as const,
  },
  statLabel: {
    fontFamily,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '400' as const,
  },
  statValue: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700' as const,
  },
  screenTitle: {
    fontFamily,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700' as const,
  },
  sectionHeader: {
    fontFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.8,
  },
} as const;
