FROM node:16.15-alpine3.14
RUN apk add chromium

RUN mkdir /app
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
CMD ["yarn","start"]