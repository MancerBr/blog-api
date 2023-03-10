FROM node:18-alpine As development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app/blog-api
COPY . .
RUN npm ci --legacy-peer-deps
RUN npm run build

EXPOSE 3000

USER node
CMD ["npm", "run", "start:dev"]
