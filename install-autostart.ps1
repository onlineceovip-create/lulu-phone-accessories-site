$startupDir = [Environment]::GetFolderPath("Startup")
$launcherName = "LuluPhoneAccessoriesSite.vbs"
$sourcePath = Join-Path $PSScriptRoot $launcherName
$targetPath = Join-Path $startupDir $launcherName

Copy-Item -LiteralPath $sourcePath -Destination $targetPath -Force

Write-Output "Installed auto-start launcher:"
Write-Output $targetPath
