#!/bin/bash
# Install latest Docker for Ubuntu 16.04 following official instructions
# https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#install-using-the-repository

DOCKER_VERSION=docker-ce=17.09.1~ce-0~ubuntu

function installDocker {
  sudo apt-get update
  sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) \
    stable"
  sudo apt-get update
  sudo apt-get install $DOCKER_VERSION
}

function addUserToDockerGroup {
  # Create docker group
  sudo groupadd docker
  sudo usermod -a -G docker $USER
}

# Install Docker-compose
function installDockerCompose {
  sudo curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
}

read -r -p "Install ${DOCKER_VERSION}? [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
then installDocker;
fi

read -r -p "Install Docker Compose? [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
then installDockerCompose;
fi

read -r -p "Add current user (${USER}) to Docker group? [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
then addUserToDockerGroup;
fi
