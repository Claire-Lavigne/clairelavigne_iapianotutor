# 🎹 AI Piano Tutor — Coach de piano intelligent (Worship & Débutants)

**AI Piano Tutor** est une application Next.js alimentée par l’IA, conçue pour accompagner un·e débutant·e total·e jusqu’à jouer des **chants chrétiens modernes (worship)** en seulement **12 semaines** grâce à un programme progressif, structuré et personnalisé.

---

## ✨ Fonctionnalités

### 🎯 Programme pédagogique intégré (12 semaines)
Une progression complète, semaine par semaine :

- Découverte du clavier  
- Premiers accords  
- Rythmes worship  
- Renversements  
- Main gauche  
- Coordination  
- Arpèges  
- Build-ups  
- Fills  
- Chant complet en autonomie

Chaque séance générée respecte les objectifs de la semaine.

### 🧠 Génération intelligente via l’IA (Groq)
L’API `/api/tutor` génère :

- un résumé de séance  
- 2 à 4 exercices  
- conseils personnalisés  
- questions de feedback  
- séance structurée (5 min échauffement, 10 min technique, 5 min application)

Le modèle utilisé : **Llama 3.1** via API **Groq** (gratuit et ultra-rapide).

### 💾 Sauvegarde automatique (Supabase)
Chaque séance est sauvegardée :

- feedback  
- durée  
- semaine pédagogique  
- chant travaillé  
- plan complet au format JSON  
- date

### 🎛️ UI moderne (Next.js + Tailwind)
- Page `/session` : génération de séance, timeline 12 semaines, sélection du chant, feedback  
- Page `/history` : historique des séances  
- Page `/plan` : plan pédagogique complet  
- Timeline de progression  
- Sélection manuelle de la semaine

---

## 🚀 Démo rapide des pages

| Page | Rôle |
|------|------|
| `/session` | Séance du jour, IA, feedback, timeline |
| `/history` | Historique enregistré via Supabase |
| `/plan` | Détail des 12 semaines d'apprentissage |

---

## 🛠️ Installation

### 1. Cloner le projet

```bash
git clone https://github.com/.../ai-piano-tutor.git
cd ai-piano-tutor
```

### 2. Installer les dépendances
`npm install`

### 3. Configuration `.env.local`
```env
GROQ_API_KEY=ta_cle_groq
GROQ_MODEL=llama-3.1-8b-instant

NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ta_cle_anon
```

### 4. Lancer en local
`npm run dev`

## 📚 Structure du projet
```
app/
  api/
    tutor/
      route.ts         → Génération des séances via IA
  session/
      page.tsx         → UI principale (séance du jour)
  history/
      page.tsx         → Historique des séances
  plan/
      page.tsx         → Plan 12 semaines
components/
  WeekProgress.tsx     → Timeline 12 semaines
lib/
  learningPlan.ts       → Programme pédagogique complet
  tutorPrompt.ts        → Prompt système pour l’IA
  supabaseClient.ts     → Client Supabase
```

## 🛠️ Stack technique
| Technologie          | Usage           |
| -------------------- | --------------- |
| **Next.js 14**       | Front + API     |
| **React**            | UI              |
| **TailwindCSS**      | Design          |
| **Supabase**         | Base de données |
| **Groq (Llama 3.1)** | IA              |
| **TypeScript**       | Typage          |

## 🔮 Roadmap

- 🎧 Détection MIDI (notes jouées en direct)
- 🔊 Audio d’exemples (rythmes, arpèges…)
- 📈 Graphiques de progression
- 📱 Version mobile
- 📑 Export PDF des séances