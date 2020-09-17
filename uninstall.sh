set -e
path=$(pwd)

# Setting up kubeconfig
cat $path/.kube/config > ~/.kube/config
cat $path/.kube/admin.conf > ~/.kube/config

# Shutting down the Litmus-Portal Setup
kubectl delete -f https://raw.githubusercontent.com/litmuschaos/litmus/master/litmus-portal/k8s-manifest.yml

# Caching the kubeconfig
cat ~/.kube/config > $path/.kube/config
cat ~/.kube/config > $path/.kube/admin.conf