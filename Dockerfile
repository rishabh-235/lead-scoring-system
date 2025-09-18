# Use Node.js LTS version
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies required for production
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Set Node environment
ENV NODE_ENV=production

# Expose application port
EXPOSE 5000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:5000/health || exit 1

# Start the application
CMD ["npm", "start"]