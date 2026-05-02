# Taller React Native — FP Iniciación

Repositorio oficial del taller **React Native para FP** — formato autodidacta, 6 módulos, 17 temas.  
Cada tema incluye diapositivas PDF, código `starter/` (con TODOs) y `solucion/` (código completo).

---

## Antes de empezar

Necesitas **3 cosas** antes del primer tema:

| # | Tarea | URL | Tiempo |
|---|-------|-----|--------|
| 1 | Crear cuenta en **GitHub** | [github.com/signup](https://github.com/signup) | 2 min |
| 2 | Crear cuenta en **Expo** | [expo.dev/signup](https://expo.dev/signup) | 2 min |
| 3 | Instalar **Expo Go** en el móvil | App Store / Google Play → "Expo Go" | 1 min |

> Si ya tienes cuenta en GitHub o Expo, sáltate ese paso.

---

## Instalación del entorno (Windows)

```powershell
# 1. Clona el repo
git clone https://github.com/karrocon/taller-react-native-fp.git
cd taller-react-native-fp\react-native

# 2. Instala dependencias de PokeApp (proyecto del curso)
cd PokeApp
npm install

# 3. Arranca en el navegador para probar
npx expo start --web
```

Necesitas **Node.js 20 LTS** o superior. Descárgalo en [nodejs.org](https://nodejs.org/es/download/).  
Para el emulador Android instala [Android Studio](https://developer.android.com/studio).

**iOS en Windows:** usa Expo Go en iPhone + escanea el QR por WiFi.

---

## Estructura del repo

```
react-native/
  slides-intro.pdf                  ← Presentación de introducción al curso
  PokeApp/                          ← Proyecto de referencia completo (TypeScript)
    src/
      components/                   ← PokemonCard, PokemonTypeBadge, BattleModal…
      hooks/                        ← usePokemonList, useBattleState, useTheme…
      screens/                      ← HomeScreen, DetailScreen, BattleScreen…
      types/                        ← Tipos TypeScript compartidos
      utils/                        ← mapToPokemon, colores, constantes
    __tests__/                      ← Tests Jest (mapToPokemon, hooks, componentes)
  modulo-01-fundamentos/
    t01-entorno-expo/
      slides-t01.pdf                ← Diapositivas del tema
      starter/App.tsx               ← Código base con TODOs
      solucion/App.tsx              ← Solución completa
    t02-jsx-estilos/
    t03-componentes-props/
    t04-estado-eventos/
  modulo-02-listas-navegacion/
    t05-listas/
    t06-stack-navigator/
    t07-tab-navigator/
  modulo-03-datos-api/
    t08-fetch-async/
    t09-useeffect-estados/
    t10-hooks-custom/
  modulo-04-ui-avanzada/
    t11-context-temas/
    t12-animaciones/
    t13-modal-svg/
  modulo-05-persistencia-arquitectura/
    t14-asyncstorage/
    t15-arquitectura-src/
  modulo-06-calidad-deploy/
    t16-testing-jest/
    t17-eas-build/
```

---

## Contenido del curso

### Módulo 1 — Fundamentos y entorno

| Tema | Título | Conceptos clave |
|------|--------|-----------------|
| T01 | Entorno y Expo | Node.js, Expo CLI, Expo Go, primer proyecto |
| T02 | JSX y estilos | JSX, `View`, `Text`, `StyleSheet`, flexbox |
| T03 | Componentes y props | Componentes funcionales, props, TypeScript básico |
| T04 | Estado y eventos | `useState`, `TouchableOpacity`, `TextInput` |

### Módulo 2 — Listas y navegación

| Tema | Título | Conceptos clave |
|------|--------|-----------------|
| T05 | Listas | `FlatList`, `SectionList`, `keyExtractor`, rendimiento |
| T06 | Stack Navigator | React Navigation, `push`/`pop`, `route.params` |
| T07 | Tab Navigator | `BottomTabNavigator`, iconos, estructura multi-sección |

### Módulo 3 — Datos y API

| Tema | Título | Conceptos clave |
|------|--------|-----------------|
| T08 | Fetch y async/await | `fetch`, promesas, `async/await`, manejo de errores |
| T09 | useEffect y estados de carga | `useEffect`, loading/error/data, `ActivityIndicator` |
| T10 | Custom hooks | `usePokemonList`, encapsular lógica, reutilización |

### Módulo 4 — UI avanzada

| Tema | Título | Conceptos clave |
|------|--------|-----------------|
| T11 | Context y temas | `createContext`, `useContext`, tema claro/oscuro |
| T12 | Animaciones | `Animated`, `useSharedValue`, flip de tarjeta |
| T13 | Modal y SVG | `Modal`, `react-native-svg`, `expo-av` |

### Módulo 5 — Persistencia y arquitectura

| Tema | Título | Conceptos clave |
|------|--------|-----------------|
| T14 | AsyncStorage | `@react-native-async-storage/async-storage`, persistencia local |
| T15 | Arquitectura `src/` | Estructura por capas, separación de responsabilidades |

### Módulo 6 — Calidad y deploy

| Tema | Título | Conceptos clave |
|------|--------|-----------------|
| T16 | Testing con Jest | Jest, `@testing-library/react-native`, mocks, cobertura |
| T17 | EAS Build | `eas build`, `app.json`, perfiles, APK/AAB, Google Play |

---

## Proyecto del curso — PokeApp

A lo largo del curso se construye **PokeApp**, una Pokédex completa en TypeScript que usa:
- [PokéAPI](https://pokeapi.co/) — datos de los 151 Pokémon originales
- React Navigation (Stack + Bottom Tabs)
- Custom hooks, Context API y AsyncStorage
- Animaciones con flip de tarjeta coleccionable
- Sistema de batallas con `useBattleState`
- Tests con Jest (unitarios + componentes)

```powershell
cd react-native\PokeApp
npm install
npx expo start          # QR para Expo Go
npx expo start --web    # Navegador
npm test                # Ejecutar tests
```

---

## Tecnología

| Herramienta | Versión |
|-------------|---------|
| Expo SDK | ~54.0.0 |
| React Native | 0.81.5 |
| React | 19.1.0 |
| TypeScript | ~5.3.3 |
| Node.js mínimo | 20 LTS |

---

## Recursos

### React Native y Expo

| Recurso | Descripción |
|---------|-------------|
| [React Native Docs](https://reactnative.dev/docs/getting-started) | Documentación oficial |
| [Expo Docs](https://docs.expo.dev) | Guías, APIs y referencia completa |
| [Expo SDK API](https://docs.expo.dev/versions/latest/) | Todos los módulos de Expo SDK |
| [EAS Build](https://docs.expo.dev/build/introduction/) | Compilar APK/IPA en la nube |
| [Expo Snack](https://snack.expo.dev) | Playground online sin instalar nada |

### React y JavaScript/TypeScript

| Recurso | Descripción |
|---------|-------------|
| [React Docs](https://react.dev) | Documentación oficial de React |
| [Hooks API](https://react.dev/reference/react) | `useState`, `useEffect`, `useMemo`, `useCallback` |
| [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) | Guía completa de TypeScript |
| [JavaScript MDN](https://developer.mozilla.org/es/docs/Web/JavaScript) | Referencia JS en español |

### Navegación

| Recurso | Descripción |
|---------|-------------|
| [React Navigation](https://reactnavigation.org/docs/getting-started) | Librería de navegación estándar |
| [Stack Navigator](https://reactnavigation.org/docs/native-stack-navigator) | Navegación con historial |
| [Bottom Tabs](https://reactnavigation.org/docs/bottom-tab-navigator) | Barra de tabs inferior |

### Diseño

| Recurso | Descripción |
|---------|-------------|
| [Flexbox Playground](https://flexbox.malven.co) | Visualizador interactivo de Flexbox |
| [React Native Flexbox](https://reactnative.dev/docs/flexbox) | Diferencias con CSS Flexbox |
| [React Native Paper](https://reactnativepaper.com) | Componentes Material Design |
| [NativeWind](https://www.nativewind.dev) | Tailwind CSS para React Native |

### APIs del curso

| Recurso | Descripción |
|---------|-------------|
| [PokéAPI](https://pokeapi.co/) | API REST gratuita de Pokémon |
| [JSONPlaceholder](https://jsonplaceholder.typicode.com) | API fake para pruebas |

### Inspiración

| Recurso | Descripción |
|---------|-------------|
| [Awesome React Native](https://github.com/jondot/awesome-react-native) | Lista curada de librerías |
| [React Native Directory](https://reactnative.directory) | Buscador de librerías compatibles con Expo |
| [Expo Examples](https://github.com/expo/examples) | Proyectos de ejemplo oficiales |

---

## Dudas y contacto

Abre un [Issue](../../issues) en este repositorio o pregunta en clase.
