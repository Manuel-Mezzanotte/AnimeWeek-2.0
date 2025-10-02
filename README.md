# AnimeWeek 2.0

## Panoramica del Progetto

**AnimeWeek 2.0** è un'applicazione desktop multipiattaforma che trasforma la gestione degli anime in un'esperienza visiva e intuitiva. L'applicazione presenta un calendario settimanale intelligente dove ogni anime viene rappresentato attraverso card colorate e accattivanti, ognuna con l'artwork caratteristico della serie.

L'interfaccia è progettata per offrire una navigazione fluida e immediata, permettendo agli utenti di organizzare facilmente la propria settimana di visione anime con un solo sguardo.

## Caratteristiche Principali

### Design e Interfaccia

- **Sistema di Temi Multipli**: 6 temi personalizzabili dalle impostazioni (Orange Flame, Sakura Pink, Ocean Blue, Cream Elegance, Royal Purple, Sunset Gold)
- **Layout Intuitivo**: Barra laterale fissa per la navigazione e area principale per il calendario
- **Card Anime Immersive**: Ogni anime è rappresentato da una card colorata con artwork di sfondo
- **Theming Dinamico**: Cambio tema istantaneo con transizioni fluide senza riavvio

### Organizzazione Settimanale

- **Calendario a Griglia**: I sette giorni della settimana disposti orizzontalmente nella parte superiore
- **Posizionamento Automatico**: Le card si posizionano automaticamente sotto il giorno di programmazione
- **Vista Giornaliera Dinamica**: Il giorno corrente viene evidenziato per orientamento immediato
- **Gestione Visiva**: Colpo d'occhio immediato su tutti gli anime della settimana

### Sistema di Ricerca e Aggiunta

- **Search Bar Superiore**: Ricerca rapida degli anime già aggiunti al calendario
- **Integrazione AniList**: Database completo con artwork, generi e informazioni aggiornate
- **Aggiunta Manuale**: Possibilità di inserire anime personalizzati non presenti nel database
- **Preview in Tempo Reale**: Anteprima della card durante la configurazione

## Interfaccia Utente Dettagliata

### Barra Laterale Sinistra

- **Search Anime**: Campo di ricerca in alto per filtrare rapidamente gli anime già aggiunti
- **Calendar**: Vista principale del calendario settimanale
- **Favorites**: Accesso rapido agli anime preferiti marcati con il cuore
- **ADD ANIME Panel**: Sezione per aggiungere nuovi anime con campi per Title, Day, Time, Tags e pulsante Preview

### Area Calendario Principale

- **Header Giorni**: Barra orizzontale con i sette giorni della settimana (MON-SUN)
- **Grid delle Card Anime**: Layout a griglia fluido con card colorate contenenti artwork, titolo, generi e icona preferiti
- **Esempi**: My Hero Academia (arancione), Spy x Family (verde), Demon Slayer (rosso), One Piece (blu/arancione)

## Tecnologie e Architettura

### Stack Tecnologico

- **Electron Framework**: Applicazione desktop nativa multipiattaforma con tecnologie web moderne
- **React con TypeScript**: Interfaccia utente reattiva e type-safe per sviluppo robusto
- **Sistema di Animazioni Avanzato**: Transizioni fluide e micro-interazioni coinvolgenti
- **Theming Dinamico**: Architettura CSS modulare per cambio tema istantaneo
- **Storage Locale Ottimizzato**: Gestione efficiente dei dati offline per prestazioni rapide
- **GraphQL Integration**: Connessione ottimizzata con l'API AniList per dati aggiornati

### Caratteristiche Tecniche

- **Installazione Nativa**: Download diretto di file eseguibili per Windows (.exe) e macOS (.dmg)
- **Performance Ottimizzate**: Rendering efficiente delle card anime ad alta risoluzione
- **Aggiornamenti Automatici**: Sistema integrato per mantenere l'app sempre aggiornata
- **Offline-First**: Funzionamento completo anche senza connessione internet
- **Sicurezza**: Protezione dei dati utente con crittografia locale

## Sistema di Temi Multipli

L'applicazione offre **6 temi personalizzabili** selezionabili dalle impostazioni:

### 1. Orange Flame (Predefinito)
- **Primario**: Arancione vibrante (#FF6B35)
- **Secondario**: Nero profondo (#1A1A1A)
- **Atmosfera**: Energia dinamica per sessioni di visione attive

### 2. Sakura Pink
- **Primario**: Rosa sakura (#FF69B4)
- **Secondario**: Nero antracite (#1C1C1C)
- **Atmosfera**: Romantica e delicata, perfetta per anime shojo

### 3. Ocean Blue
- **Primario**: Blu oceano (#00BFFF)
- **Secondario**: Blu scuro navy (#0F1419)
- **Atmosfera**: Fresca e avventurosa, ideale per anime d'azione

### 4. Cream Elegance
- **Primario**: Beige crema (#F5F5DC)
- **Secondario**: Marrone moka scuro (#2F2820)
- **Atmosfera**: Minimalista e rilassante per sessioni prolungate

### 5. Royal Purple
- **Primario**: Viola regale (#8A2BE2)
- **Secondario**: Nero violaceo (#1A0D1A)
- **Atmosfera**: Mistica e affascinante per anime fantasy

### 6. Sunset Gold
- **Primario**: Oro tramonto (#FFD700)
- **Secondario**: Marrone scuro (#2B1810)
- **Atmosfera**: Calda e nostalgica per momenti di riflessione

## Obiettivi di Sviluppo

### Fase 1: Fondamenta
- [ ] Setup architettura Electron + React
- [ ] Implementazione interfaccia base
- [ ] Integrazione AniList API
- [ ] Sistema di storage locale

### Fase 2: Funzionalità Core
- [ ] Sistema di aggiunta/modifica anime
- [ ] Calendario interattivo
- [ ] Sistema di preferiti
- [ ] Sistema di temi multipli

### Fase 3: Miglioramenti
- [ ] Notifiche episodi in uscita
- [ ] Sistema di tracking episodi visti
- [ ] Export/Import liste
- [ ] Aggiornamenti automatici

## Note di Sviluppo

Tutti i componenti e servizi utilizzati sono e devono rimanere gratuiti, garantendo uno sviluppo sostenibile anche per progetti indipendenti o in fase iniziale. Questo approccio permette di mantenere l'applicazione accessibile a tutti gli utenti senza costi nascosti.
