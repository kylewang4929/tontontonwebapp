FROM node:lts-alpine3.18 AS frontend-builder
WORKDIR /app
ADD . /app/
# RUN  yarn && yarn build

FROM nginx:1.18.0-alpine
ADD ./nginx.conf.template /etc/nginx/conf.d/nginx.conf.template
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

EXPOSE 80 443

# ENTRYPOINT ["nginx", "-g","daemon off;"]
CMD ["/bin/sh", "-c", "envsubst '$API_URL' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]