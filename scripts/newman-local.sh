#!/usr/bin/env bash

export REQRES_API_KEY=$(grep "^REQRES_API_KEY" .env | cut -d '=' -f2 | tr -d '\r')
export STRIPE_SECRET_KEY=$(grep "^STRIPE_SECRET_KEY" .env | cut -d '=' -f2 | tr -d '\r')

echo "Running ReqRes collection..."
newman run postman/collections/ReqRes.postman_collection.json \
  -e postman/environments/ReqRes.postman_environment.ci.json \
  --env-var "api_key=$REQRES_API_KEY" \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export reports/newman/reqres-report.html

echo "Running Stripe collection..."
newman run postman/collections/Stripe.postman_collection.json \
  -e postman/environments/Stripe.postman_environment.ci.json \
  --env-var "secret_key=$STRIPE_SECRET_KEY" \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export reports/newman/stripe-report.html