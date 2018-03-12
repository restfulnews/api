FROM node:latest

# Establish environment variables
ENV HOME=/home/me

# Create non-root user
RUN useradd --user-group --create-home --shell /bin/false me \
	&& mkdir $HOME/app

# Install dependencies
COPY ./package.json $HOME/app/
RUN cd $HOME/app/ \
	&& npm install --production

# Copy app to image
COPY . $HOME/app/
RUN cd $HOME/app/

# Allow global npm installs
RUN chown -R me:me $(npm config get prefix)/lib/node_modules && \
  chown -R me:me $(npm config get prefix)/bin && \
  chown -R me:me $(npm config get prefix)/share

# Add log directory and set home folder permissions
# Our npm files are owned by root user
# TODO: Target only files we need, chowing everything is slow!
RUN mkdir $HOME/restful-api/ && chown -R me:me $HOME/

# Update work directory and switch to user
USER me
WORKDIR $HOME/app/

# Add pm2 logging with current user (necessary)
RUN npm i -g pm2 \
  pm2 install pm2-logrotate

# PM2 logrotate settings can be managed here if needed (see pm2-logrotate docs)
CMD [ "npm", "run", "production" ]
