# Use Node.js as the base image
FROM node:18.17.0-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# Get environment variables
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

ARG API_URL
ENV API_URL=${API_URL}


EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]