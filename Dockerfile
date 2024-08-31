# Use Node.js as the base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps

RUN apk add --no-cache libc6-compat

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

# Accept build arguments
ARG NEXT_PUBLIC_API_URL
ARG NODE_ENV
# Set environment variables
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=$NODE_ENV

RUN --mount=type=secret,id=NEXT_PUBLIC_API_URL \
    export NEXT_PUBLIC_API_URL=$(cat /run/secrets/NEXT_PUBLIC_API_URL) && \
    pnpm run build

EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]