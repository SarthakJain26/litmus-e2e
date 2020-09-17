set -e
path=$(pwd)

# Setting up cluster
cat $path/.kube/config > ~/.kube/config
cat $path/.kube/admin.conf > ~/.kube/config
cat $path/.kube/clusters > ~/logs/clusters
cat $path/.kube/zone > ~/logs/zone

# Shutting down the Litmus-Portal Setup

kubectl delete -f https://raw.githubusercontent.com/litmuschaos/litmus/master/litmus-portal/k8s-manifest.yml

cat ~/.kube/config > $path/.kube/config
cat ~/.kube/config > $path/.kube/admin.conf
cat ~/logs/clusters > $path/.kube/clusters
cat ~/logs/zone > $path/.kube/zone