# Build context must be the monorepo root
# docker build -f apps/backend/Dockerfile .

FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.26.0 --activate

# ---- Prune monorepo to backend only ----
FROM base AS pruner
RUN pnpm add -g turbo@2.3.0
WORKDIR /app
COPY . .
RUN turbo prune backend --docker

# ---- Install dependencies (cached separately for better layer caching) ----
FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# ---- Build ----
FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
RUN pnpm --filter=backend exec prisma generate
RUN pnpm --filter=backend exec nest build
# Compile seed.ts to dist/seed.js for production runtime
RUN cd apps/backend && npx tsc prisma/seed.ts \
    --outDir dist \
    --module commonjs \
    --target ES2021 \
    --esModuleInterop \
    --experimentalDecorators \
    --emitDecoratorMetadata \
    --skipLibCheck \
    --moduleResolution node

# ---- Production runner ----
FROM node:20-alpine AS runner
RUN apk add --no-cache openssl
WORKDIR /app
ENV NODE_ENV=production

# In pnpm workspaces, packages live in two places:
#   /app/node_modules/.pnpm/  — the virtual store (actual package files)
#   /app/apps/backend/node_modules/ — workspace symlinks pointing into .pnpm store
# Both must be present so the symlinks resolve correctly at runtime.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json

EXPOSE 8080

# Run from the app directory so Node module resolution walks up through
# apps/backend/node_modules → ../../../node_modules/.pnpm (the .pnpm store)
# db push and seed use upsert — safe to re-run on every restart
CMD ["sh", "-c", "cd apps/backend && ./node_modules/.bin/prisma db push && node dist/seed.js && exec node dist/main"]
