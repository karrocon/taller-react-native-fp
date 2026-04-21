# 🏋️ Ejercicios — Día 1: React Native

> Estos ejercicios están ordenados de menos a más dificultad.
> El alumno **no debe copiar la solución directamente** — que intente primero.
> Tiempo estimado: 30–45 min en total.

---

## Ejercicio 1 — Tarjeta de presentación (básico)

### Enunciado
Crea una app que muestre tu nombre y edad en pantalla.

**Bonus:** añade también tu ciudad y un emoji favorito.

### Lo que debe aparecer en pantalla
```
Nombre: Juan García
Edad: 20
Ciudad: Madrid
Favorito: 🎮
```

### Pistas
- Usa `View` como contenedor
- Usa `Text` para cada dato
- Pon `padding` al contenedor para que no pegue en el borde

### Solución

```jsx
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Nombre: Juan García</Text>
      <Text>Edad: 20</Text>
      <Text>Ciudad: Madrid</Text>
      <Text>Favorito: 🎮</Text>
    </View>
  );
}
```

---

## Ejercicio 2 — Tarjeta con estilos (medio)

### Enunciado
Mejora la tarjeta del ejercicio 1 añadiendo estilos:
- El nombre en grande (28px) y negrita
- Fondo de color suave (`#e8f4fd`)
- Todo el contenido centrado en pantalla
- Un color diferente para cada línea de texto

### Pistas
- Usa `StyleSheet.create()` en lugar de estilos inline
- Para centrar en pantalla: `flex: 1, justifyContent: 'center', alignItems: 'center'`
- `fontWeight: 'bold'` para negrita

### Solución

```jsx
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.nombre}>Juan García</Text>
      <Text style={styles.edad}>20 años</Text>
      <Text style={styles.ciudad}>📍 Madrid</Text>
      <Text style={styles.favorito}>Favorito: 🎮</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f4fd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  nombre: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a73e8',
    marginBottom: 8,
  },
  edad: {
    fontSize: 18,
    color: '#444',
    marginBottom: 4,
  },
  ciudad: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  favorito: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
});
```

---

## Ejercicio 3 — Tarjeta con imagen circular (avanzado)

### Enunciado
Añade una foto de perfil circular a tu tarjeta de presentación.

**Requisitos:**
- La imagen debe ser circular (sin esquinas)
- Tamaño: 120×120 px
- Colocada encima del nombre
- Margen inferior para separarla del texto

**URL de imagen de prueba:** `https://picsum.photos/200`

*(Puedes cambiar la URL por cualquier imagen real)*

### Pistas
- Usa el componente `Image` de React Native
- `borderRadius: 60` (la mitad del ancho) hace la imagen circular
- El componente `Image` **siempre** necesita `width` y `height` en los estilos

### Solución

```jsx
import { Text, View, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://picsum.photos/200' }}
        style={styles.avatar}
      />
      <Text style={styles.nombre}>Juan García</Text>
      <Text style={styles.edad}>20 años · Madrid</Text>
      <Text style={styles.bio}>Estudiante de DAM 📱</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#1a73e8',
  },
  nombre: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  edad: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
```

---

## Ejercicio Bonus — Tarjeta con dos columnas (para los que acaban antes)

### Enunciado
Crea una pantalla con dos "tarjetas" colocadas en fila horizontal, cada una mostrando datos de una persona distinta.

### Pistas
- `flexDirection: 'row'` en el contenedor padre
- Cada tarjeta con `flex: 1` para que ocupen el mismo espacio
- Usa `margin` para separarlas

### Solución parcial (estructura)

```jsx
<View style={{ flexDirection: 'row', padding: 16 }}>
  <View style={{ flex: 1, backgroundColor: '#e3f2fd', padding: 12, margin: 4, borderRadius: 8 }}>
    <Text style={{ fontWeight: 'bold' }}>Ana</Text>
    <Text>22 años</Text>
  </View>
  <View style={{ flex: 1, backgroundColor: '#fce4ec', padding: 12, margin: 4, borderRadius: 8 }}>
    <Text style={{ fontWeight: 'bold' }}>Carlos</Text>
    <Text>21 años</Text>
  </View>
</View>
```

---

## 📋 Chuleta rápida — Componentes del día

| Componente | Uso | Ejemplo |
|---|---|---|
| `View` | Contenedor | `<View style={...}>` |
| `Text` | Texto | `<Text>Hola</Text>` |
| `Image` | Imagen | `<Image source={{ uri: '...' }} style={{ width: 100, height: 100 }} />` |
| `StyleSheet.create` | Estilos organizados | `const styles = StyleSheet.create({...})` |

## 📋 Chuleta rápida — Propiedades de estilo más usadas hoy

| Propiedad | Valores de ejemplo |
|---|---|
| `fontSize` | `14`, `18`, `24`, `28` |
| `fontWeight` | `'normal'`, `'bold'`, `'600'` |
| `color` | `'red'`, `'#1a73e8'`, `'rgba(0,0,0,0.5)'` |
| `backgroundColor` | `'#f0f0f0'`, `'white'` |
| `padding` | `8`, `16`, `20` |
| `margin` | `8`, `16` |
| `borderRadius` | `4`, `8`, `60` |
| `flex` | `1` (ocupa todo el espacio disponible) |
| `justifyContent` | `'center'`, `'flex-start'`, `'space-between'` |
| `alignItems` | `'center'`, `'flex-start'`, `'stretch'` |
| `flexDirection` | `'column'` (por defecto), `'row'` |
