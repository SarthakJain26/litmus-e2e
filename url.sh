#!/bin/bash

# Caching the External_IP of loadBalancer in Environment Variable for Testing
export FRONTEND_IP=$(kubectl get svc litmusportal-frontend-service -n litmus -o jsonpath="{.status.loadBalancer.ingress[0].ip}")
echo $FRONTEND_IP