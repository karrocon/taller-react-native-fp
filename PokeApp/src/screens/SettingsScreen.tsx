import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { useTheme } from '../hooks/useTheme';
import { useSoundSettings } from '../hooks/useSoundSettings';
import { radii, shadows } from '../utils/styles';

export default function SettingsScreen() {
  const { theme, isDark, mode, setMode } = useTheme();
  const { bgVolume, fxVolume, setBgVolume, setFxVolume } = useSoundSettings();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* ── Pantalla ─────────────────────────────────────────────── */}
        <Text style={styles.sectionHeader}>Pantalla</Text>
        <View style={styles.card}>
          <ThemeRow mode={mode} setMode={setMode} theme={theme} styles={styles} />
        </View>

        {/* ── Sonido ───────────────────────────────────────────────── */}
        <Text style={styles.sectionHeader}>Sonido</Text>
        <View style={styles.card}>
          <SliderRow
            label="Música de fondo"
            value={bgVolume}
            onValueChange={setBgVolume}
            onSlidingComplete={setBgVolume}
            theme={theme}
          />
          <View style={styles.divider} />
          <SliderRow
            label="Efectos de sonido"
            value={fxVolume}
            onValueChange={setFxVolume}
            onSlidingComplete={setFxVolume}
            theme={theme}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeRowProps = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  theme: ReturnType<typeof useTheme>['theme'];
  styles: ReturnType<typeof createStyles>;
};

function ThemeRow({ mode, setMode, theme, styles }: ThemeRowProps) {
  const labels: Record<ThemeMode, string> = { system: 'Sistema', light: 'Claro', dark: 'Oscuro' };
  return (
    <View style={{ gap: spacing.xs }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ ...typography.md, color: theme.textPrimary, fontWeight: '700' }}>Tema</Text>
        <Text style={{ ...typography.sm, color: theme.textSecondary, fontWeight: '600', minWidth: 54, textAlign: 'right' }}>
          {labels[mode]}
        </Text>
      </View>
      <View style={styles.modeGrid}>
        <ModeButton label="Sistema" active={mode === 'system'} onPress={() => setMode('system')} />
        <ModeButton label="Claro"   active={mode === 'light'}  onPress={() => setMode('light')}  />
        <ModeButton label="Oscuro"  active={mode === 'dark'}   onPress={() => setMode('dark')}   />
      </View>
    </View>
  );
}

type ModeButtonProps = { label: string; active: boolean; onPress: () => void };

function ModeButton({ label, active, onPress }: ModeButtonProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <Pressable
      onPress={onPress}
      style={[styles.modeButton, active && { backgroundColor: theme.primary, borderColor: theme.primary }]}
    >
      <Text style={[styles.modeText, active && { color: theme.textOnPrimary }]}>{label}</Text>
    </Pressable>
  );
}

type SliderRowProps = {
  label: string;
  value: number;
  onValueChange: (v: number) => void;
  onSlidingComplete?: (v: number) => void;
  theme: ReturnType<typeof useTheme>['theme'];
};

function SliderRow({ label, value, onValueChange, onSlidingComplete, theme }: SliderRowProps) {
  const pct = Math.round(value * 100);
  return (
    <View style={{ gap: spacing.xs }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ ...typography.md, color: theme.textPrimary, fontWeight: '700' }}>{label}</Text>
        <Text style={{ ...typography.sm, color: theme.textSecondary, fontWeight: '600', minWidth: 36, textAlign: 'right' }}>
          {pct}%
        </Text>
      </View>
      <Slider
        style={{ width: '100%', height: 36 }}
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        value={value}
        onValueChange={onValueChange}
        onSlidingComplete={onSlidingComplete}
        minimumTrackTintColor={theme.primary}
        maximumTrackTintColor={theme.border}
        thumbTintColor={theme.primary}
      />
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const createStyles = (theme: ReturnType<typeof useTheme>['theme']) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      padding: spacing.lg,
      paddingBottom: spacing.xl,
    },
    sectionHeader: {
      ...typography.lg,
      color: theme.textSecondary,
      fontWeight: '900',
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginBottom: spacing.sm,
      marginTop: spacing.md,
    },
    card: {
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.backgroundCard,
      padding: spacing.lg,
      marginBottom: spacing.md,
      gap: spacing.md,
      ...shadows.sm,
    },
    cardTitle: {
      ...typography.xl,
      color: theme.textPrimary,
      fontWeight: '900',
    },
    cardSubtitle: {
      ...typography.md,
      color: theme.textSecondary,
    },
    modeGrid: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    modeButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: radii.full,
      paddingVertical: spacing.md,
      backgroundColor: theme.backgroundInput,
    },
    modeText: {
      ...typography.sm,
      color: theme.textPrimary,
      fontWeight: '900',
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.border,
    },
  });