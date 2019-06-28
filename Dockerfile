FROM node:carbon

WORKDIR /usr/src/app

COPY . .

RUN npm install -g serve@7.1.1
RUN yarn
# RUN yarn build

EXPOSE 8080
CMD [ "yarn", "production" ]
