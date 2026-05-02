import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';

// TODO 1: Define TabsParamList con tres pestañas:
//   type TabsParamList = { Inicio: undefined; Pokédex: undefined; Ajustes: undefined; };
// TODO 2: Crea Tab con createBottomTabNavigator<TabsParamList>()
// TODO 3: Añade 3 pantallas al Tab.Navigator
// TODO 4: Añade iconos con `tabBarIcon` usando cualquier librería de iconos
//         o con emojis/texto como fallback
// TODO 5: Personaliza tabBarActiveTintColor y tabBarStyle

type TabsParamList = {
  Inicio:  undefined;
  // TODO: añade Pokédex y Ajustes
};

const Tab = createBottomTabNavigator<TabsParamList>();

function InicioScreen() {
  return <View style={styles.center}><Text style={styles.title}>Inicio 🏠</Text></View>;
}

function PokedexScreen() {
  return <View style={styles.center}><Text style={styles.title}>Pokédex 📖</Text></View>;
}

function AjustesScreen() {
  return <View style={styles.center}><Text style={styles.title}>Ajustes ⚙️</Text></View>;
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Inicio" component={InicioScreen} />
        {/* TODO: añade Pokédex y Ajustes con iconos */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title:  { fontSize: 22, fontWeight: '700' },
});
