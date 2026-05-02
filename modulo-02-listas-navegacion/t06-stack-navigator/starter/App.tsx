import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native';

// TODO 1: Define el tipo StackParamList:
//   type StackParamList = {
//     Home: undefined;
//     Detalle: { nombre: string };
//   };
// TODO 2: Crea un Stack con createNativeStackNavigator<StackParamList>()
// TODO 3: Envuelve todo en <NavigationContainer>
// TODO 4: Añade las pantallas HomeScreen y DetalleScreen
// TODO 5: Navega de Home a Detalle pasando `nombre` como parámetro
// TODO 6: En DetalleScreen muestra el parámetro con route.params.nombre

type StackParamList = {
  Home: undefined;
  // TODO: añade Detalle
};

const Stack = createNativeStackNavigator<StackParamList>();

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Pokédex</Text>
      {/* TODO: botón que navega a Detalle */}
      <Button title="Ver Pikachu" onPress={() => { /* TODO */ }} />
    </View>
  );
}

function DetalleScreen({ route }: any) {
  // TODO: accede a route.params.nombre
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Detalle</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* TODO: añade la pantalla Detalle */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  title:  { fontSize: 24, fontWeight: '700' },
});
