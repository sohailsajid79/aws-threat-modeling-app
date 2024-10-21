# build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile --production=false

COPY . .

RUN yarn build

# production stage
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/build ./build

RUN yarn global add serve

EXPOSE 3000

CMD ["serve", "-s", "build"]