FROM node:18-slim

# Bundle app source
COPY package*.json ./
COPY ./index.js ./index.js

# Install app dependencies
RUN npm install

# Expose port for REST API
EXPOSE 3000

# Start server
CMD [ "node", "index.js"]