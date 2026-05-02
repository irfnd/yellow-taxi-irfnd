# Build context must be the monorepo root
# docker build -f apps/frontend/Dockerfile .

FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.26.0 --activate

# ---- Prune monorepo to frontend only ----
FROM base AS pruner
RUN pnpm add -g turbo@2.3.0
WORKDIR /app
COPY . .
RUN turbo prune frontend --docker

# ---- Install dependencies (cached separately for better layer caching) ----
FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# ---- Build ----
# VITE_ vars are baked into the bundle at build time — pass them as build args
FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .

ARG VITE_API_URL
ARG VITE_MAPBOX_DIRECTION_API
ARG VITE_MAPBOX_TOKEN
ARG VITE_MAPBOX_DARK_MAP
ARG VITE_MAPBOX_LIGHT_MAP
ARG VITE_DATA_STARTDATE
ARG VITE_DATA_ENDDATE

ENV VITE_API_URL=$VITE_API_URL \
    VITE_MAPBOX_DIRECTION_API=$VITE_MAPBOX_DIRECTION_API \
    VITE_MAPBOX_TOKEN=$VITE_MAPBOX_TOKEN \
    VITE_MAPBOX_DARK_MAP=$VITE_MAPBOX_DARK_MAP \
    VITE_MAPBOX_LIGHT_MAP=$VITE_MAPBOX_LIGHT_MAP \
    VITE_DATA_STARTDATE=$VITE_DATA_STARTDATE \
    VITE_DATA_ENDDATE=$VITE_DATA_ENDDATE

RUN pnpm --filter=frontend run build

# ---- Serve with nginx ----
FROM nginx:alpine AS runner
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
COPY --from=builder /app/apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
