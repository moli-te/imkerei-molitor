# Setzt Kopf (<head>-Teil), Header und Footer aus dem Ordner _bausteine in alle Seiten ein.
# Nach jeder Änderung an kopf.html, header.html oder footer.html einmal ausführen:
#   powershell -ExecutionPolicy Bypass -File _bausteine\bauen.ps1
# Jede Seite braucht die Markierungen  <!-- KOPF:START --><!-- KOPF:ENDE -->,
# <!-- HEADER:START --><!-- HEADER:ENDE --> und <!-- FOOTER:START --><!-- FOOTER:ENDE -->
# sowie <body data-bereich="..."> für den markierten Menüpunkt.

$web  = Split-Path -Parent $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding $false
$teile = @{
  'KOPF'   = [IO.File]::ReadAllText((Join-Path $PSScriptRoot 'kopf.html'),   $utf8).TrimEnd()
  'HEADER' = [IO.File]::ReadAllText((Join-Path $PSScriptRoot 'header.html'), $utf8).TrimEnd()
  'FOOTER' = [IO.File]::ReadAllText((Join-Path $PSScriptRoot 'footer.html'), $utf8).TrimEnd()
}
$seiten = Get-ChildItem -Path $web -Recurse -Filter 'index.html' | Where-Object { $_.FullName -notlike '*\_bausteine\*' }
foreach ($s in $seiten) {
  $rel   = $s.DirectoryName.Substring($web.Length).Trim('\')
  $tiefe = if ($rel) { ($rel -split '\\').Count } else { 0 }
  $R     = '../' * $tiefe
  $html  = [IO.File]::ReadAllText($s.FullName, $utf8)
  $bereich = ''
  $m = [regex]::Match($html, '<body[^>]*data-bereich="([^"]+)"')
  if ($m.Success) { $bereich = $m.Groups[1].Value }
  foreach ($name in 'KOPF','HEADER','FOOTER') {
    $inhalt = $teile[$name].Replace('{{R}}', $R)
    if ($name -eq 'HEADER' -and $bereich) {
      $inhalt = $inhalt.Replace('data-nav="' + $bereich + '"', 'data-nav="' + $bereich + '" aria-current="page"')
    }
    $muster = '(?s)<!-- ' + $name + ':START -->.*?<!-- ' + $name + ':ENDE -->'
    $neu    = '<!-- ' + $name + ':START -->' + "`n" + $inhalt + "`n" + '<!-- ' + $name + ':ENDE -->'
    $html   = [regex]::Replace($html, $muster, { param($x) $neu })
  }
  [IO.File]::WriteAllText($s.FullName, $html, $utf8)
  Write-Output ("eingesetzt: " + $(if ($rel) { $rel } else { '(Startseite)' }))
}
