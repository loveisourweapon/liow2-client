# Stage 1: Build the Angular application
FROM mhart/alpine-node:8 AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build:prod

# Stage 2: Serve the static files with NGINX
FROM nginx:alpine

# Copy the built Angular application to the NGINX default static file location
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a custom NGINX configuration (optional, but recommended for Angular routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for NGINX
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
