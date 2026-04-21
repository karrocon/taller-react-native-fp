#Requires -Version 5.1
<#
.SYNOPSIS
    Lanza un ejercicio del Día 1 de React Native en el dispositivo deseado.

.DESCRIPTION
    Copia el App.js del ejercicio elegido al proyecto Expo compartido
    (ejercicios/) e inicia el servidor de desarrollo.

    Instala dependencias automáticamente si node_modules no existe.

.PARAMETER Ejercicio
    Ejercicio a ejecutar: ej01 | ej02 | ej03 | bonus

.PARAMETER Target
    Dónde ejecutar:
      start   → servidor interactivo (menú QR/teclado)  [por defecto]
      android → emulador Android o USB (adb)
      web     → navegador
      ios     → SOLO macOS — no funciona en Windows

.EXAMPLE
    .\run-ejercicio.ps1 -Ejercicio ej01
    .\run-ejercicio.ps1 -Ejercicio ej02 -Target android
    .\run-ejercicio.ps1 -Ejercicio bonus -Target web
#>

param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('ej01', 'ej02', 'ej03', 'bonus')]
    [string]$Ejercicio,

    [ValidateSet('start', 'android', 'web', 'ios')]
    [string]$Target = 'start'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# ─── Rutas ──────────────────────────────────────────────────────────────────
$scriptDir    = $PSScriptRoot
$ejerciciosDir = Join-Path $scriptDir 'ejercicios'

$sourceMap = @{
    'ej01'  = 'ej01-basico\App.js'
    'ej02'  = 'ej02-estilos\App.js'
    'ej03'  = 'ej03-imagen\App.js'
    'bonus' = 'ej-bonus-contador\App.js'
}

$descriptions = @{
    'ej01'  = 'Tarjeta de presentación (básico)'
    'ej02'  = 'Texto con estilos y StyleSheet'
    'ej03'  = 'Tarjeta con imagen circular'
    'bonus' = 'Contador interactivo con useState'
}

# ─── Helpers ────────────────────────────────────────────────────────────────
function Write-Step { param($msg) Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Write-OK   { param($msg) Write-Host "  [OK] $msg" -ForegroundColor Green }
function Write-Warn { param($msg) Write-Host "  [!]  $msg" -ForegroundColor Yellow }

# ─── Aviso iOS ──────────────────────────────────────────────────────────────
if ($Target -eq 'ios') {
    Write-Warn "iOS Simulator NO está disponible en Windows."
    Write-Warn "Para probar en iPhone físico:"
    Write-Warn "  1. Instala Expo Go en tu iPhone desde App Store."
    Write-Warn "  2. Usa -Target start y escanea el QR con la cámara de iOS."
    Write-Host ""
    $Target = 'start'
}

# ─── Verificar que existe el ejercicio ──────────────────────────────────────
$relPath = $sourceMap[$Ejercicio]
$srcPath = Join-Path $ejerciciosDir $relPath

if (-not (Test-Path $srcPath)) {
    Write-Error "No se encontró el archivo: $srcPath"
    exit 1
}

# ─── Copiar App.js activo ────────────────────────────────────────────────────
$dstPath = Join-Path $ejerciciosDir 'App.js'

Write-Step "Cargando: $($descriptions[$Ejercicio])"
Copy-Item -Path $srcPath -Destination $dstPath -Force
Write-OK "$relPath  →  ejercicios/App.js"

# ─── Instalar dependencias si es necesario ───────────────────────────────────
$nodeModules = Join-Path $ejerciciosDir 'node_modules'
if (-not (Test-Path $nodeModules)) {
    Write-Step "node_modules no encontrado — ejecutando npm install..."
    Push-Location $ejerciciosDir
    try {
        npm install
        if ($LASTEXITCODE -ne 0) { throw "npm install falló (código $LASTEXITCODE)" }
        Write-OK "Dependencias instaladas."
    } finally {
        Pop-Location
    }
} else {
    Write-OK "node_modules ya presente."
}

# ─── Lanzar Expo ────────────────────────────────────────────────────────────
Write-Step "Iniciando Expo ($Target)..."
Write-Host ""

switch ($Target) {
    'android' {
        Write-Warn "Asegúrate de que el emulador Android está abierto O el móvil conectado con USB debugging."
        Write-Host "  Comprueba dispositivos:  adb devices" -ForegroundColor Gray
        Write-Host ""
        Push-Location $ejerciciosDir
        npx expo start --android
        Pop-Location
    }
    'web' {
        Push-Location $ejerciciosDir
        npx expo start --web
        Pop-Location
    }
    default {
        Write-Host "  Controles del servidor Expo:" -ForegroundColor Gray
        Write-Host "    a  → abrir en Android (emulador/USB)" -ForegroundColor Gray
        Write-Host "    w  → abrir en navegador web" -ForegroundColor Gray
        Write-Host "    r  → recargar app" -ForegroundColor Gray
        Write-Host "    q  → salir" -ForegroundColor Gray
        Write-Host ""
        Push-Location $ejerciciosDir
        npx expo start
        Pop-Location
    }
}
