# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 — Builder
# Uses Node to install dependencies and run `vite build`.
# Produces the static files in /app/dist — nothing else goes to prod.
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first so npm install is cached as a layer.
# Only re-runs when package.json or package-lock.json changes.
COPY package.json package-lock.json ./
RUN npm ci --silent

# Copy source files
COPY . .

# VITE_API_URL is baked into the JS bundle at build time.
# Pass it as a build arg so you can override it per environment:
#   docker build --build-arg VITE_API_URL=https://api.mysite.com .
ARG VITE_API_URL=http://localhost:4546
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 — Runtime (Nginx)
# Serves the compiled static files. ~25MB total image.
# Handles React Router (client-side routing) via try_files fallback.
# ─────────────────────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine

# Remove the default Nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom Nginx config: handles React Router + gzip + caching headers
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
