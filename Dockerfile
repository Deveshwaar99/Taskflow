FROM node:17-alpine

WORKDIR /app

COPY . .

RUN   npm install

EXPOSE 3000

# ENTRYPOINT ["cross-env", "env-cmd", "-f", "./env"]
CMD ["npm", "start"]