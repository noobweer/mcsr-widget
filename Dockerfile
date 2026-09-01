# Stage 1: Build frontend with Bun
FROM oven/bun:alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* bun.lockb* bun.lock* ./
RUN bun install --frozen-lockfile || bun install

COPY . .
RUN bun run build

# Stage 2: Serve with Caddy
FROM caddy:alpine AS production
COPY --from=builder /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
