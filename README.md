# Mattemästaren 🐰🏆

Ett gratis, reklamfritt multiplikationsäventyr för barn 7–12 år, gjort för mobiler.

**Spela:** https://jesperwatanen.github.io/Mattemastaren/

## Spellägen

- **Tabellrace:** välj 1–10 (11–12 låses upp med XP). Tävla i de tio talen `1 × tabellen` till `10 × tabellen`. Ett tryck på ett av **sex svarsalternativ** räcker.
- **Repetera först:** alla tio multiplikationer visas automatiskt, ungefär en sekund per tal, med föregående och nästa tonade.
- **Hiscore:** personlig bästa svarstid samt topplista mellan barnprofiler på samma enhet för varje tabell. Tiden räknas som summan av svarsreaktionstider, utan pauser för rättning. Bara felfria, avslutade omgångar kan sätta rekord.
- **Tiokompisar:** 11 blandade frågor med 0–10, t.ex. `4 + ? = 10`; egen hiscore.
- **Övriga lägen:** adaptiv lugn träning, 45-sekunders blixtjakt och bosskamp. Samtliga använder sex svarsalternativ.

## Äventyr och belöningar

Separata barnprofiler, personliga resultat, XP, stjärnmynt, nivåer, medaljer, magiska världar och figurer. **Kaninen 🐰** är en valbar vän redan från start och kan också väljas för gamla profiler.

## Installation och integritet

Välj **Lägg till på startskärmen** i webbläsaren. Appen går att använda offline efter första lyckade nätbesök via service worker.

Alla resultat lagras **lokalt i webbläsarens localStorage**. Ingen inloggning eller central databas. Rensning av webbplatsdata kan radera framstegen. Exportera/importera backup via profilmenyn.

### GitHub Pages

Repository-inställning **Settings → Pages → Deploy from a branch → main → /(root)**. GitHub Pages serverar `index.html` och PWA-filerna.

## Automatiserade tester

`npm install && npm test` kör JSDOM-baserade tester av kaninprofil, tablellrace med repetition, sex svarsalternativ, sparat rekord, tiokompisar och vänbyte. GitHub Actions-filen `.github/workflows/smoke.yml` kör dem vid push till `main`.

Ingen annons, inget köp och inga externa spårningsskript.
