
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

# # Copy standalone output from the build stage
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./public


COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/.next/static ./.next/static  
COPY --from=builder /app/public ./public  



# Set environment variable for Next.js to run in production
ENV NODE_ENV=production

# Expose the port
EXPOSE 3000

# Start the Next.js application
CMD ["node", "server.js"]






# # Build Stage
# FROM node:18-alpine AS builder
# WORKDIR /app

# # Copy dependencies and install
# COPY package.json package-lock.json ./
# RUN npm install

# # Copy the rest of the application files
# COPY . . 
# RUN npm run build

# # Production Stage
# FROM node:18-alpine AS runner
# WORKDIR /app

# # Copy the Next.js build output from the builder stage
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.env ./.env

# # Set environment variable for Next.js to run in production
# ENV NODE_ENV=production


# # Expose the port
# EXPOSE 3000

# # Start the Next.js application
# CMD ["node", "server.js"]
