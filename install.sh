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
kubectl wait --for=condition=Ready pods --all --namespace litmus --timeout=180s

echo "Pods Running in Litmus Namespace"
kubectl get pods -n litmus

echo "Services Running in Litmus Namespace"
kubectl get svc -n litmus

# Getting latest kubeconfig in cache
cat ~/.kube/config > $path/.kube/config
cat ~/.kube/config > $path/.kube/admin.conf

external_ip=""; 
while [ -z $external_ip ]; 
do echo "Waiting for end point..."; 
external_ip=$(kubectl get svc litmusportal-frontend-service -n litmus --template="{{range .status.loadBalancer.ingress}}{{.ip}}{{end}}"); 
[ -z "$external_ip" ] && sleep 10; 
done; 
echo "End point is ready-" && echo $external_ip; 

# Caching the External_IP of loadBalancer in Environment Variable for Testing
# FRONTEND_IP=$(kubectl get svc litmusportal-frontend-service -n litmus -o jsonpath="{.status.loadBalancer.ingress[0].ip}")
# echo $FRONTEND_IP
echo "FRONTEND_IP=$external_ip" >> Portal-Setup.env