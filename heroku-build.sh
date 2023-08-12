#!/bin/bash

cd server && npm run build

cd ../client

if [ "$NODE_ENV" == "production" ]; then
  npm run build:prod
else
  npm run build:staging
fi
