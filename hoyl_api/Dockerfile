###############################################################################
###############################################################################
##                      _______ _____ ______ _____                           ##
##                     |__   __/ ____|  ____|  __ \                          ##
##                        | | | (___ | |__  | |  | |                         ##
##                        | |  \___ \|  __| | |  | |                         ##
##                        | |  ____) | |____| |__| |                         ##
##                        |_| |_____/|______|_____/                          ##
##                                                                           ##
## description     : Dockerfile for TsED Application                         ##
## author          : TsED team                                               ##
## date            : 2022-03-05                                              ##
## version         : 2.0                                                     ##
##                                                                           ##
###############################################################################
###############################################################################
ARG NODE_VERSION=18.17.0

# Stage 1: Build
FROM node:${NODE_VERSION}-alpine as build
WORKDIR /usr/src/app

# Copy the necessary files first to install dependencies
COPY ./package.json ./yarn.lock ./tsconfig.json ./tsconfig.compile.json ./.barrelsby.json ./.barrelsby.repositories.json ./

# Install dependencies
RUN yarn install --pure-lockfile

# Now copy the source files (which includes the Prisma schema)
COPY ./src ./src
COPY ./prisma ./prisma

# Set the environment variable for DATABASE_URL (required for prisma generate)
ENV DATABASE_URL=postgres://postgres:postgres@db:5432/mydb

# Generate Prisma Client
RUN yarn prisma generate

# Debug: Check if Prisma Client was generated
RUN ls -la node_modules/@prisma/client

# Stage 2: Runtime
FROM node:${NODE_VERSION}-alpine as runtime
WORKDIR /usr/src/app

RUN apk update && apk add build-base git curl
RUN npm install -g pm2

# Copy the build artifacts from the build stage
COPY --from=build /usr/src/app /usr/src/app

# Expose port and set environment variables
COPY processes.config.js .

EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production

ENV DATABASE_URL=postgres://postgres:postgres@db:5432/mydb

# Run Prisma migrations before starting the application
#RUN yarn prisma migrate deploy

CMD [ "yarn", "start" ]
