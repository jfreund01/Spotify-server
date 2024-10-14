# Stage 1: Build the frontend with Node.js
FROM node:18 as build

# Set working directory for frontend
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package.json ./package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY ./ ./

# Build the frontend (this will generate production-ready files)
RUN npm run build

# Stage 2: Serve the frontend using Nginx
FROM nginx:alpine

# Copy the build files from the previous stage to Nginx's web directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3000 for the frontend
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
