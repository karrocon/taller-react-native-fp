# 🔗 Recursos y enlaces — Día 1

> Todos los enlaces verificados. Guardarlos en favoritos antes de la sesión.

---

## 🚀 Setup — Herramientas necesarias

| Herramienta | Enlace | Notas |
|---|---|---|
| **Node.js** (LTS) | https://nodejs.org/es/ | Versión 18+ recomendada |
| **Expo Go** (Android) | https://play.google.com/store/apps/details?id=host.exp.exponent | Para probar en móvil Android |
| **Expo Go** (iOS) | https://apps.apple.com/es/app/expo-go/id982107779 | Para probar en móvil iOS |
| **VS Code** | https://code.visualstudio.com/ | Editor recomendado |
| **Extensión RN Tools** | https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native | Extensión oficial para VS Code |

---

## 📚 Documentación oficial

| Recurso | Enlace | Para qué sirve |
|---|---|---|
| **React Native Docs** | https://reactnative.dev/docs/getting-started | Referencia completa |
| **Expo Docs** | https://docs.expo.dev/ | Todo sobre Expo |
| **Componentes RN** | https://reactnative.dev/docs/components-and-apis | Lista de todos los componentes |
| **StyleSheet API** | https://reactnative.dev/docs/stylesheet | Propiedades de estilo disponibles |
| **Flexbox en RN** | https://reactnative.dev/docs/flexbox | Guía de layout |

---

## 🎮 Herramientas interactivas (para practicar en clase)

| Recurso | Enlace | Descripción |
|---|---|---|
| **Snack (Expo online)** | https://snack.expo.dev/ | ⭐ Edita y ejecuta RN en el navegador, sin instalar nada |
| **Flexbox Froggy** | https://flexboxfroggy.com/#es | Aprende Flexbox jugando (funciona igual en RN) |
| **Flexbox Playground** | https://reactnative.dev/docs/flexbox#flex-direction | Playground oficial de RN |

> **Snack es muy útil para el Día 1**: si alguien no puede instalar Expo localmente, puede usar Snack desde el navegador sin instalar nada.

---

## 📦 APIs gratuitas (para ejercicios futuros)

| API | Enlace | Uso en el curso |
|---|---|---|
| **PokéAPI** | https://pokeapi.co/ | Lista de Pokémon — Días 4–8 |
| **PokéAPI docs** | https://pokeapi.co/docs/v2 | Referencia endpoints |
| **Pokémon images (DB)** | `https://img.pokemondb.net/artwork/{nombre}.jpg` | Imágenes de Pokémon por nombre |
| **Picsum Photos** | https://picsum.photos/ | Imágenes placeholder para ejercicios |

### Endpoints PokéAPI más útiles del curso

```
# Lista de Pokémon (primeros 20)
GET https://pokeapi.co/api/v2/pokemon?limit=20

# Detalle de un Pokémon
GET https://pokeapi.co/api/v2/pokemon/pikachu
GET https://pokeapi.co/api/v2/pokemon/1

# Respuesta del listado (estructura)
{
  "count": 1302,
  "results": [
    { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
    { "name": "ivysaur",   "url": "https://pokeapi.co/api/v2/pokemon/2/" },
    ...
  ]
}
```

---

## 🧩 Snippets para VS Code (instalar o usar manualmente)

### Snippet: componente básico
```json
{
  "React Native Component": {
    "prefix": "rnc",
    "body": [
      "import { View, Text, StyleSheet } from 'react-native';",
      "",
      "export default function ${1:ComponentName}() {",
      "  return (",
      "    <View style={styles.container}>",
      "      <Text>${2:Contenido}</Text>",
      "    </View>",
      "  );",
      "}",
      "",
      "const styles = StyleSheet.create({",
      "  container: {",
      "    flex: 1,",
      "    justifyContent: 'center',",
      "    alignItems: 'center',",
      "  },",
      "});"
    ],
    "description": "React Native component básico"
  }
}
```

> Archivo a crear: `.vscode/snippets.code-snippets` en la raíz del proyecto.

---

## 📖 Tutoriales recomendados (para alumnos avanzados o repaso)

| Recurso | Enlace | Nivel | Idioma |
|---|---|---|---|
| React Native Official Tutorial | https://reactnative.dev/docs/tutorial | Iniciación | Inglés |
| Expo Tutorial | https://docs.expo.dev/tutorial/introduction/ | Iniciación | Inglés |
| React Native en Español (YouTube) | https://www.youtube.com/results?search_query=react+native+español+tutorial | Varios | Español |
| Midudev — React Native | https://www.youtube.com/@midudev | Intermedio | Español |

---

## 🛠️ Comandos rápidos para el día

```bash
# Crear nuevo proyecto Expo
npx create-expo-app nombreProyecto

# Arrancar servidor de desarrollo
npm start

# Abrir en web
# (desde el terminal donde está corriendo) presionar: w

# Limpiar caché si algo no funciona
npx expo start --clear

# Reinstalar dependencias
rm -rf node_modules
npm install

# Ver versión de Node
node --version

# Ver versión de npm
npm --version
```

---

## ⚠️ Soluciones a problemas comunes

### "command not found: expo"
```bash
# Usar siempre npx, no expo directamente
npx create-expo-app miApp
npx expo start
```

### "Unable to find expo in this project"
```bash
npm install expo
```

### La app no conecta en el móvil
1. Verificar que el móvil y el ordenador están en la **misma red WiFi**
2. Si no funciona → usar la opción web (presionar `w`)
3. Como último recurso: usar **Snack** en el navegador

### Error: "Text strings must be rendered within a <Text> component"
Hay texto fuera de `<Text>`. Revisad el JSX — buscar texto suelto entre componentes.

### Pantalla en blanco al arrancar
Abrir la consola del terminal — casi siempre hay un error de sintaxis en `App.js`. Leer el mensaje de error.

---

## 🖼️ Assets gráficos para usar en clase

```
# Logo React Native (oficial)
https://reactnative.dev/img/tiny_logo.png

# Imagen Pokémon por nombre (pokemondb)
https://img.pokemondb.net/artwork/pikachu.jpg
https://img.pokemondb.net/artwork/bulbasaur.jpg
https://img.pokemondb.net/artwork/charizard.jpg

# Sprites Pokémon (pequeños, desde PokéAPI)
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png
# (el número es el ID del Pokémon: 1=bulbasaur, 25=pikachu, etc.)

# Imágenes placeholder (cualquier tamaño)
https://picsum.photos/200        → imagen aleatoria 200x200
https://picsum.photos/200/100    → imagen aleatoria 200x100
https://picsum.photos/seed/abc/200  → imagen fija (seed constante)
```
