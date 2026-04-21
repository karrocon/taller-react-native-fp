#Requires -Version 5.1
<#
.SYNOPSIS
    Instala todo el entorno de desarrollo React Native (Expo) para el Taller FP.

.DESCRIPTION
    Guía completa de instalación:
      PASO 0 — Cuentas necesarias (GitHub, Expo, Expo Go en móvil)
      PASO 1 — Node.js LTS 20+
      PASO 2 — Visual Studio Code
      PASO 3 — Git for Windows
      PASO 4 — Clonar el repositorio del taller
      PASO 5 — Extensiones VS Code recomendadas
      PASO 6 — Verificación final

    Instala via winget cuando sea posible.
    NO instala LaTeX ni Android Studio (ver setup-android.ps1).

.NOTES
    Ejecutar como Administrador en PowerShell 5.1+:
      Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
      .\instalar-entorno.ps1

    Repo del taller: https://github.com/karrocon/taller-react-native-fp
#>

# ─── Constantes ─────────────────────────────────────────────────────────────
$REPO_URL  = 'https://github.com/karrocon/taller-react-native-fp.git'
$REPO_HTTPS = 'https://github.com/karrocon/taller-react-native-fp'

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# ─── Colores ────────────────────────────────────────────────────────────────
function Write-Step  { param($msg) Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Write-OK    { param($msg) Write-Host "  [OK] $msg" -ForegroundColor Green }
function Write-Warn  { param($msg) Write-Host "  [AVISO] $msg" -ForegroundColor Yellow }
function Write-Fail  { param($msg) Write-Host "  [ERROR] $msg" -ForegroundColor Red }
function Write-Info  { param($msg) Write-Host "       $msg" -ForegroundColor Gray }
function Write-Link  { param($label, $url) Write-Host "  --> $label" -ForegroundColor White -NoNewline; Write-Host "  $url" -ForegroundColor DarkCyan }

# ─── Helpers ────────────────────────────────────────────────────────────────
function Test-Command {
    param([string]$Name)
    $null -ne (Get-Command $Name -ErrorAction SilentlyContinue)
}

function Install-WingetPackage {
    param(
        [string]$Id,
        [string]$DisplayName,
        [string[]]$ExtraArgs = @()
    )
    Write-Step "Instalando $DisplayName..."
    try {
        $result = winget install --id $Id --accept-source-agreements --accept-package-agreements --silent @ExtraArgs 2>&1
        if ($LASTEXITCODE -eq 0 -or $LASTEXITCODE -eq -1978335189) {
            # -1978335189 = ya instalado
            Write-OK "$DisplayName instalado."
        } else {
            Write-Warn "winget devolvio codigo $LASTEXITCODE para $DisplayName. Puede que ya este instalado."
        }
    } catch {
        Write-Warn "No se pudo instalar $DisplayName via winget: $_"
    }
}

# ─── PASO 0 — Cuentas y apps previas ────────────────────────────────────────
$sep = "=" * 65
Write-Host "`n$sep" -ForegroundColor Magenta
Write-Host "  PASO 0 — Cuentas necesarias (ANTES de empezar)" -ForegroundColor Magenta
Write-Host $sep -ForegroundColor Magenta
Write-Host @"

  Antes de instalar nada necesitas estas cuentas GRATUITAS:

  1. GitHub  (control de versiones, repo del taller)
"@ -ForegroundColor White
Write-Link "  Crear cuenta GitHub" "https://github.com/signup"
Write-Host @"

  2. Expo    (plataforma React Native, logs en la nube)
"@ -ForegroundColor White
Write-Link "  Crear cuenta Expo  " "https://expo.dev/signup"
Write-Host @"

  3. Expo Go en el movil (para ver la app en tiempo real)
"@ -ForegroundColor White
Write-Link "  iOS  (App Store)   " "https://apps.apple.com/app/expo-go/id982107779"
Write-Link "  Android (Play)     " "https://play.google.com/store/apps/details?id=host.exp.exponent"
Write-Host @"

  Si ya tienes estas cuentas e instalaciones, puedes continuar.
  Pulsa Enter para seguir o Ctrl+C para salir y crearlas primero.
"@ -ForegroundColor Yellow
Read-Host "  [Enter para continuar]" | Out-Null

# ─── 0b. Verificar winget ────────────────────────────────────────────────────
Write-Step "Verificando winget..."
if (-not (Test-Command 'winget')) {
    Write-Fail "winget no encontrado. Instala 'App Installer' desde Microsoft Store."
    Write-Link "  Microsoft Store" "https://www.microsoft.com/store/productId/9NBLGGH4NNS1"
    exit 1
}
Write-OK "winget disponible."

# ─── 1. Node.js LTS ─────────────────────────────────────────────────────────
Write-Step "Comprobando Node.js..."
if (Test-Command 'node') {
    $nodeVer = (node --version).TrimStart('v')
    $major = [int]($nodeVer -split '\.')[0]
    if ($major -ge 18) {
        Write-OK "Node.js $nodeVer ya instalado (>= 18). Nada que hacer."
    } else {
        Write-Warn "Node.js $nodeVer es demasiado antiguo (necesitas >= 18). Actualizando..."
        Install-WingetPackage 'OpenJS.NodeJS.LTS' 'Node.js LTS'
    }
} else {
    Install-WingetPackage 'OpenJS.NodeJS.LTS' 'Node.js LTS'
}

# Refrescar PATH para que 'node' y 'npm' sean visibles sin reiniciar terminal
$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH', 'Machine') + ';' +
             [System.Environment]::GetEnvironmentVariable('PATH', 'User')

# ─── 2. Git ─────────────────────────────────────────────────────────────────
Write-Step "Comprobando Git..."
if (Test-Command 'git') {
    Write-OK "Git ya instalado: $(git --version)"
} else {
    Install-WingetPackage 'Git.Git' 'Git for Windows' @('--override', '/VERYSILENT /NORESTART')
    $env:PATH += ';C:\Program Files\Git\cmd'
}

# ─── 3. Visual Studio Code ───────────────────────────────────────────────────
Write-Step "Comprobando VS Code..."
if (Test-Command 'code') {
    Write-OK "VS Code ya instalado: $(code --version | Select-Object -First 1)"
} else {
    Install-WingetPackage 'Microsoft.VisualStudioCode' 'Visual Studio Code'
    $env:PATH += ';C:\Users\' + $env:USERNAME + '\AppData\Local\Programs\Microsoft VS Code\bin'
}

# ─── 4. Clonar el repositorio del taller ────────────────────────────────────
Write-Step "Clonando repositorio del taller..."
Write-Info "URL: $REPO_URL"

# Detectar directorio de destino: carpeta del usuario o la que elija
$defaultCloneDir = Join-Path $env:USERPROFILE 'taller-react-native-fp'

if (Test-Path $defaultCloneDir) {
    Write-OK "El repo ya existe en: $defaultCloneDir"
    Write-Info "Si quieres actualizarlo: cd $defaultCloneDir && git pull"
} elseif (Test-Command 'git') {
    try {
        Write-Host "  Clonando en: $defaultCloneDir" -ForegroundColor Gray
        git clone $REPO_URL $defaultCloneDir 2>&1 | Out-Null
        if (Test-Path $defaultCloneDir) {
            Write-OK "Repo clonado en: $defaultCloneDir"
        } else {
            Write-Warn "No se pudo clonar el repo. Hazlo manualmente:"
            Write-Info "  git clone $REPO_URL"
        }
    } catch {
        Write-Warn "Error al clonar: $_"
        Write-Info "Hazlo manualmente: git clone $REPO_URL"
    }
} else {
    Write-Warn "Git no esta en PATH. Reinicia el terminal y ejecuta:"
    Write-Info "  git clone $REPO_URL"
}

# ─── 5. Extensiones VS Code ────────────────────────────────────────────────
Write-Step "Instalando extensiones VS Code recomendadas..."
$extensions = @(
    'ms-vscode.vscode-react-native',   # React Native Tools
    'dbaeumer.vscode-eslint',           # ESLint
    'esbenp.prettier-vscode',           # Prettier
    'dsznajder.es7-react-js-snippets',  # Snippets React/RN
    'pkief.material-icon-theme'         # Iconos bonitos
)

if (Test-Command 'code') {
    foreach ($ext in $extensions) {
        Write-Host "  Instalando extension: $ext" -ForegroundColor Gray
        code --install-extension $ext --force 2>&1 | Out-Null
    }
    Write-OK "Extensiones instaladas."
} else {
    Write-Warn "VS Code no encontrado en PATH, omitiendo extensiones. Instalalas manualmente."
}

# ─── 6. Verificar npx / Expo ────────────────────────────────────────────────
Write-Step "Verificando que npx expo funciona..."
if (Test-Command 'npx') {
    Write-OK "npx disponible. Expo no necesita instalacion global (SDK 46+)."
} else {
    Write-Warn "npx no encontrado. Reinicia el terminal para que Node este en PATH."
}

# ─── 7. Login en Expo (opcional pero recomendado) ───────────────────────────
Write-Step "Login en Expo..."
Write-Info "Se necesita una cuenta Expo (gratis) para publicar y ver logs en la nube."
Write-Link "  Crear cuenta Expo" "https://expo.dev/signup"
Write-Host ""
if (Test-Command 'npx') {
    $loginChoice = Read-Host "  ¿Hacer login en Expo ahora? (s/N)"
    if ($loginChoice -match '^[sS]') {
        npx expo login
    } else {
        Write-Info "Puedes hacer login despues: npx expo login"
    }
}

# ─── 8. Resumen final ───────────────────────────────────────────────────────
$sep = "=" * 65
Write-Host "`n$sep" -ForegroundColor Cyan
Write-Host "  RESUMEN DE INSTALACION" -ForegroundColor Cyan
Write-Host $sep -ForegroundColor Cyan

$checks = @(
    @{ Name = 'node';   Label = 'Node.js';   Cmd = { node --version } },
    @{ Name = 'npm';    Label = 'npm';        Cmd = { npm --version } },
    @{ Name = 'npx';    Label = 'npx';        Cmd = { npx --version } },
    @{ Name = 'git';    Label = 'Git';        Cmd = { git --version } },
    @{ Name = 'code';   Label = 'VS Code';    Cmd = { code --version | Select-Object -First 1 } }
)

foreach ($check in $checks) {
    if (Test-Command $check.Name) {
        $ver = & $check.Cmd 2>&1
        Write-OK "$($check.Label): $ver"
    } else {
        Write-Fail "$($check.Label): NO encontrado — reinicia el terminal e intentalo de nuevo"
    }
}

# Verificar repo clonado
if (Test-Path (Join-Path $env:USERPROFILE 'taller-react-native-fp')) {
    Write-OK "Repo del taller: $env:USERPROFILE\taller-react-native-fp"
} else {
    Write-Warn "Repo NO clonado todavia. Ejecuta: git clone $REPO_URL"
}

Write-Host "`n$sep" -ForegroundColor Cyan
Write-Host "  PROXIMOS PASOS" -ForegroundColor Cyan
Write-Host $sep -ForegroundColor Cyan
Write-Host @"

  CUENTAS (si no las tienes aun):
"@ -ForegroundColor White
Write-Link "  GitHub" "https://github.com/signup"
Write-Link "  Expo  " "https://expo.dev/signup"
Write-Host @"

  MOVIL:
    Instala Expo Go desde App Store o Google Play.
    Abre Expo Go, inicia sesion con tu cuenta Expo
    y escanea el QR cuando arranques npm start.

  REPOSITORIO DEL TALLER:
"@ -ForegroundColor White
Write-Link "  Ver en GitHub" $REPO_HTTPS
Write-Host @"
    git clone $REPO_URL

  EJECUTAR EJERCICIOS:
    cd taller-react-native-fp\react-native\dia-01
    .\run-ejercicio.ps1 -Ejercicio ej01 -Target web

  GUIA COMPLETA:
    react-native/dia-01/guia-setup-alumno.md

"@ -ForegroundColor White
Write-Host $sep -ForegroundColor Cyan
