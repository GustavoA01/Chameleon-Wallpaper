$agentPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$scriptPath = Join-Path $agentPath "start-agent.ps1"
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$scriptPath`""
$trigger = New-ScheduledTaskTrigger -AtLogOn
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive

Register-ScheduledTask `
  -TaskName "Chameleon Wallpaper Agent" `
  -Action $action `
  -Trigger $trigger `
  -Principal $principal `
  -Description "Starts the Chameleon Wallpaper Python agent when Windows starts." `
  -Force
