#!/bin/bash
set -e
path=$(pwd)


# Booting up the Litmus-Portal 
kubectl apply -f https://raw.githubusercontent.com/litmuschaos/litmus/master/litmus-portal/k8s-manifest.yml
kubectl wait --for=condition=Ready pods --all -n litmus
kubectl patch svc litmusportal-frontend-service -p '{"spec": {"type": "LoadBalancer"}}' -n litmus

# Caching the External_IP of loadBalancer

echo "export FRONTEND_IP=$(kubectl get svc litmusportal-frontend-service -n litmus -o jsonpath="{.status.loadBalancer.ingress[0].ip}")" >> build.env
echo $FRONTEND_IP