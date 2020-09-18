#!/bin/bash
set -e
path=$(pwd)

# Setting up the kubeconfig
mkdir -p ~/.kube
cat $path/.kube/config > ~/.kube/config
cat $path/.kube/admin.conf > ~/.kube/config

# Booting up the Litmus-Portal Setup
kubectl apply -f https://raw.githubusercontent.com/litmuschaos/litmus/master/litmus-portal/k8s-manifest.yml
kubectl patch svc litmusportal-frontend-service -p '{"spec": {"type": "LoadBalancer"}}' -n litmus
kubectl wait --for=condition=Ready pods --all --namespace litmus --timeout=120s

# Getting latest kubeconfig in cache
cat ~/.kube/config > $path/.kube/config
cat ~/.kube/config > $path/.kube/admin.conf

# Caching the External_IP of loadBalancer in Environment Variable for Testing
FRONTEND_IP=$(kubectl get svc litmusportal-frontend-service -n litmus -o jsonpath="{.status.loadBalancer.ingress[0].ip}")
echo $FRONTEND_IP
echo "FRONTEND_IP=$FRONTEND_IP" >> Portal-Setup.env