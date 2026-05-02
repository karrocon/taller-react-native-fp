import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { RootStackParamList, TabsParamList, PokedexStackParamList, HomeStackParamList } from './src/types/navigation';
import { SPLASH, MAIN, POKEDEX_TAB, AJUSTES_TAB, HOME_TAB, DETALLE, POKEDEX, HOME, CONFIGURAR_EQUIPO, BATALLA } from './src/constants/navigation';
import SplashScreen from './src/screens/SplashScreen';
import PokedexScreen from './src/screens/PokedexScreen';
import DetallePokemonScreen from './src/screens/DetallePokemonScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { ThemeProvider, useTheme } from './src/hooks/useTheme';
import { PokemonProvider } from './src/hooks/usePokemonsContext';
import { SoundProvider, useSoundSettings } from './src/hooks/useSoundSettings';
import { useEffect } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { capitalize } from './src/utils/capitalize';
import { StatusBar } from 'expo-status-bar';
import { ConfigurarEquipoScreen } from './src/screens/ConfigurarEquipoScreen';
import { BatallaScreen } from './src/screens/BatallaScreen';

const RootStack    = createNativeStackNavigator<RootStackParamList>();
const Tabs         = createBottomTabNavigator<TabsParamList>();
const HomeStack    = createNativeStackNavigator<HomeStackParamList>();
const PokedexStack = createNativeStackNavigator<PokedexStackParamList>();

export default function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
      <PokemonProvider>
      <StatusBar hidden />
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name={SPLASH} component={SplashScreen} />
          <RootStack.Screen name={MAIN}   component={MainTabs} />
        </RootStack.Navigator>
      </NavigationContainer>
      </PokemonProvider>
      </SoundProvider>
    </ThemeProvider>
  );
}

function MainTabs() {
  const { theme } = useTheme();
  const { startMenuBGM, stopMenuBGM } = useSoundSettings();

  useEffect(() => {
    startMenuBGM();
    return () => { stopMenuBGM(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle:             { backgroundColor: theme.backgroundCard, opacity: 0.9 },
        tabBarActiveTintColor:   theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        headerShown:             false,
      }}>
      <Tabs.Screen
        name={HOME_TAB}
        component={HomeStackNav}
        options={({ route }) => {
          const focused = getFocusedRouteNameFromRoute(route) ?? HOME;
          const hideBar = focused === BATALLA || focused === CONFIGURAR_EQUIPO;
          return {
            tabBarStyle: hideBar ? { display: 'none' } : { backgroundColor: theme.backgroundCard, opacity: 0.9 },
            tabBarIcon: ({ focused: f, color, size }) => (
              <Ionicons name={f ? 'home' : 'home-outline'} size={size} color={color} />
            ),
          };
        }}
      />
      <Tabs.Screen
        name={POKEDEX_TAB}
        component={PokedexStackNav}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'game-controller' : 'game-controller-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={AJUSTES_TAB}
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

function HomeStackNav() {
  const { theme } = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle:            { backgroundColor: theme.background },
        headerTintColor:        theme.textPrimary,
        headerTitleStyle:       { fontWeight: 'bold', color: theme.textPrimary },
        headerShadowVisible:    false,
        headerShown:            false
      }}>
      <HomeStack.Screen name={HOME} component={HomeScreen} options={{ title: 'Inicio' }} />
      <HomeStack.Screen name={CONFIGURAR_EQUIPO} component={ConfigurarEquipoScreen} options={{ title: 'Configurar Equipo' }} />
      <HomeStack.Screen name={BATALLA} component={BatallaScreen} options={{ title: 'Batalla' }} />
    </HomeStack.Navigator>
  );
}

function PokedexStackNav() {
  const { theme } = useTheme();
  return (
    <PokedexStack.Navigator
      screenOptions={{
        headerStyle:            { backgroundColor: theme.background },
        headerTintColor:        theme.textPrimary,
        headerTitleStyle:       { fontWeight: 'bold', color: theme.textPrimary },
        headerShadowVisible:    false,
      }}>
      <PokedexStack.Screen name={POKEDEX} component={PokedexScreen} options={{ title: 'Pokédex '}} />
      <PokedexStack.Screen
        name={DETALLE}
        component={DetallePokemonScreen}
        options={({ route }) => ({ title: capitalize(route.params.pokemon.nombre) })}
      />
    </PokedexStack.Navigator>
  );
}
