#!/bin/bash

echo "Stopping the microk8s cluster ......................................"
microk8s stop

echo "Removing the microk8s .................................."
sudo snap remove microk8s