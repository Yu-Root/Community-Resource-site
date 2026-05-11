FROM docker.m.daocloud.io/node:18-alpine AS build-stage

WORKDIR /app

COPY Community-Resource-site/ ./

RUN cd frontend && npm install --registry=https://registry.npmmirror.com && npm run build

FROM docker.m.daocloud.io/node:18-alpine

WORKDIR /app

COPY --from=build-stage /app/backend ./backend
COPY --from=build-stage /app/frontend/dist ./frontend/dist

RUN cd backend && npm install --only=production --registry=https://registry.npmmirror.com

EXPOSE 3001

WORKDIR /app/backend

CMD ["npm", "start"]
