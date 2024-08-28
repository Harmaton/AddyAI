FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm ci --only=production

RUN pnpm run build

EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]