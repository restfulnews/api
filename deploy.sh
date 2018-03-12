#!/bin/bash

# Get local env variables
source .env

: "${SENDGRID_KEY:?SENDGRID_KEY unset. Exiting.}"
: "${MASTER_KEY:?MASTER_KEY unset. Exiting.}"
: "${JWT_SECRET:?JWT_SECRET unset. Exiting.}"
: "${MONGO_DB_NAME:?MONGO_DB_NAME unset. Exiting.}"
: "${MONGO_USERNAME:?MONGO_USERNAME unset. Exiting.}"
: "${MONGO_PASSWORD:?MONGO_PASSWORD unset. Exiting.}"
: "${MONGO_CLUSTER_NAME:?MONGO_CLUSTER_NAME unset. Exiting.}"
: "${MONGO_HOSTS:?MONGO_HOSTS unset. Exiting.}"
: "${DOMAIN_NAME:?DOMAIN_NAME unset. Exiting.}"

# set name
DOCKER_TAG="restful-api"

# start working folder in repo
cd /srv/$DOCKER_TAG

# Replace Nginx conf with domain name in env
sed 's/$domain/'"${DOMAIN_NAME}"'/' ${BASH_SOURCE%/*}/nginx/src.conf > ${BASH_SOURCE%/*}/nginx/api.conf

# Rebuild
docker-compose build

# Build test environment
docker build -t $DOCKER_TAG-test -f test.Dockerfile .
docker run --rm --env-file .env $DOCKER_TAG-test
[ $? -ne 0 ] && echo "Tests did not pass. Deploy script exiting." && exit 1

# Kill previous instances
docker-compose down --remove-orphans

# Put up new instance
docker-compose up -d

# Remove unused images
docker image prune -a -f
