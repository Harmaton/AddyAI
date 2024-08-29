# Use Node.js as the base image
FROM node:18.17.0-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# Accept build arguments
ARG NEXT_PUBLIC_API_URL
ARG NODE_ENV

# Set environment variables
ENV NEXT_PUBLIC_API_URL=$API_URL
ENV NODE_ENV=$NODE_ENV


EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]