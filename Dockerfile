FROM node:20-alpine3.18 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

ENV DATABASE_URL="postgresql://postgres:Hellomyfriend@focus-property-fe-rds.crmyeocekssj.ap-southeast-1.rds.amazonaws.com:5432/focus??sslmode=no-verify&schema=public"
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm install -g pnpm
RUN pnpm install
RUN npm run build
EXPOSE 3000
CMD [ "npm","run","start" ]