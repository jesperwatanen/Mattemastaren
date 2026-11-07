# Mattemästaren ✨

Ett gratis multiplikationsäventyr för barn 7–12 år – med smart repetition, snabbhetsbonusar, bosskamper och samlarbelöningar.

**Spela:** https://jesperwatanen.github.io/Mattemastaren/ (efter att GitHub Pages har aktiverats).

## Funktioner
- Multiplikation 1–10, tabellerna 11–12 låses upp under spelets gång
- Lugn, adaptiv träning som följer rätta svar och svarstid
- Blixtjakt, bosskamp och fokusträning på valda tabeller
- Barnprofiler, XP, stjärnmynt, medaljer, nivåer och världar
- Data sparas endast lokalt i webbläsaren; profilbackup kan exporteras
- Mobilanpassad PWA utan inloggning, reklam eller betalningar

## Publicera via GitHub Pages
1. Öppna **Settings → Pages** i detta repository.
2. Vid **Build and deployment**, välj **Deploy from a branch**.
3. Välj **main** och **/(root)**, därefter **Save**.
4. Besök sidan via länken ovan när GitHub har publicerat.

## Teknik
Vanlig HTML, CSS och JavaScript; en fristående `index.html` med hela spelupplevelsen. `sw.js` ger offlineåtkomst efter första nätbesöket. `manifest.webmanifest` och `icons/` används för installation på hemskärmen.

Ingen server eller databas. Fungerar på GitHub Pages.
