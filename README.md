# Mole Hunt
Simple game with custom made engine, built with Vite + React. The UI and menu is built using React component. Mole Hunt is a game based on Whack-A-Mole. The gameplay itself is to click the mole for 30 second, the mole will show up around 200ms-400ms so its really challanging. Each time you successfully catch the mole you will get a score. Top 10 highest score will be show in the leaderboard (local storage). Also there is a button to disable sound (so you will not have a reason if the bgm is annoying).

[Live Site](https://vite-molehunt.netlify.app/)

## Features
- Leaderboards (localStorage)
- BGM & SFX also the button to disable it
- Time Limit & Score
- React Component for the UI
- Custom made game engine for the game canvas
- Autopause/autoresume when window is blur or focus

## Folder Structure
```
project-root/
├── coverage/
│   └── lcov-report/
├── src/
│   ├── assets/
│   ├── contexts/
│   ├── game/
│   │   ├── engine/
│   │   ├── entity/
│   │   └── utils/
│   ├── hooks/
│   ├── services/
│   ├── shared/
│   │   ├── component.ts/
│   │   ├── types/
│   │   └── utils/
│   └── __tests__/
│       ├── components/
│       └── game/
└── __mocks__/
```

## Tech Stack
- `Vite + React` : Fastest & good for simple project.
- `Vanilla CSS` : Vanilla is the best right.
- `localStorage` : Store data locally.
- `Jest` : Testing framework.
- `React Testing Library` : Render and other testing interactions.

## How to Install

Follow these steps to set up the project locally:

1. **Clone the repository:**
```sh
git clone git@github.com:ryananjasmara/vite-molehunt.git
cd vite-molehunt
```

2. **Install Dependencies**
```sh
npm install
```

3. **Run the development server:**
```sh
npm run dev
```

## Unit Test
I have implemented unit tests for this project, focusing on components and game engine.

[Codecov Unit Test](https://app.codecov.io/github/ryananjasmara/vite-molehunt/tree/master)
