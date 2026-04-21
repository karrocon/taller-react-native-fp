#Requires -Version 5.1
<#
.SYNOPSIS
    Instala Android Studio y configura el entorno Android para React Native / Expo.

.DESCRIPTION
    Instala:
      - Android Studio (incluye SDK, ADB, AVD Manager, emulador)
      - Configura ANDROID_HOME y añade platform-tools al PATH del sistema

    Requisitos previos:
      - Windows 10/11 de 64 bits
      - Java 17+ ya instalado (se verificará)
      - Conexión a internet (~1 GB de descarga)
      - PowerShell ejecutado como Administrador

.NOTES
    Tras la instalación hay pasos MANUALES en Android Studio (AVD, SDK, aceptar licencias).
    Sigue las instrucciones que imprime este script al final.

.EXAMPLE
    # Ejecutar como Administrador:
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    .\setup-android.ps1
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# ─── Colores ────────────────────────────────────────────────────────────────
function Write-Step   { param($msg) Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Write-OK     { param($msg) Write-Host "  [OK] $msg" -ForegroundColor Green }
function Write-Warn   { param($msg) Write-Host "  [!]  $msg" -ForegroundColor Yellow }
function Write-Fail   { param($msg) Write-Host "  [X]  $msg" -ForegroundColor Red }
function Write-Info   { param($msg) Write-Host "       $msg" -ForegroundColor Gray }

# ─── 0. Verificar que se ejecuta como Administrador ─────────────────────────
Write-Step "Verificando permisos..."
$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Fail "Este script necesita ejecutarse como ADMINISTRADOR."
    Write-Info "Haz clic derecho en PowerShell y selecciona 'Ejecutar como administrador'."
    exit 1
}
Write-OK "Ejecutando como administrador."

# ─── 1. Verificar winget ────────────────────────────────────────────────────
Write-Step "Verificando winget..."
if (-not (Get-Command 'winget' -ErrorAction SilentlyContinue)) {
    Write-Fail "winget no encontrado. Instala 'App Installer' desde Microsoft Store."
    exit 1
}
Write-OK "winget disponible."

# ─── 2. Verificar Java ──────────────────────────────────────────────────────
Write-Step "Verificando Java..."
if (Get-Command 'java' -ErrorAction SilentlyContinue) {
    $javaVer = java -version 2>&1 | Select-String 'version' | Select-Object -First 1
    Write-OK "Java encontrado: $javaVer"
} else {
    Write-Warn "Java no detectado. Instalando Microsoft JDK 17..."
    winget install --id Microsoft.OpenJDK.17 --accept-source-agreements --accept-package-agreements --silent
    $env:PATH = [System.Environment]::GetEnvironmentVariable('PATH', 'Machine') + ';' +
                [System.Environment]::GetEnvironmentVariable('PATH', 'User')
    Write-OK "Microsoft JDK 17 instalado."
}

# ─── 3. Instalar Android Studio ─────────────────────────────────────────────
Write-Step "Instalando Android Studio..."
Write-Info "Descarga: ~1 GB. Esto tardará varios minutos..."

$result = winget list --id Google.AndroidStudio 2>&1
if ($result -match 'Google.AndroidStudio') {
    Write-OK "Android Studio ya instalado."
} else {
    winget install --id Google.AndroidStudio `
        --accept-source-agreements --accept-package-agreements --silent
    if ($LASTEXITCODE -ne 0 -and $LASTEXITCODE -ne -1978335189) {
        Write-Warn "winget devolvió código $LASTEXITCODE. Puede que ya estuviera instalado."
    } else {
        Write-OK "Android Studio instalado."
    }
}

# Refrescar PATH
$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH', 'Machine') + ';' +
             [System.Environment]::GetEnvironmentVariable('PATH', 'User')

# ─── 4. Configurar ANDROID_HOME ─────────────────────────────────────────────
Write-Step "Configurando ANDROID_HOME..."

$sdkPath = "$env:LOCALAPPDATA\Android\Sdk"

# Esperar hasta 60s a que el SDK se cree (el instalador puede tardarse)
$waited = 0
while (-not (Test-Path $sdkPath) -and $waited -lt 60) {
    Start-Sleep -Seconds 2
    $waited += 2
}

if (Test-Path $sdkPath) {
    [System.Environment]::SetEnvironmentVariable('ANDROID_HOME', $sdkPath, 'User')
    [System.Environment]::SetEnvironmentVariable('ANDROID_SDK_ROOT', $sdkPath, 'User')
    $env:ANDROID_HOME     = $sdkPath
    $env:ANDROID_SDK_ROOT = $sdkPath
    Write-OK "ANDROID_HOME = $sdkPath"
} else {
    Write-Warn "SDK no encontrado en $sdkPath"
    Write-Info "Android Studio lo creará la primera vez que se abra."
    Write-Info "Después de abrir Android Studio, ejecuta este script de nuevo"
    Write-Info "o añade ANDROID_HOME manualmente en Variables de entorno del sistema."
    $sdkPath = $null
}

# ─── 5. Añadir ADB y emulador al PATH ───────────────────────────────────────
Write-Step "Configurando PATH de Android..."

if ($sdkPath) {
    $platformTools = "$sdkPath\platform-tools"
    $emulatorDir   = "$sdkPath\emulator"
    $cmdlineTools  = "$sdkPath\cmdline-tools\latest\bin"

    $userPath = [System.Environment]::GetEnvironmentVariable('PATH', 'User')

    $toAdd = @($platformTools, $emulatorDir, $cmdlineTools) | Where-Object {
        Test-Path $_ -and $userPath -notlike "*$_*"
    }

    if ($toAdd.Count -gt 0) {
        $newPath = ($toAdd -join ';') + ';' + $userPath
        [System.Environment]::SetEnvironmentVariable('PATH', $newPath, 'User')
        $env:PATH = $newPath + ';' + $env:PATH
        Write-OK "Añadido al PATH: $($toAdd -join ', ')"
    } else {
        Write-OK "PATH ya configurado o SDK sin descargar aún."
    }
}

# ─── 6. Verificar ADB ───────────────────────────────────────────────────────
Write-Step "Verificando ADB..."
if (Get-Command 'adb' -ErrorAction SilentlyContinue) {
    Write-OK "ADB encontrado: $(adb --version | Select-Object -First 1)"
    Write-Host ""
    Write-Host "  Dispositivos ADB conectados:" -ForegroundColor Cyan
    adb devices
} else {
    Write-Warn "ADB no encontrado en PATH todavía."
    Write-Info "Razones posibles:"
    Write-Info "  - Android Studio aún no descargó el SDK (hay que abrirlo primero)"
    Write-Info "  - Reinicia el terminal para que el PATH se actualice"
}

# ─── 7. Instrucciones post-instalación ──────────────────────────────────────
$sep = "=" * 65
Write-Host "`n$sep" -ForegroundColor Cyan
Write-Host "  PASOS MANUALES NECESARIOS" -ForegroundColor Cyan
Write-Host $sep -ForegroundColor Cyan

Write-Host @"

 1. ABRIR ANDROID STUDIO por primera vez
    - Acepta la licencia y deja que descargue el SDK (~2 GB más)
    - Completa el wizard de configuración inicial

 2. INSTALAR SDK COMPONENTS (dentro de Android Studio)
    Tools > SDK Manager > SDK Platforms:
      [ ] Android 14 (API 34)  ← marcar
    SDK Tools:
      [ ] Android SDK Build-Tools  ← marcar
      [ ] Android Emulator         ← marcar
      [ ] Android SDK Platform-Tools ← marcar
    → Aplicar / OK

 3. CREAR UN AVD (emulador virtual)
    Tools > Device Manager > Create Virtual Device
      - Categoría: Phone
      - Dispositivo: Pixel 7 (recomendado)
      - Sistema: Android 14.0 (API 34) x86_64
      - Nombre: Pixel_7_API_34
    → Finish → ▶ Play para arrancar el emulador

 4. MÓVIL FÍSICO ANDROID por USB
    - En el móvil: Ajustes > Sobre el teléfono > toca "Número de compilación" 7 veces
    - Ajustes > Opciones de desarrollador > Depuración USB: ON
    - Conecta por USB y acepta el diálogo en el móvil
    - Verifica: adb devices  (debe aparecer tu dispositivo)

 5. iOS SIMULATOR
    ❌ NO disponible en Windows.
    ✅ Alternativa: Expo Go en iPhone + QR por WiFi.

 6. EJECUTAR UN EJERCICIO
    Desde esta carpeta:
      .\run-ejercicio.ps1 -Ejercicio ej01              # servidor interactivo
      .\run-ejercicio.ps1 -Ejercicio ej01 -Target android  # emulador/USB directo
      .\run-ejercicio.ps1 -Ejercicio ej01 -Target web      # navegador

"@ -ForegroundColor White

Write-Host $sep -ForegroundColor Cyan
Write-Host "  Reinicia el terminal para que los cambios de PATH surtan efecto." -ForegroundColor Yellow
Write-Host $sep -ForegroundColor Cyan
Write-Host ""
