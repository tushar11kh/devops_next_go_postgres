# ---------- Builder ----------
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---------- Distroless Runner ----------
FROM gcr.io/distroless/nodejs18:nonroot AS runner

WORKDIR /app

# Copy prod dependencies only
COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy built Next.js assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
