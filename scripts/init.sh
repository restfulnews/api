#!/bin/bash
# Init Platform API server

${BASH_SOURCE%/*}/add-cron-jobs.sh
${BASH_SOURCE%/*}/install-fail2ban.sh
${BASH_SOURCE%/*}/install-docker.sh
${BASH_SOURCE%/*}./initial-certification.sh
${BASH_SOURCE%/*}/../deploy.sh
