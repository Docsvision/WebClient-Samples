#Requires -Version 5.1

function Invoke-YesNoPrompt($Prompt) {
	do {
		$Response = Read-Host -Prompt "$Prompt (Y/N)"
		if ($Response -Match '[yY]') {
			return $True
		}
	} until ($Response -Match '[nN]')
	return $False
}

function DownloadFile($Uri) {
	$FilePath = [IO.Path]::Combine($env:TEMP, [IO.Path]::GetFileName($Uri))
	try {
		Invoke-WebRequest -Uri $Uri -OutFile $FilePath -UseBasicParsing
		return $FilePath
	} catch {
		throw $PSItem.Exception.Message
	}
}

function Restart-Request {
	if (Invoke-YesNoPrompt -Prompt 'Operation completed successfully, but Visual Studio requires reboot before it can be used. Reboot now?') {
		Restart-Computer
	}
	exit
}

function Find-VisualStudio {
	$vswhere = "$ProgramFiles86\Microsoft Visual Studio\Installer\vswhere.exe"
	if (Test-Path -Path "$vswhere" -PathType Leaf) {
		# try to get instance with required workloads
		$script:VisualStudio = &$vswhere -prerelease -latest -requires 'Microsoft.VisualStudio.Workload.ManagedDesktop' 'Microsoft.VisualStudio.Workload.NetWeb' -version 15 -format json | ConvertFrom-Json
		if ($VisualStudio) {
			$MSBuildPath = Split-Path -Path "$($VisualStudio.installationPath)\MSBuild\*\*\MSBuild.exe" -Resolve | Select-Object -Last 1
			if ($MSBuildPath) {
				if (!$env:Path.Contains($MSBuildPath)) {
					$env:Path = "$MSBuildPath;$env:Path"
				}
				return $True
			} else {
				throw 'FATAL ERROR: Visual Studio installation damaged or corrupted.'
			}
		} else {
			# try to get any other and add required workloads
			$script:VisualStudio = &$vswhere -prerelease -latest -version 15 -format json | ConvertFrom-Json
			if ($VisualStudio) {
				if (Invoke-YesNoPrompt -Prompt 'Not found any Visual Studio instances that meet the requirements. Try to add ".NET desktop development" and "ASP.NET and web development" workloads to the latest one?') {
					$Process = Start-Process -FilePath "$($VisualStudio.properties.setupEngineFilePath)" -ArgumentList 'modify', '--productId', "$($VisualStudio.productId)", '--channelId', "$($VisualStudio.channelId)", '--add', 'Microsoft.VisualStudio.Workload.ManagedDesktop', 'Microsoft.VisualStudio.Workload.NetWeb', '--passive', '--norestart' -Verb RunAs -PassThru -Wait
					switch ($Process.ExitCode) {
						0 { return Find-VisualStudio }
						3010 { Restart-Request }
					}
				}
			}
		}
	} else {
		Write-Host 'Not found vswhere which is included with the installer as of Visual Studio 2017 version 15.2 and later. Visual Studio probably not installed.'
	}
	return $False
}

function Install-VisualStudio {
	if (Invoke-YesNoPrompt -Prompt 'Try to install Visual Studio 2019? You can choose any edition.') {
		Write-Host '1) Community'
		Write-Host '2) Professional'
		Write-Host '3) Enterprise'
		Write-Host '0) Exit'
		$Response = Read-Host -Prompt 'Edition'
		switch ($Response) {
			1 { $FileName = 'vs_community.exe'; break }
			2 { $FileName = 'vs_professional.exe'; break }
			3 { $FileName = 'vs_enterprise.exe'; break }
			default { return $False }
		}
		$FilePath = DownloadFile -Uri "https://aka.ms/vs/16/release/$FileName"
		$Process = Start-Process -FilePath $FilePath -ArgumentList '--add', 'Microsoft.VisualStudio.Workload.ManagedDesktop', 'Microsoft.VisualStudio.Workload.NetWeb', '--passive', '--norestart' -PassThru -Wait
		switch ($Process.ExitCode) {
			0 { return Find-VisualStudio }
			3010 { Restart-Request }
		}
	}
	return $False
}

function Update-Path {
	$Array = @()
	'Process', 'User', 'Machine' | ForEach-Object {
		$Array += [Environment]::GetEnvironmentVariable('Path', [EnvironmentVariableTarget]::$PSItem).Split(';', [StringSplitOptions]::RemoveEmptyEntries)
	}
	$env:Path = [String]::Join(';', ($Array | Sort-Object -Unique))
}

function Find-Node {
	$Version = '14.17.0'
	$Node = Get-Command -Name Node -ErrorAction SilentlyContinue
	$NPM = Get-Command -Name NPM -ErrorAction SilentlyContinue
	$NVM = Get-Command -Name NVM -ErrorAction SilentlyContinue
	if ($Node) {
		if ([Version](node -v).SubString(1) -ge [Version]$Version) {
			if ($NPM) {
				return $True
			} else {
				throw 'FATAL ERROR: Node.js installation damaged or corrupted.'
			}
		} else {
			if ($NVM) {
				if (!(Select-String -InputObject (nvm list) -Pattern $Version -SimpleMatch -Quiet)) {
					nvm install $Version
				}
				if (!$IsAdmin) {
					Write-Host 'Node Version Manager needs administrator rights to create symlinks and change node version. Windows prompts for credential.'
					Read-Host 'Press Enter to continue'
				}
				# need to wait for the process, otherwise node will not be available
				Start-Process -FilePath 'NVM' -ArgumentList 'use', "$Version" -Wait
				return Find-Node
			}
		}
	}
	return $False
}

function Install-Node {
	if (Invoke-YesNoPrompt -Prompt 'Try to install install Node v14.17.0?') {
		if ($Is64BitOperatingSystem) {
			$FilePath = DownloadFile -Uri 'https://nodejs.org/dist/v14.17.0/node-v14.17.0-x64.msi'
		} else {
			$FilePath = DownloadFile -Uri 'https://nodejs.org/dist/v14.17.0/node-v14.17.0-x86.msi'
		}
		$Process = Start-Process -FilePath 'msiexec' -ArgumentList '/i', $FilePath, '/qn' -Verb RunAs -PassThru -Wait
		if ($Process.ExitCode -eq 0) {
			Update-Path
			return Find-Node
		}
	}
	return $False
}

function Search-NodePackage {
	process {
		try {
			if ($PSItem -NotLike '*\node_modules') {
				[IO.Directory]::GetFiles($PSItem, 'package.json')
				[IO.Directory]::GetDirectories($PSItem) | Search-NodePackage
			}
		} catch {
			Write-Warning $PSItem.Exception.Message
		}
	}
}

if ($PWD.Path -ne $PSScriptRoot) {
	Set-Location $PSScriptRoot
}

$Is64BitOperatingSystem = [Environment]::Is64BitOperatingSystem
if ($Is64BitOperatingSystem) {
	$ProgramFiles86 = ${env:ProgramFiles(x86)}
} else {
	Write-Warning 'It is recommended to use a 64-bit operating system.'
	if (Invoke-YesNoPrompt -Prompt 'Are you sure you want to continue?') {
		$ProgramFiles86 = ${env:ProgramFiles}
	} else {
		exit
	}
}

# Check the role of a Windows user
$Principal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
$script:IsAdmin = $Principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

# Override security protocol. Some systems still use deprecated TLS 1.0 by default.
if ([Net.ServicePointManager]::SecurityProtocol -ne [Net.SecurityProtocolType]::Tls12) {
	[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
}

# Visual Studio
if (!(Find-VisualStudio)) {
	if (!(Install-VisualStudio)) {
		throw 'FATAL ERROR: cannot continue without Visual Studio.'
	}
}

# Node.js
if (!(Find-Node)) {
	if (!(Install-Node)) {
		throw 'FATAL ERROR: cannot continue without Node v14.17.0.'
	}
}

# NuGet
$NuGet = (Get-Command -Name NuGet -ErrorAction SilentlyContinue).Source
if (!$NuGet) {
	$NuGet = "$env:TEMP\nuget.exe"
	if (!(Test-Path -Path $NuGet -PathType Leaf)) {
		$NuGet = DownloadFile -Uri 'https://dist.nuget.org/win-x86-commandline/latest/nuget.exe'
	}
}

# Templates
$TemplatePath = "$([Environment]::GetFolderPath('MyDocuments'))\Visual Studio $($VisualStudio.catalog.productLineVersion)\Templates\ProjectTemplates\Visual C#"
Get-ChildItem -Path 'ProjectTemplates\VSTemplates' -File | ForEach-Object {
	if (!(Test-Path -Path "$TemplatePath\$($PSItem.Name)" -PathType Leaf)) {
		if (!(Test-Path -Path $TemplatePath -PathType Container)) {
			New-Item -Path $TemplatePath -ItemType Directory
		}
		Copy-Item -Path $PSItem.FullName -Destination $TemplatePath
	}
}

$TargetList = @(
	'ClientScripts',
	'Controls',
	'Others',
	'ServerExtensions'
)

$OptionList = @()
$MSBUILD = $NPM = $REUSE = $INSTALL = $BUILD = $False
Write-Host -ForegroundColor Green 'All required components are installed, you are ready to go.'
Write-Host '1) msbuild'
Write-Host '2) npm i'
Write-Host '3) npm run build:prod'
Write-Host '9) msbuild & npm i & npm run build:prod (reuse node_modules)'
Write-Host '0) Exit'
# sorted list of trimmed unique values
$OptionList += ((Read-Host -Prompt 'Option').Split(',', [StringSplitOptions]::RemoveEmptyEntries).Trim() | Sort-Object -Unique)
switch ($OptionList) {
	1 { $MSBUILD = $True }
	2 { $NPM = $INSTALL = $True }
	3 { $NPM = $BUILD = $True }
	9 { $MSBUILD = $NPM = $REUSE = $BUILD = $True }
	default { exit }
}

if ($env:SamplesOutput) {
	Write-Host "Build output directory is set to '$env:SamplesOutput'."
	if ($env:SamplesOutput.Contains($env:ProgramFiles)) {
		if (!$IsAdmin) {
			Write-Host 'You probably do not have write access to Program Files and the build will fail. You need to run the script as an administrator.'
			if (!(Invoke-YesNoPrompt -Prompt 'Are you sure you want to continue?')) {
				exit
			}
		}
	}
}

if ($MSBUILD) {
	&$NuGet restore 'Samples.sln'
	MSBuild 'Samples.sln' '-t:Clean;Build' -p:Configuration=Release
}

if ($NPM) {
	$PackageList = $TargetList | Resolve-Path | Search-NodePackage
	ForEach ($Package in $PackageList) {
		$i++; Write-Host -ForegroundColor Yellow "Building $i/$($PackageList.Count) package..."
		Split-Path -Path $Package | Set-Location
		if ($REUSE) {
			$PackageHash = (Get-FileHash -Path 'package.json' -Algorithm MD5).Hash
			if (Test-Path -Path "$PSScriptRoot\_node_modules\$PackageHash\node_modules" -PathType Container) {
				Remove-Item -Path 'node_modules' -ErrorAction SilentlyContinue -Recurse -Force
				New-Item -Path 'node_modules' -ItemType Junction -Value "$PSScriptRoot\_node_modules\$PackageHash\node_modules"
				Write-Host -ForegroundColor Green 'Using cached node_modules'
				$JUNCTION = $True
				$INSTALL = $False
			} else {
				$JUNCTION = $False
				$INSTALL = $True
			}
		}
		if ($INSTALL) {
			npm i
			if (!$?) { throw 'npm i failed' }
			npm update
			if (!$?) { throw 'npm update failed' }
		}
		if ($BUILD) {
			npm run build:prod
			if (!$?) { throw 'npm run build:prod failed' }
		}
		if ($REUSE) {
			if ($JUNCTION) {
				# Remove directory junction
				Remove-Item -Path 'node_modules' -Recurse -Force
			} else {
				# Move node_modules to cache
				New-Item -Path "$PSScriptRoot\_node_modules" -Name $PackageHash -ItemType Directory
				Move-Item -Path 'node_modules' -Destination "$PSScriptRoot\_node_modules\$PackageHash\node_modules"
			}
		}
	}
	Set-Location $PSScriptRoot
}
