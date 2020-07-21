FROM node:12-slim
RUN mkdir -p usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN yarn
EXPOSE 3000
ENV API_BASEURL='http://localhost:8080'
CMD ["yarn", "start"]