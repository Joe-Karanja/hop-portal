# Specify a base image
FROM node:12.0.0 as build
WORKDIR /app
COPY . .
RUN npm install
RUN node_modules/.bin/ng build --prod --output-path=dist
#stage 2
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html