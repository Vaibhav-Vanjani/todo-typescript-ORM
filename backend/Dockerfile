# Stage 1: Build TypeScript
FROM node:22 AS builder
WORKDIR /backend

# Copy package files
COPY package*.json tsconfig.json ./
COPY prisma ./prisma

# Install ALL dependencies (including Prisma CLI)
RUN npm ci

# Copy source
COPY src ./src
COPY .env ./


# Build TypeScript
RUN npx tsc -b

# Stage 2: Production (slim)
FROM node:22-slim
WORKDIR /app

# Install OpenSSL (required for Prisma engine)
RUN apt-get update && \
    apt-get install -y openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copy package files
COPY --from=builder /backend/package*.json ./
COPY --from=builder /backend/prisma ./prisma

# Install only production deps (includes @prisma/client)
RUN npm ci --omit=dev

# Copy compiled JS
COPY --from=builder /backend/dist ./dist
COPY --from=builder /backend/.env ./

# Generate Prisma client IN THE FINAL IMAGE
# This ensures the correct .so.node binary for debian-openssl-3.0.x
RUN npx prisma generate

# Optional: Verify binary exists
RUN ls -la node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "dist/index.js"]