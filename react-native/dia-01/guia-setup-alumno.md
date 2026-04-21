# 📱 Guía de Setup — Día 1

### React Native con Expo — Para el alumno

---

## Antes de empezar: ¿qué necesitas?

- Un ordenador con Windows, Mac o Linux
- Conexión a internet
- (Opcional) Un móvil Android o iOS

Si tienes el móvil, la experiencia es mucho mejor. Si no, puedes usar el navegador.

---

## Paso 1 — Instalar Node.js

Node.js es el motor que ejecuta JavaScript fuera del navegador. Es imprescindible.

1. Ve a **<https://nodejs.org/es/>**
2. Descarga la versión **LTS** (la recomendada, no la "Current")
3. Instálala con las opciones por defecto
4. Verifica que funciona abriendo la terminal:

```bash
node --version
```

Debe mostrar algo como `v20.x.x` o `v18.x.x`.

> **¿Cómo abrir la terminal?**
>
> - Windows: busca "PowerShell" o "Símbolo del sistema" en el menú inicio
> - Mac: busca "Terminal" en aplicaciones
> - Linux: ya la conoces 😄

---

## Paso 2 — Instalar VS Code (editor de código)

1. Ve a **<https://code.visualstudio.com/>**
2. Descarga e instala la versión para tu sistema operativo
3. Es gratuito

> Si ya tienes otro editor (WebStorm, Sublime, etc.), puedes usarlo. VS Code es el recomendado para este curso.

---

## Paso 3 — Instalar Expo Go en tu móvil (opcional pero recomendado)

- **Android:** busca "Expo Go" en Google Play Store, o ve directamente a <https://play.google.com/store/apps/details?id=host.exp.exponent>
- **iOS:** busca "Expo Go" en la App Store, o ve a <https://apps.apple.com/es/app/expo-go/id982107779>

> Esta app te permite ver tu app corriendo en tu propio móvil en tiempo real.

---

## Paso 4 — Crear tu primer proyecto

Abre la terminal y ejecuta estos comandos **uno a uno**:

```bash
# 1. Crear el proyecto (esto puede tardar 1-2 minutos)
npx create-expo-app miApp

# 2. Entrar en la carpeta del proyecto
cd miApp

# 3. Arrancar el servidor de desarrollo
npm start
```

Verás algo así en la terminal:

```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press w │ open web
› Press r │ reload app
```

---

## Paso 5 — Abrir la app

### Opción A: En tu móvil (recomendada)

1. Abre la app **Expo Go** en tu móvil
2. Escanea el código QR que aparece en la terminal
3. **Importante:** el móvil y el ordenador deben estar en la **misma red WiFi**

### Opción B: En el navegador (alternativa si no tienes móvil o hay problemas con la WiFi)

Con el servidor corriendo, presiona la tecla **`w`** en la terminal.
Se abrirá tu app en el navegador web.

---

## Paso 6 — Abrir el proyecto en VS Code

1. Abre VS Code
2. Menú `File` → `Open Folder...`
3. Selecciona la carpeta `miApp` que creaste
4. En el explorador de archivos (panel izquierdo) verás todos los archivos
5. **Abre `App.js`** — este es el archivo principal

---

## Paso 7 — Tu primer cambio

En `App.js` busca esta línea:

```jsx
<Text>Open up App.js to start working on your app!</Text>
```

Cámbiala por:

```jsx
<Text>¡Hola mundo! Soy yo 😄</Text>
```

Guarda el archivo (`Ctrl+S` en Windows, `Cmd+S` en Mac).

**La app se actualiza automáticamente** — esto se llama *hot reload*.

---

## ✅ Checklist: ¿Todo listo?

Antes de empezar los ejercicios, verifica que:

- [ ] `node --version` muestra una versión 18 o superior
- [ ] Puedes crear un proyecto con `npx create-expo-app`
- [ ] El servidor arranca con `npm start`
- [ ] La app se ve en el móvil **o** en el navegador
- [ ] Guardas un cambio en `App.js` y se ve reflejado en la app

Si tienes todo marcado → **estás listo para el Día 1** ✅

---

## 🆘 Problemas comunes

### "npx: command not found"

Node no está instalado correctamente. Vuelve al Paso 1.

### El QR no funciona / no conecta en el móvil

Prueba con la opción web: presiona `w` en la terminal donde está corriendo `npm start`.

### "Error: ENOSPC: no space left on device"

El disco está lleno. Libera espacio (al menos 500 MB libres).

### La terminal dice "WARN" con mensajes en rojo

Los `WARN` (advertencias) son normales y no impiden que la app funcione. Solo los `ERROR` son problemas reales.

### Nada funciona — resetear de cero

```bash
# Desde dentro de la carpeta del proyecto:
rm -rf node_modules    # (Mac/Linux)
# o en Windows PowerShell:
Remove-Item -Recurse -Force node_modules

npm install
npx expo start --clear
```

---

## 📁 Estructura del proyecto que usaremos durante el curso

Al final del curso, la estructura del proyecto será:

```
mi-pokedex/
├── App.js               ← punto de entrada
├── package.json         ← dependencias
├── app.json             ← configuración Expo
├── assets/              ← imágenes y fuentes
├── components/          ← componentes reutilizables
│   └── PokemonCard.js
├── screens/             ← pantallas de la app
│   ├── HomeScreen.js
│   └── DetailScreen.js
└── services/            ← llamadas a API
    └── pokemon.js
```

Por ahora solo tocamos `App.js`. Las carpetas las iremos creando durante el curso.

---

*Documento para alumnos — Taller React Native FP*
