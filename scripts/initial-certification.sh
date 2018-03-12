#!/bin/bash
source ../.env

function initCert {
  # Replace Nginx conf with domain name in env
  sed 's/$domain/'"${DOMAIN_NAME}"'/' ${BASH_SOURCE%/*}/ssl-setup/src.conf > ${BASH_SOURCE%/*}/ssl-setup/ssl.conf

  # Build Nginx server to serve ssl
  docker build -t nginx-ssl ${BASH_SOURCE%/*}/ssl-setup

  # Run Nginx container to serve ssl
  docker run --rm -d \
        -v platformapi_certs:/etc/letsencrypt \
        -v platformapi_certs-data:/data/letsencrypt \
        --name nginx-ssl \
        -p 80:80 \
        nginx-ssl

  # Run certbot with same volumes to generate SSL
  docker run -it --rm \
        -v platformapi_certs:/etc/letsencrypt \
        -v platformapi_certs-data:/data/letsencrypt \
        deliverous/certbot \
        certonly \
        --webroot --webroot-path=/data/letsencrypt \
        -d $DOMAIN_NAME

  # Stop Nginx container
  docker stop nginx-ssl
}

read -r -p "Do you want to generate a new Let's Encrypt SSL certificate for ${DOMAIN_NAME}? [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
then initCert;
fi
