# Guía de build con EAS

## Requisitos previos

```bash
# Instala EAS CLI
npm install -g eas-cli

# Inicia sesión en Expo
eas login

# Configura tu proyecto (genera eas.json)
eas build:configure
```

## Perfiles de build

| Perfil | Uso | Salida |
|--------|-----|--------|
| `development` | Dev client + debug | `.apk` interno |
| `preview` | Pruebas QA | `.apk` interno |
| `production` | Tienda | `.aab` (Play Store) |

## Comandos

```bash
# Build APK para pruebas (Android)
eas build --platform android --profile preview

# Build para producción (App Bundle)
eas build --platform android --profile production

# Build iOS (requiere cuenta Apple Developer)
eas build --platform ios --profile production

# Ver el estado de un build
eas build:list

# Enviar a tienda (tras build exitoso)
eas submit --platform android
```

## TODO del ejercicio

1. Crea una cuenta en [expo.dev](https://expo.dev)
2. Ejecuta `eas login` y `eas build:configure`
3. Edita `eas.json` para añadir un perfil `apk` con `buildType: "apk"`
4. Lanza `eas build --platform android --profile preview`
5. Descarga e instala el `.apk` en tu dispositivo Android

## Notas

- **app.json** debe tener `expo.android.package` configurado
- Los builds de `development` requieren `expo-dev-client` instalado
- Los certificados de firma se gestionan automáticamente por EAS
