cd %~dp0..\
rd /s /q installroot
md installroot
for %%D in (Assemblies ClientScripts ControlProperties Controls Others ProjectTemplates ServerExtensions) do robocopy "%%D" "installroot\%%D" /xd "bin" "obj" "node_modules" /xf ".gitignore" /s
for %%D in (README.md Samples.sln StrongNameKey.snk) do copy "%%D" "installroot"
del "installroot\ClientScripts\package-lock.json"
del "installroot\Controls\RefCases\RefCasesServerExtension\package-lock.json"
copy Install\install.ps1 installroot
copy Install\USAGE.md installroot
copy Samples.code-workspace installroot
