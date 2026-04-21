import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './src/types/navigation';
import HomeScreen from './src/screens/HomeScreen';
import DetalleScreen from './src/screens/DetalleScreen';
import AjustesScreen from './src/screens/AjustesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1a73e8' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Directorio' }} />
        <Stack.Screen
          name="Detalle"
          component={DetalleScreen}
          options={({ route }) => ({ title: route.params.nombre })}
        />
        <Stack.Screen name="Ajustes" component={AjustesScreen} options={{ title: 'Ajustes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
