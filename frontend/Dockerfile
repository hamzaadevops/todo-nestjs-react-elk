# build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY . /app
RUN npm ci
RUN npm run build           # outputs to /app/dist

# production stage (Nginx)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
