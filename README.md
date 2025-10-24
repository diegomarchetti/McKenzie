# McKenzie @ Home 🧘‍♂️

Una web app moderna e interattiva per guidare l'utente attraverso 7 esercizi McKenzie per la schiena.

## ✨ Caratteristiche

- 🎯 **Routine guidata** - 7 esercizi progressivi con istruzioni dettagliate
- ⏱️ **Timer intelligente** - Countdown automatico per esercizi HOLD
- 🗣️ **Guida vocale** - Annunci TTS in italiano
- 🎨 **Material Design 3** - UI moderna ispirata a Material 3 Expressive
- 🌓 **Tema chiaro/scuro** - Modalità automatica o manuale
- 📱 **PWA** - Installabile su smartphone e tablet
- ♿ **Accessibile** - Compatibile con screen reader, WCAG AA
- 🫁 **Animazione respiro** - Durante esercizi HOLD per sincronizzare il respiro

## 🏗️ Architettura

### Stack Tecnologico

- **Framework**: React 18 + Vite
- **State Management**: Zustand con persistenza
- **Styling**: CSS Modules + CSS Variables
- **Audio**: Web Speech API + Audio Context API
- **PWA**: Vite PWA Plugin + Workbox
- **Build**: Vite (ottimizzato per GitHub Pages)

### Struttura del Progetto

```
McKenzie/
├── public/              # Assets statici e PWA manifest
├── assets/              # Immagini esercizi (01-07.png)
├── src/
│   ├── components/      # Componenti UI riutilizzabili
│   │   ├── Button/
│   │   ├── Timer/
│   │   ├── BreathingCircle/
│   │   ├── ProgressBar/
│   │   └── Settings/
│   ├── views/           # Schermate principali
│   │   ├── Welcome.jsx
│   │   ├── Exercise.jsx
│   │   └── Completion.jsx
│   ├── lib/             # Utility e manager
│   │   └── audioManager.js
│   ├── store/           # Zustand store
│   │   └── useStore.js
│   ├── data/            # Database esercizi
│   │   └── exercises.json
│   ├── styles/          # Stili globali e tema
│   │   ├── theme.css
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## 🚀 Installazione e Avvio

### Prerequisiti

- Node.js 16+ 
- npm o yarn

### Comandi

```bash
# Installa dipendenze
npm install

# Avvia server di sviluppo
npm run dev

# Build per produzione
npm run build

# Preview build
npm run preview
```

## 📊 Dati Esercizi

Gli esercizi sono definiti in `src/data/exercises.json`:

- **HOLD**: Esercizi con timer (es. 120 secondi)
- **REPS**: Esercizi a ripetizioni (es. 10 ripetizioni)

### Esercizi Inclusi

1. Sdraiato a pancia in giù (HOLD - 120s)
2. Sdraiato con gomiti appoggiati (HOLD - 120s)
3. Estensione da sdraiato (REPS - 10)
4. Estensione in piedi (REPS - 10)
5. Flessione da sdraiato (REPS - 6)
6. Flessione da seduto (REPS - 6)
7. Flessione in piedi (REPS - 6)

## 🎨 Design System

### Palette Colori (Material 3)

- **Primary**: `#6750A4` (viola)
- **Secondary**: `#625B71` (grigio-viola)
- **Tertiary**: `#7D5260` (rosa-terra)

### Tipografia

- **Display**: Poppins (titoli)
- **Body**: Inter (testo)

### Spacing

Sistema basato su 8px (0.5rem, 1rem, 1.5rem, 2rem...)

## 🔊 Sistema Audio

### Text-to-Speech (TTS)

- Utilizza Web Speech API
- Voce italiana (it-IT)
- Rate: 0.9 (voce calma)
- Disattivabile dalle impostazioni

### Beep

- Generato con Audio Context API
- Tono: 800Hz (gentile)
- Fade out dolce (300ms)
- Beep doppio al completamento routine

## 🫁 Animazione Respiro

Attiva durante esercizi HOLD:

- Ciclo: 6 secondi (3s inspira + 3s espira)
- Cerchio pulsante con gradiente
- Testo guida: "Inspira..." / "Espira..."

## ⚙️ Impostazioni

Salvate automaticamente in localStorage:

- **Audio**: On/Off beep
- **Voce**: On/Off TTS
- **Tema**: Chiaro / Scuro / Auto

## 🌐 Deploy su GitHub Pages

```bash
# Build
npm run build

# Deploy manuale
npm run deploy

# Oppure usa GitHub Actions (vedi .github/workflows)
```

L'app sarà disponibile su: `https://[username].github.io/McKenzie/`

## ♿ Accessibilità

- Semantic HTML (`<main>`, `<section>`, `<button>`)
- ARIA labels su tutti i controlli
- Focus visibile personalizzato
- Contrasto minimo AA (4.5:1)
- Supporto tastiera completo
- Screen reader friendly con `aria-live`

## 📱 PWA Features

- Installabile su home screen
- Offline-first con Service Worker
- Icons ottimizzati (192x192, 512x512)
- Theme color personalizzato
- Manifest completo

## 🔧 Configurazione

### Vite Config

Il `vite.config.js` è configurato per:

- Base path: `/McKenzie/` (GitHub Pages)
- PWA automatico
- Build ottimizzato
- Asset handling

### Personalizzazione

Per modificare colori, tempi o esercizi:

1. **Colori**: Modifica `src/styles/theme.css`
2. **Esercizi**: Modifica `src/data/exercises.json`
3. **Durate timer**: Aggiorna campo `duration` in exercises.json

## 🧪 Testing

```bash
# Run dev server e testa manualmente
npm run dev

# Testa build
npm run build && npm run preview
```

### Checklist Test

- [ ] Timer funziona correttamente
- [ ] Animazione respiro sincronizzata
- [ ] TTS pronuncia correttamente
- [ ] Beep suona al completamento
- [ ] Settings salvano in localStorage
- [ ] Tema chiaro/scuro funziona
- [ ] Responsive su mobile/tablet/desktop
- [ ] PWA installabile
- [ ] Accessibilità con screen reader

## 📄 Licenza

MIT

## 👨‍💻 Autore

Sviluppato con ❤️ per il benessere della schiena
