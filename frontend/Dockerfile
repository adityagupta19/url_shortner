# Stage 1: Build the app using Node.js image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the React app for production
RUN npm run build




# Stage 2: Serve the app using an Nginx image
FROM nginx:alpine

# Copy the build files from the build stage to Nginx's default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to be able to access the app in a browser
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
