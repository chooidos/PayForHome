FROM node:lts

WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn install
COPY . /app/
EXPOSE 3001
CMD [ "yarn", "start"]