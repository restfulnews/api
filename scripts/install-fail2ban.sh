#!/bin/bash

function installFail2Ban {
  sudo apt-get update
  sudo apt-get install -y fail2ban
}

read -r -p "Install Fail2Ban with default settings [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
then installFail2Ban;
fi
