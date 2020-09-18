#!/bin/bash
set -e
path=$(pwd)

# Setting up the kubeconfig
mkdir -p ~/.kube
cat $path/.kube/config > ~/.kube/config
cat $path/.kube/admin.conf > ~/.kube/config

# Booting up the Litmus-Portal Setup
kubectl apply -f https://raw.githubusercontent.com/litmuschaos/litmus/master/litmus-portal/k8s-manifest.yml
kubectl wait --for=condition=Ready pods --all -n litmus
kubectl patch svc litmusportal-frontend-service -p '{"spec": {"type": "LoadBalancer"}}' -n litmus

# Getting latest kubeconfig in cache
cat ~/.kube/config > $path/.kube/config
cat ~/.kube/config > $path/.kube/admin.conf
