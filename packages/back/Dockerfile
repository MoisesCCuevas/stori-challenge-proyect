FROM node:18.9.0
WORKDIR /usr/src/app/back
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]