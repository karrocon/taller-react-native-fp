# Día 8 — Publicación de la app con Expo / EAS Build

## ¿Qué aprenderemos?

- Personalizar el icono y la pantalla de carga (splash screen)
- Publicar la app en **Expo Go** (link QR compartible)
- Generar un APK/AAB para Android con **EAS Build**
- Publicar en la **App Store / Google Play** (overview)

---

## Paso 1 — Personalizar `app.json`

```json
{
  "expo": {
    "name": "Mi Pokédex",
    "slug": "mi-pokedex",
    "version": "1.0.0",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#cc0000"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#cc0000"
      },
      "package": "com.tuNombre.mipokedex"
    },
    "ios": {
      "bundleIdentifier": "com.tuNombre.mipokedex"
    }
  }
}
```

> **Tamaños recomendados de assets:**
> - `icon.png`: 1024×1024 px
> - `splash.png`: 1284×2778 px (portrait)
> - `adaptive-icon.png`: 1024×1024 px (solo el foreground, sin fondo)

---

## Paso 2 — Publicar con Expo Go (desarrollo / demos)

```bash
# Asegúrate de estar autenticado
npx expo login

# Publica en la nube de Expo (genera enlace QR)
npx expo publish
```

Comparte el enlace `exp.host/@tu-usuario/mi-pokedex` con quienes quieras que prueben la app. Solo necesitan **Expo Go** instalado.

> ⚠️ `expo publish` requiere Expo SDK clásico. Para SDK 50+ se recomienda EAS Update.

---

## Paso 3 — EAS Build (APK/AAB para distribución)

### 3.1 Instalar EAS CLI

```bash
npm install -g eas-cli
eas login
```

### 3.2 Configurar el proyecto

```bash
eas build:configure
```

Esto crea el fichero `eas.json`:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "production": {}
  }
}
```

### 3.3 Construir una APK de prueba (preview)

```bash
eas build --platform android --profile preview
```

- El build se ejecuta en los servidores de Expo (gratis con límite mensual).
- Al terminar recibirás un **enlace de descarga** de la APK.
- Comparte ese enlace con tus alumnos/testers → instalar directamente en Android.

### 3.4 Build de producción (AAB para Play Store)

```bash
eas build --platform android --profile production
```

---

## Paso 4 — EAS Update (OTA, actualizaciones sin build)

```bash
npx expo install expo-updates
eas update --branch production --message "Versión 1.1 con filtros"
```

Los usuarios que tengan la app instalada la actualizarán automáticamente en la siguiente apertura.

---

## Paso 5 — Google Play Store (resumen)

| Paso | Qué hacer |
|------|-----------|
| 1 | Crear cuenta de desarrollador en [play.google.com/console](https://play.google.com/console) ($25 única vez) |
| 2 | Crear nueva aplicación |
| 3 | Completar ficha: descripción, capturas, política de privacidad |
| 4 | Subir el AAB generado por `eas build --profile production` |
| 5 | Enviar a revisión (suele tardar 1-3 días) |

---

## Ejercicio práctico

1. Modifica `app.json` con el nombre y el `slug` de tu app.
2. Cambia el `backgroundColor` del splash a tu color favorito.
3. Ejecuta `eas build:configure` y revisa el fichero `eas.json` generado.
4. Opcional: ejecuta `eas build --platform android --profile preview` y descarga la APK.
5. ¡Comparte el enlace con un compañero y que instalen la app!

---

## Recursos

- [Expo Application Services (EAS)](https://docs.expo.dev/eas/)
- [EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [EAS Update](https://docs.expo.dev/eas-update/introduction/)
- [Google Play Console](https://play.google.com/console)
- [Expo app.json reference](https://docs.expo.dev/versions/latest/config/app/)
