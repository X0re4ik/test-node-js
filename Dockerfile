# FROM node:21-alpine

# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# WORKDIR /home/node/app

# COPY package*.json ./

# USER node

# RUN npm install

# COPY --chown=node:node . .

# EXPOSE 3000

# CMD [ "node", "src/app.js" ]




FROM node:lts-alpine
ENV HOME=/home/node/app
ENV NODE_ENV=production
ENV NODE_PORT=3000

RUN mkdir -p $HOME && chown -R node:node $HOME
WORKDIR $HOME
USER node

COPY --chown=node:node package.json $HOME/

RUN npm install && npm cache clean --force

COPY --chown=node:node . .

EXPOSE $NODE_PORT

CMD [ "node", "src/app.js" ]