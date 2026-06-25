$startupDir = [Environment]::GetFolderPath("Startup")
$targetPath = Join-Path $startupDir "LuluPhoneAccessoriesSite.vbs"

if (Test-Path -LiteralPath $targetPath) {
  Remove-Item -LiteralPath $targetPath -Force
}

Write-Output "Removed auto-start launcher:"
Write-Output $targetPath
