#!/usr/bin/bash
. /home/user/.keychain/risk-manager-dev-ubuntu-sh
cd /var/www/app/
git pull origin main --ff-only

npm i