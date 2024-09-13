# Stage 1: Build the app with the necessary build tools
FROM node:iron-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends build-essential && rm -rf /var/lib/apt/lists/*

COPY /app/package*.json ./

RUN npm ci --only=production

COPY ./app .

# Stage 2: Run the app in a clean image without build tools
FROM node:iron-slim

WORKDIR /app

# Copy only the built app from the builder stage
COPY --from=builder /app .

# Expose the app's port
EXPOSE 5000

# Start the app
CMD ["node", "app.js"]
