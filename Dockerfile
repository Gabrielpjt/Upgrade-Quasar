# develop stage
FROM node:14.15-alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm i -g @quasar/cli
RUN #quasar ext add @quasar/qmediaplayer
COPY . .

# build stage
FROM develop-stage as build-stage
RUN npm i
RUN quasar build -m pwa

# production stage
FROM nginx:1.17.5-alpine as production-stage
#COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
COPY --from=build-stage /app/dist/pwa /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
