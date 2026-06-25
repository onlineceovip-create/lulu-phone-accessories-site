Set-Location -LiteralPath $PSScriptRoot

if (-not $env:ADMIN_USERNAME) {
  $env:ADMIN_USERNAME = "admin"
}

if (-not $env:ADMIN_PASSWORD) {
  $env:ADMIN_PASSWORD = "codex123"
}

if (-not $env:HOST) {
  $env:HOST = "0.0.0.0"
}

if (-not $env:PORT) {
  $env:PORT = "3000"
}

& "C:\Users\10627\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" (Join-Path $PSScriptRoot "server.js")
