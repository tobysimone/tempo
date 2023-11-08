FROM node
WORKDIR /tempo
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run dev