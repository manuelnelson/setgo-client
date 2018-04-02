# THIS IS DEVELOPMENT DOCKER FILE.  PRODUCTION DOCKER FILE IS IN ROOT
FROM node:9.5.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY .eslintrc.js .

RUN curl -sS http://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - 
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install yarn

COPY ./ /usr/src/app/

RUN yarn install
RUN yarn build

ENV HOST 0.0.0.0

EXPOSE 3005

CMD ["yarn", "run", "start"]