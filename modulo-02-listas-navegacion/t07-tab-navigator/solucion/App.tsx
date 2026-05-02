import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native';

// Estructura igual a PokeApp: Root Stack → Tab → Pokedex Stack anidado

type RootStackParamList  = { Splash: undefined; Main: undefined };
type TabsParamList       = { HomeTab: undefined; PokedexTab: undefined; AjustesTab: undefined };
type PokedexStackParamList = { Pokedex: undefined; Detalle: { nombre: string; id: number } };

const RootStack    = createNativeStackNavigator<RootStackParamList>();
const Tabs         = createBottomTabNavigator<TabsParamList>();
const PokedexStack = createNativeStackNavigator<PokedexStackParamList>();

function SplashScreen({ navigation }: any) {
  return (
    <View style={[styles.center, { backgroundColor: '#EF5350' }]}>
      <Text style={[styles.title, { color: '#fff', fontSize: 32 }]}>Pokédex</Text>
      <Text style={{ color: 'rgba(255,255,255,.8)', marginTop: 8 }}
        onPress={() => navigation.replace('Main')}>
        Toca para entrar →
      </Text>
    </View>
  );
}

function HomeScreen() {
  return <View style={styles.center}><Text style={styles.title}>Inicio 🏠</Text></View>;
}

function PokedexScreen() {
  return <View style={styles.center}><Text style={styles.title}>Lista Pokémon 📖</Text></View>;
}

function AjustesScreen() {
  return <View style={styles.center}><Text style={styles.title}>Ajustes ⚙️</Text></View>;
}

function PokedexStackNav() {
  return (
    <PokedexStack.Navigator>
      <PokedexStack.Screen name="Pokedex" component={PokedexScreen} options={{ title: 'Pokédex' }} />
    </PokedexStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#EF5350',
        tabBarStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Inicio',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="PokedexTab"
        component={PokedexStackNav}
        options={{
          title: 'Pokédex',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'book' : 'book-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AjustesTab"
        component={AjustesScreen}
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen name="Main"   component={MainTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5' },
  title:  { fontSize: 22, fontWeight: '700', color: '#212121' },
});
