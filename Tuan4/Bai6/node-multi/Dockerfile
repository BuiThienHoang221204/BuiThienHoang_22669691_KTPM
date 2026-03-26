# ===== Stage 1: Build =====
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ===== Stage 2: Run =====
FROM node:18-alpine

WORKDIR /app

# copy từ stage build
COPY --from=build /app .

EXPOSE 3000

CMD ["node", "app.js"]