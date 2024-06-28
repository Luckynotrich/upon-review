#!/bin/bash
# buildfur.sh builds upon-review
# removes old index-*.* files from ur-backend/dist
# copies new index-*.* files from upon-review/dist/assets to ur-backend/dist/assets
# copies new index.html from upon-review/dist to ur-backend/dist/

errorlog=./build_error_log.log
problems(){
if [ $? -ne 0 ]
then
    echo "There were problems with $1!"
    exit 1
    else echo "$1 ran with no problems"
fi
}
clear
npm run build 2>>$errorlog
problems "build"

rm ../ur-backend/dist/assets/index-*.* 2>>$errorlog
problems "rm index-*.*"

cp ./dist/assets/index-*.* ../ur-backend/dist/assets/. 2>>$errorlog
problems "cp index*.*"

rm ../ur-backend/dist/index.html 2>>$errorlog
problems "rm index.html"

cp ./dist/index.html ../ur-backend/dist/. 2>>$errorlog
problems "cp index.html"

ls -Rl ../ur-backend/dist/.



