# Taller React Native — FP Iniciación

Repositorio oficial del taller **React Native para FP**.  
Aquí encontrarás los materiales, ejercicios y scripts de instalación de cada sesión.

## Antes de venir a clase

Necesitas **3 cosas** antes del primer día:

| # | Tarea | URL | ¿Tiempo estimado? |
|---|-------|-----|-------------------|
| 1 | Crear cuenta en **GitHub** | [github.com/signup](https://github.com/signup) | 2 min |
| 2 | Crear cuenta en **Expo** | [expo.dev/signup](https://expo.dev/signup) | 2 min |
| 3 | Instalar **Expo Go** en el móvil | App Store / Google Play → busca "Expo Go" | 1 min |

> Si ya tienes cuenta en GitHub o Expo, sáltate ese paso.

---

## Instalación del entorno (Windows)

Descarga el script de instalación y ejecútalo en PowerShell **como Administrador**:

```powershell
# 1. Clona este repo (o descarga el ZIP desde GitHub)
git clone https://github.com/karrocon/taller-react-native-fp.git
cd taller-react-native-fp\react-native\dia-01

# 2. Permite ejecutar scripts en esta sesión
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# 3. Ejecuta el instalador
.\instalar-entorno.ps1
```

El script instala automáticamente:
- Node.js LTS 20
- Visual Studio Code
- Git for Windows
- Extensiones VS Code recomendadas

---

## Estructura del repo

```
react-native/
  slides-curso.tex              ← Presentación global del curso (8 días)
  slides-curso.pdf              ← PDF compilado
  dia-01/
    slides-dia01.tex            ← Presentación del día 1
    slides-dia01.pdf            ← PDF compilado
    ejercicios/                 ← Proyecto Expo base (4 ejercicios)
      ej01-basico/App.js        ← Tarjeta de presentación
      ej02-estilos/App.js       ← Tarjeta con estilos
      ej03-imagen/App.js        ← Tarjeta con imagen circular
      ej-bonus-contador/App.js  ← Contador con useState
    instalar-entorno.ps1        ← Instala Node, VS Code, Git, Git, Expo
    run-ejercicio.ps1           ← Lanza un ejercicio concreto
    setup-android.ps1           ← Instala Android Studio + ADB
  dia-02/
    ejercicios/
      ej01-contador/            ← useState + botones
      ej02-formulario/          ← TextInput + validación
      ej03-lista-tareas/        ← Array state + map()
  dia-03/
    ejercicios/
      ej01-navegacion/          ← React Navigation Stack + route.params
  dia-04/
    ejercicios/
      ej01-fetch-usuarios/      ← fetch + useEffect + ActivityIndicator
      ej02-pokeapi/             ← PokéAPI + FlatList + Modal
  dia-05-06/
    ejercicios/
      pokedex/                  ← Pokédex completa multi-pantalla
        App.js                  ← Navegador raíz
        api/pokeapi.js          ← Funciones fetch centralizadas
        screens/HomeScreen.js   ← FlatList 2 columnas
        screens/DetalleScreen.js← Stats, tipos, sprites
        components/PokemonCard.js← Tarjeta reutilizable
  dia-07/
    ejercicios/
      ej01-busqueda-filtro/     ← useMemo + TextInput + filtros por tipo
  dia-08/
    ejercicios/
      ej01-publicar/README.md   ← Guía EAS Build, app.json, Google Play
```

> Cada carpeta de ejercicio incluye `App.js` (enunciado con TODOs) y `Solucion.js` (código completo).

---

## Ejecutar ejercicios

```powershell
cd react-native\dia-01

# Ejercicio 1 — en el navegador (no hace falta móvil)
.\run-ejercicio.ps1 -Ejercicio ej01 -Target web

# Ejercicio 1 — escanear QR con Expo Go
.\run-ejercicio.ps1 -Ejercicio ej01

# Ejercicio 1 — emulador Android o móvil por USB
.\run-ejercicio.ps1 -Ejercicio ej01 -Target android

# Bonus (useState / contador)
.\run-ejercicio.ps1 -Ejercicio bonus -Target web
```

**Primera vez:** el script instala las dependencias automáticamente (~30s).

---

## Configurar Android (emulador / USB)

```powershell
# Requiere PowerShell como Administrador
.\setup-android.ps1
```

Instala Android Studio y configura ADB. Tras la instalación sigue las instrucciones impresas para crear un AVD (emulador virtual) o conectar un móvil por USB.

**iOS en Windows:** no es posible el simulador. Usa Expo Go en iPhone + QR por WiFi.

---

## Tecnología

| Herramienta | Versión |
|-------------|---------|
| Expo SDK | ~52.0.0 |
| React Native | 0.76.5 |
| React | 18.3.1 |
| Node.js mínimo | 18 LTS |

---

## Ejercicios por día

| Día | Ejercicio | Conceptos clave |
|-----|-----------|-----------------|
| 1 | `ej01-basico` — Tarjeta de presentación | JSX, componentes, View, Text |
| 1 | `ej02-estilos` — Tarjeta con estilos | StyleSheet, flexbox, colores |
| 1 | `ej03-imagen` — Perfil con imagen circular | Image, borderRadius |
| 1 | `ej-bonus-contador` — Contador | `useState`, TouchableOpacity |
| 2 | `ej01-contador` — Contador +/- | `useState`, múltiples handlers |
| 2 | `ej02-formulario` — Registro | `TextInput`, formularios controlados, validación |
| 2 | `ej03-lista-tareas` — To-Do list | Arrays en estado, `map()`, `filter()` |
| 3 | `ej01-navegacion` — Stack Navigator | React Navigation, `route.params`, múltiples pantallas |
| 4 | `ej01-fetch-usuarios` — Lista de usuarios | `fetch`, `useEffect`, `ActivityIndicator`, errores |
| 4 | `ej02-pokeapi` — Pokémon con PokéAPI | FlatList, Image, Modal, grids |
| 5-6 | `pokedex` — Pokédex completa | Navegación + API + componentes reutilizables |
| 7 | `ej01-busqueda-filtro` — Buscador | `useMemo`, `TextInput`, filtros combinados |
| 8 | Publicación | `eas build`, `app.json`, Google Play |

---

## Recursos y referencias

### React Native y Expo

| Recurso | Descripción |
|---------|-------------|
| [React Native Docs](https://reactnative.dev/docs/getting-started) | Documentación oficial de React Native |
| [Expo Docs](https://docs.expo.dev) | Guías, APIs y referencia completa de Expo |
| [Expo SDK API](https://docs.expo.dev/versions/latest/) | Listado de todos los módulos de Expo SDK |
| [EAS Build](https://docs.expo.dev/build/introduction/) | Compilar APK/IPA en la nube |
| [EAS Update](https://docs.expo.dev/eas-update/introduction/) | Publicar actualizaciones OTA |
| [Expo Snack](https://snack.expo.dev) | Playground online para probar código sin instalar nada |

### React y JavaScript

| Recurso | Descripción |
|---------|-------------|
| [React Docs](https://react.dev) | Documentación oficial de React |
| [Hooks API](https://react.dev/reference/react) | `useState`, `useEffect`, `useMemo`, `useCallback` |
| [JavaScript MDN](https://developer.mozilla.org/es/docs/Web/JavaScript) | Referencia completa de JS (en español) |
| [ES6+ Cheatsheet](https://devhints.io/es6) | Destructuring, arrow functions, spread, modules |
| [Fetch API — MDN](https://developer.mozilla.org/es/docs/Web/API/Fetch_API) | `fetch`, promesas, `async/await` |

### Navegación

| Recurso | Descripción |
|---------|-------------|
| [React Navigation](https://reactnavigation.org/docs/getting-started) | Librería de navegación estándar para React Native |
| [Stack Navigator](https://reactnavigation.org/docs/native-stack-navigator) | Navegación con historial (push/pop) |
| [Bottom Tabs](https://reactnavigation.org/docs/bottom-tab-navigator) | Barra de tabs inferior |

### Diseño y maquetación

| Recurso | Descripción |
|---------|-------------|
| [Flexbox Playground](https://flexbox.malven.co) | Visualizador interactivo de Flexbox |
| [React Native Flexbox](https://reactnative.dev/docs/flexbox) | Diferencias con CSS Flexbox |
| [React Native Paper](https://reactnativepaper.com) | Componentes Material Design listos para usar |
| [NativeWind](https://www.nativewind.dev) | Tailwind CSS para React Native |

### APIs externas usadas en el curso

| Recurso | Descripción |
|---------|-------------|
| [PokéAPI](https://pokeapi.co/) | API REST gratuita de Pokémon (usada en días 4-7) |
| [JSONPlaceholder](https://jsonplaceholder.typicode.com) | API fake para pruebas (usada en día 4) |
| [Random User API](https://randomuser.me) | Genera datos de usuarios ficticios |
| [Open Trivia DB](https://opentdb.com/api_config.php) | Preguntas de trivial (ideal para proyectos propios) |

### Herramientas de desarrollo

| Recurso | Descripción |
|---------|-------------|
| [Node.js Downloads](https://nodejs.org/es/download/) | Descarga Node.js LTS |
| [VS Code](https://code.visualstudio.com) | Editor recomendado |
| [Android Studio](https://developer.android.com/studio) | Necesario para emulador Android |
| [Overleaf](https://www.overleaf.com) | Compilador LaTeX online (para las diapositivas) |

### Inspiración y proyectos

| Recurso | Descripción |
|---------|-------------|
| [Awesome React Native](https://github.com/jondot/awesome-react-native) | Lista curada de librerías y recursos |
| [React Native Directory](https://reactnative.directory) | Buscador de librerías compatibles con Expo |
| [Expo Examples](https://github.com/expo/examples) | Proyectos de ejemplo oficiales de Expo |

---

## Dudas y contacto

Abre un [Issue](../../issues) en este repositorio o pregunta en clase.
