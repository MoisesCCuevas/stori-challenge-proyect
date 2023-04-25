FROM node:18.9.0
WORKDIR /usr/src/app/front
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]