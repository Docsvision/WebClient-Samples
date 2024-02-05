[CmdletBinding(PositionalBinding = $false)]
param (
	[Parameter(Position = 0)]
	[int]$Option
)

function Invoke-PackageSearch {
	process {
		try {
			if (!$PSItem.EndsWith('\node_modules') -and !$PSItem.EndsWith('\Obsolete')) {
				[IO.Directory]::GetFiles($PSItem, 'package.json')
				[IO.Directory]::GetDirectories($PSItem) | Invoke-PackageSearch
			}
		} catch {
			Write-Warning $PSItem.Exception.Message
		}
	}
}

$ErrorActionPreference = 'Stop'
node -v

if (!$Option) {
	Write-Host -ForegroundColor Green '1) npm i'
	Write-Host -ForegroundColor Green '2) npm run build:prod'
	Write-Host -ForegroundColor Green '3) npm i & npm run build:prod'
	Write-Host -ForegroundColor Cyan '8) npm i --package-lock-only (update package-lock.json)'
	Write-Host -ForegroundColor Cyan '100) npm ci & npm run build:prod (node_modules junction)'
	Write-Host -ForegroundColor Yellow '0) Exit'
	$Option = Read-Host -Prompt 'Select'
}

$INSTALL = $BUILD = $LOCK = $SEARCH = $CI = $false
switch ($Option) {
	1 { $INSTALL = $true; break }
	2 { $BUILD = $true; break }
	3 { $INSTALL = $BUILD = $true; break }
	8 { $LOCK = $true; break }
	9 { $SEARCH = $true; break }
	100 { $CI = $BUILD = $true; break }
	default { exit }
}

$PackageList = $PSScriptRoot | Invoke-PackageSearch

if ($SEARCH) {
	$PackageList | Resolve-Path -Relative
	exit
}

if ($CI) {
	$CacheMap = [System.Collections.Generic.Dictionary[string, string]]::new()
	$CachePath = $null
}

foreach ($Package in $PackageList) {

	Split-Path -Path $Package | Set-Location

	if ($CI) {
		if (!(Test-Path -Path 'package-lock.json' -PathType Leaf)) {
			Write-Warning "$PWD does not contain package-lock.json"
			continue
		}
		$Junction = $false
		$Hash = (Get-FileHash -Path 'package.json').Hash.ToLower()
		if (Test-Path -Path 'node_modules') {
			Remove-Item -Path 'node_modules' -Recurse -Force
		}
		if ($CacheMap.TryGetValue($Hash, [ref]$CachePath)) {
			$null = New-Item -Path 'node_modules' -ItemType Junction -Value $CachePath -Verbose
			$Junction = $true
		} else {
			npm ci
			if (!$?) { Write-Error 'npm ci failed' }
			$CacheMap[$Hash] = "$PWD\node_modules"
			$null = robocopy "$PSScriptRoot\Typings\@docsvision" 'node_modules\@docsvision' /MIR
		}
	}

	if ($INSTALL) {
		npm i
		if (!$?) { Write-Warning 'npm i failed' }
	}

	if ($BUILD) {
		npm run build:prod
		if (!$?) { Write-Warning 'npm run build:prod failed' }
	}

	if ($LOCK) {
		Remove-Item -Path 'package-lock.json' -Verbose
		npm i --package-lock-only
		if (!$?) { Write-Warning 'npm i --package-lock-only failed' }
	}

	if ($CI) {
		if ($Junction) {
			Remove-Item -Path 'node_modules' -Recurse -Force -Verbose
		}
	}

}

Set-Location $PSScriptRoot
