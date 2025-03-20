# Step 1: Build the Next.js application

#FROM node:18 AS builder

#WORKDIR /app

#COPY package.json package-lock.json ./

#RUN npm install

#COPY . .

#RUN npm run build

# Step 2: Use Nginx to serve the built Next.js app

#FROM nginx:alpine

#WORKDIR /usr/share/nginx/html

# Copy the built Next.js files from the builder stage

#COPY --from=builder /app/.next /usr/share/nginx/html/.next

#COPY --from=builder /app/public /usr/share/nginx/html/public

#COPY --from=builder /app/package.json /usr/share/nginx/html



# Copy custom Nginx config

#COPY nginx.conf /etc/nginx/conf.d/default.conf


#EXPOSE 80

#CMD ["nginx", "-g", "daemon off;"]






# Build Stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies and install
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .
RUN npm run build

# Production Stage
FROM node:18-alpine AS runner
WORKDIR /app

# Copy standalone output from the build stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./public

# Set environment variable for Next.js to run in production
ENV NODE_ENV=production

# Expose the port
EXPOSE 3000

# Start the Next.js application
CMD ["node", "server.js"]
