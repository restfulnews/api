#!/usr/bin/env bash

mongo localhost/$MONGO_INITDB_DATABASE --authenticationDatabase admin -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --eval "db.createUser({user: '${MONGO_INITDB_ROOT_USERNAME}', pwd: '${MONGO_INITDB_ROOT_PASSWORD}', roles: [{role: 'readWrite', db: '${MONGO_INITDB_DATABASE}'}, {role: 'readWrite', db: '${MONGO_INITDB_DATABASE}'}]});"
