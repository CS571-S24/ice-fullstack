FROM node:20
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY src/. src/.

ENV MINI_BADGERCHAT_DB_LOC=/secrets/db.db

EXPOSE 53706
CMD [ "npm", "start" ]