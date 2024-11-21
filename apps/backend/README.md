# Yellow Taxi (Backend)

A backend implementation for Yellow Taxi Analytics Dashboard using [NestJS](https://nestjs.com/)

## Demo

[![NestJS](https://img.shields.io/badge/open%20backend-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://yellow-taxi-api-irfnd.vercel.app/docs)

Demo account

email: `admin@mail.com` pass: `YellowTaxi@2024`

## Features

- **Backend**: [NestJS](https://nestjs.com/) + [TypeScript](https://www.typescriptlang.org/)
- **CORS**: Cross-Origin Resource-Sharing enabled using [Cors](https://github.com/expressjs/cors)
- **Database**: using [Neon PostgreSQL](https://neon.tech/) + [Prisma](https://www.prisma.io)
- **API Documentation**: using [Scalar Docs](https://scalar.com/)
- **CI/CD**: deploy on [Vercel](https://vercel.com/)
- **Git hooks**: with [Husky](https://github.com/typicode/husky) and [Lint-staged](https://github.com/okonet/lint-staged)
- **Linting**: with [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/)

## Get Started (Backend Only)

- [Back to parent documentation]()
- Move to specific app (backend)
  ```bash
  cd yellow-taxi-irfnd/apps/backend
  ```
- Set up environment variables in `.env` file.

  ```env
  # Server
  PORT=8080
  URL="https://yellow-taxi-api-irfnd.vercel.app"

  # Data
  DATABASE_URL="postgresql://yellowtaxi_owner:iO1eBGx7VKQn@ep-ancient-glade-a1arn6f5-pooler.ap-southeast-1.aws.neon.tech/yellow-taxi?sslmode=require"
  DATASET_URL="https://data.cityofnewyork.us/resource"

  # JWT
  JWT_SECRET="$argon2i$v=19$m=16,t=2,p=1$eGFpRUJRaXV4QU5aWmxmSA$r7waUANeMUuMJITv+xwdGQ"
  JWT_EXPIRES_IN="1d"
  ```

  You can customize `.env` file based on your needs.

- Setup Database

  If you use your local database you can setup your database by following this step:

  ```bash
  pnpm prisma generate
  pnpm prisma db push
  pnpm prisma db seed
  ```

  otherwise, you can just type:

  ```bash
  pnpm prisma generate
  ```

- After setup env, you can back to parent project.

  ```bash
  cd ../..
  ```

- [See Frontend documentation]()

## Running (Backend Only)

- If you want to running only this project in development you can run project in this folder `yellow-taxi-irfnd/apps/backend` and type:
  ```bash
  pnpm dev
  ```
- Open `http://localhost:8080/docs` to see API documentation.
