docker run --rm \
      -v platformapi_certs:/etc/letsencrypt \
      -v platformapi_certs-data:/data/letsencrypt \
      -v /var/log/letsencrypt/:/var/log/letsencrypt/ \
      deliverous/certbot \
      renew \
      --webroot --webroot-path=/data/letsencrypt
docker restart platformapi_nginx_1
