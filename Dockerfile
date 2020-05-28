 
FROM node:lts
# Create app directory
WORKDIR /usr/src/app
# Copy app dependencies
COPY package*.json ./
# Install app
RUN npm install
# Copy code base
COPY . .
# Start app

CMD [ "npm", "run", "dev" ]