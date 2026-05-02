import { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';

// TODO 1: Añade un estado booleano `modoOscuro` (useState) para activar/desactivar tema oscuro
// TODO 2: Añade un estado numérico `volumen` (0–100) para el volumen de música
// TODO 3: Renderiza un <Switch> conectado a `modoOscuro`
// TODO 4: Renderiza un <Text> que muestre el volumen actual: "Volumen: 75"
// TODO 5: Añade dos botones "+" y "−" que cambien el volumen en pasos de 10
// TODO 6 (bonus): Cambia el backgroundColor del container según `modoOscuro`

export default function SettingsSliders() {
  // TODO: useState aquí

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.row}>
        <Text style={styles.label}>Modo oscuro</Text>
        {/* TODO: Switch */}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Volumen</Text>
        {/* TODO: controles de volumen */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
});
