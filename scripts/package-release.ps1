$ErrorActionPreference = 'Stop'
$releaseProject = Split-Path -Parent $PSScriptRoot
Push-Location $releaseProject
try {
  node scripts/verify-release.mjs
  if ($LASTEXITCODE -ne 0) { throw 'Release verification failed.' }
  $releaseRoot = Join-Path $releaseProject 'artifacts/releases'
  New-Item -ItemType Directory -Path $releaseRoot -Force | Out-Null
  $releaseName = 'ihire-website-' + [DateTime]::UtcNow.ToString('yyyyMMdd-HHmmss') + '-utc.zip'
  $releaseZip = Join-Path $releaseRoot $releaseName
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  [System.IO.Compression.ZipFile]::CreateFromDirectory((Join-Path $releaseProject 'dist'), $releaseZip)
  $releaseArchive = [System.IO.Compression.ZipFile]::OpenRead($releaseZip)
  try {
    $releaseEntries = @($releaseArchive.Entries | ForEach-Object { $_.FullName.Replace('\','/') })
    foreach ($releaseRequired in @('.htaccess','api/.htaccess','api/enquiry.php','images/social-share.jpg','images/pricing/entry-level.webp','images/pricing/mid-level.webp','images/pricing/senior-level.webp')) {
      if ($releaseEntries -notcontains $releaseRequired) { throw "Missing archive file: $releaseRequired" }
    }
  } finally { $releaseArchive.Dispose() }
  $releaseHash = (Get-FileHash -LiteralPath $releaseZip -Algorithm SHA256).Hash
  [System.IO.File]::WriteAllText(($releaseZip + '.sha256'), ($releaseHash + '  ' + $releaseName + [Environment]::NewLine))
  Write-Output $releaseZip
  Write-Output ('SHA256 ' + $releaseHash)
  Write-Output ('Bytes ' + (Get-Item -LiteralPath $releaseZip).Length)
} finally { Pop-Location }
