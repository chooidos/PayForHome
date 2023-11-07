FROM node:lts
WORKDIR /app
COPY package*.json /app/
RUN yarn install
ENV PATH /app/node_modules/.bin$PATH
COPY . /app/
EXPOSE 5001
CMD [ "yarn", "start:dev"]
#or without dependencies
# CMD [ "nodemon","app.js"]