# Fetching the latest node image on apline linux
FROM node:18-alpine AS build-stage

# Declaring env
ENV VITE_BASE_URL http://localhost

# Setting up the work directory
WORKDIR /app

# Setting up the work directory
COPY ./package.json ./yarn.lock ./
RUN yarn

# Copying all the files in our project
COPY . .

# Building our application
RUN yarn build

# Fetching the latest nginx image
FROM nginx:1.25.2-alpine AS production-stage

# Copying built assets from builder
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]