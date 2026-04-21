import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './src/types/pokemon';
import HomeScreen    from './src/screens/HomeScreen';
import DetalleScreen from './src/screens/DetalleScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle:      { backgroundColor: '#cc0000' },
          headerTintColor:  'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home"    component={HomeScreen}    options={{ title: '🔴 Pokédex' }} />
        <Stack.Screen name="Detalle" component={DetalleScreen}
          options={({ route }) => ({ title: route.params.nombre })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
