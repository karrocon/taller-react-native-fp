import { Dimensions, StyleSheet } from 'react-native';
import type { Theme } from '../constants/theme';
import { spacing } from '../constants/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Dimensiones de la card CCG ──────────────────────────────────────────────
export const CARD_WIDTH  = Math.min(SCREEN_WIDTH * 0.90, 360);
export const CARD_HEIGHT = CARD_WIDTH * 1.5;    // proporción estándar trading card

// ─── Sombras reutilizables ────────────────────────────────────────────────────
export const shadows = {
  sm: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  md: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  lg: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
  },
  xl: {
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
  },
} as const;

/** Genera sombra de tipo glow con el color del tipo primario */
export function glowShadow(color: string) {
  return {
    elevation: 12,
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 14,
  };
}

// ─── Radios de borde ─────────────────────────────────────────────────────────
export const radii = {
  sm:   6,
  md:   12,
  lg:   20,
  full: 999,
} as const;

// ─── Estilos de layout comunes ────────────────────────────────────────────────
export const layout = StyleSheet.create({
  flex1:        { flex: 1 },
  center:       { alignItems: 'center', justifyContent: 'center' },
  row:          { flexDirection: 'row', alignItems: 'center' },
  spaceBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  screenPad:    { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
});

// ─── Fábrica de estilos temáticos ─────────────────────────────────────────────
// Uso: const s = makeStyles(theme);  luego: <View style={s.card} />
export function makeStyles(theme: Theme) {
  return StyleSheet.create({
    // Pantallas
    screen: {
      flex: 1,
      backgroundColor: theme.background,
    },
    screenPadded: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },

    // Tarjetas
    card: {
      backgroundColor: theme.backgroundCard,
      borderRadius: radii.md,
      padding: spacing.md,
      ...shadows.md,
    },
    cardSmall: {
      backgroundColor: theme.backgroundCard,
      borderRadius: radii.sm,
      padding: spacing.sm,
      ...shadows.sm,
    },

    // Textos
    textPrimary: {
      color: theme.textPrimary,
    },
    textSecondary: {
      color: theme.textSecondary,
    },

    // Separador
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.border,
      marginVertical: spacing.sm,
    },

    // Input
    input: {
      backgroundColor: theme.backgroundInput,
      borderRadius: radii.sm,
      borderWidth: 1,
      borderColor: theme.border,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      color: theme.textPrimary,
      fontSize: 14,
    },

    // ─── CCG Card ──────────────────────────────────────────────────────────────
    cardCCG: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: radii.lg,
      overflow: 'hidden',
      ...shadows.xl,
    },

    // ─── Stat bar ──────────────────────────────────────────────────────────────
    statRow: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      columnGap: spacing.sm,
    },
    statLabel: {
      flex: 2,
      color: theme.textSecondary,
      fontSize: 11,
      lineHeight: 15,
    },
    statBarTrack: {
      flex: 3,
      height: 6,
      backgroundColor: theme.border,
      borderRadius: radii.full,
      overflow: 'hidden' as const,
    },
    statValue: {
      width: 28,
      textAlign: 'right' as const,
      color: theme.textPrimary,
      fontSize: 12,
      fontWeight: '700' as const,
    },

    // ─── List item (PokemonListItem) ────────────────────────────────────────────
    listCard: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      marginHorizontal: spacing.md,
      marginVertical: 5,
      borderRadius: 14,
      backgroundColor: theme.backgroundCard,
      overflow: 'hidden' as const,
      ...shadows.md,
    },
    listCardIndex: {
      fontSize: 11,
      color: theme.textSecondary,
      fontWeight: '500' as const,
    },
    listCardName: {
      fontSize: 17,
      fontWeight: '700' as const,
      color: theme.textPrimary,
      marginTop: 1,
      textTransform: 'capitalize' as const,
    },
    splash: {
      width: 256,
      height: 256,
      marginBottom: 24,
    },
    button: {
      backgroundColor: theme.background,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: radii.sm,
      ...shadows.sm,
    },
    backgroundImage: {
      flex: 1,
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    }
  });
}
