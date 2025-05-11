FROM node:20


RUN apt-get update && apt-get install -y \
    python3 make g++ libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install --include=optional

COPY . .

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "develop"]
