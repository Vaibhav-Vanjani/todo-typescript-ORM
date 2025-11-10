# Stage 1: Build
FROM node:22 AS builder

WORKDIR /app

# Copy package.json and lockfile
COPY package* .

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build production assets
RUN npm run build

# Stage 2: Serve with lightweight server
FROM node:22-slim

WORKDIR /app

# Install a static server
RUN npm install -g serve

# Copy the built files from builder
COPY --from=builder /app/dist ./dist

# Expose default port
EXPOSE 4173

# Start the server
CMD ["serve", "-s", "dist", "-l", "4173"]
