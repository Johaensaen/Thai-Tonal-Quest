# Thai Tonal Quest

Eine kleine, offline nutzbare Web-App zum Lernen thailändischer Wörter und der
fünf Töne. Sie enthält ein integriertes Anfängerprogramm mit fünf aufeinander
aufbauenden Lektionen und jeweils fünf einsilbigen Wörtern.

## Lernpfad

Die erste Ton-Lektion ist sofort verfügbar. Nach Abschluss wird die nächste
freigeschaltet; bereits gelernte Wörter bleiben im Trainings- und Prüfungsmodus
für die Wiederholung erhalten. Lektionen, Erfahrungspunkte und eigene Wörter
werden lokal im Browser gespeichert. Für den integrierten Grundwortschatz ist
keine manuelle Pflege, Anmeldung oder externe API erforderlich.

Unter „Eigene Wörter“ lassen sich weiterhin persönliche Ergänzungen speichern.
Die Umschrift und Tonangaben des Starterwortschatzes sind als Lernhilfe gedacht;
mehrsilbige Wörter und die Nuancen natürlicher Aussprache sind damit nicht
vollständig abgebildet.

## Tägliche Erinnerung

Über „Erinnerung“ kann optional eine tägliche Uhrzeit eingestellt werden. Die
Browser-Benachrichtigung wird erst nach Zustimmung aktiviert und wechselt
zwischen mehreren kurzen Lernimpulsen. Sie wird lokal im Browser geplant und
funktioniert nur, solange die App geöffnet ist; Energiesparfunktionen können
die Zustellung verzögern. Ist die App geschlossen, kann GitHub Pages keine
Push-Nachricht senden. Eine verpasste Erinnerung wird beim nächsten Öffnen der
App nachgeholt. Push-Nachrichten bei geschlossener App benötigen einen
zusätzlichen Push-Dienst mit zeitgesteuertem Backend.