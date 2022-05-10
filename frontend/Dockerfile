FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY ./ .
RUN yarn run build

FROM nginx:1.21.6 as production
RUN mkdir /app
COPY --from=build /app/dist /usr/share/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# COPY ./config/nginx.conf /etc/nginx/nginx.conf