FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf 
COPY dist/untitled1 /usr/share/nginx/html
EXPOSE 80