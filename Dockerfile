# Use Node.js as the base image
FROM node:18.17.0-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]