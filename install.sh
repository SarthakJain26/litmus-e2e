#!/bin/bash

echo "Installing micro-k8s ..................................................."
sudo snap install microk8s --classic

echo "Waiting for resources to be ready ......................................"
sudo microk8s status --wait-ready

echo "Enabling the kubectl dashboard ........................................."
sudo microk8s enable dashboard

echo "Making the mkctl as an alias for using kubectl with microk8s............"
alias mkctl="microk8s kubectl"

echo "Starting Microk8s locally for testing .................................."
microk8s start