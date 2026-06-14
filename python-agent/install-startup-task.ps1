$agentPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$pythonPath = Join-Path $agentPath ".venv\Scripts\pythonw.exe"
$mainPath = Join-Path $agentPath "main.py"
$action = New-ScheduledTaskAction -Execute $pythonPath -Argument "`"$mainPath`"" -WorkingDirectory $agentPath
$trigger = New-ScheduledTaskTrigger -AtLogOn
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive

Register-ScheduledTask `
  -TaskName "Chameleon Wallpaper Agent" `
  -Action $action `
  -Trigger $trigger `
  -Principal $principal `
  -Description "Starts the Chameleon Wallpaper Python agent silently when Windows starts." `
  -Force