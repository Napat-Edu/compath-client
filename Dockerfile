FROM node:18-alpine as build

ARG API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$API_BASE_URL
ENV NEXT_PUBLIC_API_CAREER_ENDPOINT=$API_CAREER_ENDPOINT

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]