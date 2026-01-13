FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json biome.json ./
COPY src ./src
COPY tests ./tests
RUN npm run build


RUN npm prune --omit=dev

ENTRYPOINT ["node", "dist/index.js"]
