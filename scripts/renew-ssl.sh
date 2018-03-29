docker run --rm \
      -v restfulnews_certs:/etc/letsencrypt \
      -v restfulnews_certs-data:/data/letsencrypt \
      -v /var/log/letsencrypt/:/var/log/letsencrypt/ \
      deliverous/certbot \
      renew \
      --webroot --webroot-path=/data/letsencrypt
docker restart restfulnews_nginx_1
