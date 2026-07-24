FROM node

WORKDIR /frontend

COPY package.json /frontend/package.json
COPY package-lock.json /frontend/package-lock.json

RUN npm install

COPY . /frontend
EXPOSE 4000

# start app
CMD ["npm", "start"] 