# Yellow Taxi (Frontend)

A frontend implementation for Yellow Taxi Analytics Dashboard using [ReactJS](https://react.dev/) + [Vite](https://vite.dev/)

## Demo

[![Vercel](https://img.shields.io/badge/open%20frontend-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://yellow-taxi-irfnd.vercel.app)

Demo account

email: `admin@mail.com` pass: `YellowTaxi@2024`

## Features

- **Frontend**: [ReactJS](https://react.dev/) + [Vite](https://vite.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [Tailwind](https://tailwindcss.com/) + [Shadcn](https://ui.shadcn.com/)
- **Icon Library**: [Tabler Icons](https://tabler.io/icons)
- **Routing & Fetching**: [Tanstack Router](https://tanstack.com/router/latest) + [Tanstack Query](https://tanstack.com/query/latest)
- **CI/CD**: deploy on [Vercel](https://vercel.com/)
- **Git hooks**: [Husky](https://github.com/typicode/husky) + [Lint-staged](https://github.com/okonet/lint-staged)
- **Linting**: [Eslint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Validations**: [Zod](https://zod.dev/)

## Get Started (Frontend Only)

- [Back to parent documentation]()
- Move to specific app (frontend)
  ```bash
  cd yellow-taxi-irfnd/apps/frontend
  ```
- Set up environment variables in `.env` file.

  ```env
  VITE_API_URL="https://yellow-taxi-api-irfnd.vercel.app"
  VITE_DATA_STARTDATE="2014-01-01"
  VITE_DATA_ENDDATE="2014-12-01"
  ```

  You can customize `.env` file based on your needs.

- After setup env, you can back to parent project.

  ```bash
  cd ../..
  ```

## Running (Frontend Only)

- If you want to running only this project in development you can run project in this folder `yellow-taxi-irfnd/apps/frontend` and type:
  ```bash
  pnpm dev
  ```
- Open project `http://localhost:5173`.
