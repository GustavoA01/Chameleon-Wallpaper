$agentPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$pythonPath = Join-Path $agentPath ".venv\Scripts\python.exe"
$mainPath = Join-Path $agentPath "main.py"

Set-Location $agentPath
& $pythonPath $mainPath