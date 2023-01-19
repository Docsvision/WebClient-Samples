[CmdletBinding(PositionalBinding=$False)]
Param(
	[Parameter(Position=0)][UInt16]$Option,
	[ValidateScript({Test-Path -Path "$_" -IsValid})]$CACHE="$((PWD).Drive.Name):\_node_modules"
)

Function Invoke-PackageSearch {
	process {
		try {
			if ("$PSItem" -NotLike "*\node_modules") {
				[IO.Directory]::GetFiles("$PSItem","package.json")
				[IO.Directory]::GetDirectories("$PSItem") | Invoke-PackageSearch
			}
		} catch {
			Write-Warning $PSItem.Exception.Message
		}
	}
}

$TargetList = @(
	"ClientScripts",
	"Controls",
	"Others",
	"ServerExtensions"
)

if (!$Option) {
	Write-Host -ForegroundColor Green "1) npm i"
	Write-Host -ForegroundColor Green "2) npm run build:prod"
	Write-Host -ForegroundColor Green "3) npm i & npm run build:prod"
	Write-Host -ForegroundColor Cyan "8) npm i --package-lock-only (update package-lock.json)"
	Write-Host -ForegroundColor Cyan "9) package search (DEBUG)"
	Write-Host -ForegroundColor Yellow "0) Exit"
	$Option = Read-Host -Prompt "Select"
}

$INSTALL = $False
$BUILD = $False
$LOCK = $False
$SEARCH = $False
$CI = $False
Switch ($Option) {
	1 { $INSTALL = $True; break }
	2 { $BUILD = $True; break }
	3 { $INSTALL = $BUILD = $True; break }
	8 { $LOCK = $True; break }
	9 { $SEARCH = $True; break }
	100 { $CI = $BUILD = $True; break }
	default { exit }
}

$NODE = (node -v).SubString(1)
if (!$NODE) { throw "failed to get node.js version" }

if ("$PWD" -ne "$PSScriptRoot") {
	Set-Location "$PSScriptRoot"
}

$PackageList = $TargetList | Resolve-Path | Invoke-PackageSearch

if ($SEARCH) {
	$PackageList | Resolve-Path -Relative
	exit
}

ForEach ($Package in $PackageList) {

	Split-Path -Path "$Package" | Set-Location

	if ($CI) {
		$CACHED = $False
		if (Test-Path -Path "$PWD\package-lock.json" -PathType Leaf) {
			if (Test-Path -Path "$PWD\node_modules" -PathType Container) {
				Remove-Item -Path "$PWD\node_modules" -Recurse -Force
			}
			<# TODO: try to parse package-lock.json and compute hash of dependencies #>
			$HASH = (Get-FileHash -Path "$PWD\package-lock.json" -Algorithm MD5).Hash.ToLower()
			if (Test-Path -Path "$CACHE\$NODE\$HASH\node_modules" -PathType Container) {
				Write-Host -ForegroundColor Green "Using cached dependencies"
				# Create directory junction
				New-Item -Path "$PWD\node_modules" -ItemType Junction -Value "$CACHE\$NODE\$HASH\node_modules"
				$CACHED = $True
			} else {
				npm ci
				if (!$?) { throw "npm ci failed" }
				xcopy "$PSScriptRoot\Typings\@docsvision" "$PWD\node_modules\@docsvision" /S/Q/Y
			}
		} else {
			Write-Warning "$PWD not contains package-lock.json"
			continue
		}
	}

	if ($INSTALL) {
		npm i
		if (!$?) { Write-Warning "npm i failed" }
	}

	if ($BUILD) {
		npm run build:prod
		if (!$?) { Write-Warning "npm run build:prod failed" }
	}

	if ($LOCK) {
		Remove-Item -Path "$PWD\package-lock.json" -Verbose
		npm i --package-lock-only
		if (!$?) { Write-Warning "npm i --package-lock-only failed" }
	}

	if ($CI) {
		if ($CACHED) {
			# Remove directory junction
			Remove-Item -Path "$PWD\node_modules" -Recurse -Force
		} else {
			# Move node_modules to cache
			New-Item -Path "$CACHE\$NODE\$HASH" -ItemType "Directory"
			Move-Item -Path "$PWD\node_modules" -Destination "$CACHE\$NODE\$HASH"
		}
	}

}

Set-Location "$PSScriptRoot"
