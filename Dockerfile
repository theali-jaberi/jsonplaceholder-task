FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies (development deps included for building)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build Next.js (outputs standalone server in .next/standalone)
RUN npm run build

# Production image
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Copy only the minimal runtime artifacts
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]

