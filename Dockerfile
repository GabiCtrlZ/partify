FROM node:12.22.1-alpine3.10

COPY . .

RUN npm run install-api \
  && npm run install-client \
  && npm run build-client

CMD ["npm", "start"]