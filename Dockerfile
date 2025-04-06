# Use an official Node runtime as the base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

# Expose port 8080
EXPOSE 8080

# Serve the built app
CMD ["serve", "-s", "build", "-l", "8080"]