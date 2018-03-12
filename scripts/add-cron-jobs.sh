# Write out current crontab
# crontab -l > mycron

function addCronJobs {
# Renew SSL
echo "Adding SSL renewal script"
echo "0 2 */15 * * /srv/restful-api/scripts/renew-ssl.sh >> /srv/restful-api/logs/renew-ssl.log 2>&1" >> mycron
# Install new cron file
crontab mycron
rm mycron
# Print user crontab
echo "${USER} crontab:"
crontab -l
}

read -r -p "Install default cron jobs (CAUTION: THIS WILL REWRITE ALL CURRENT USER'S CRON JOBS) [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
then addCronJobs;
fi
