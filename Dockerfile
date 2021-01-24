FROM node:lts-alpine
WORKDIR /app
ADD ./ /app
RUN npm install
COPY . .
ENV NODE_ENV_VIM_INTERFACE_SERVER_PORT 3000
ENV NODE_ENV_VIM_INTERFACE_SERVER_CACHE_AGE_IN_HOURS 0
ENV NODE_ENV production
RUN npm run build
EXPOSE 3000
CMD ["node","dist/server.js"]