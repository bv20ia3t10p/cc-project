# Use a lightweight Node.js image
FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY cc-storefront/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY cc-storefront/ .

# Expose the development server port
EXPOSE 5173

# Start the Vite dev server
CMD ["npm", "run", "dev", "--host"]
