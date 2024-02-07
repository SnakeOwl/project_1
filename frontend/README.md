
# Installing
После установки указать пути для .env
в next.config.js указать remotePatterns для картинок


npm install
npm run build


## Для раздачи на сервере можно использовать этого демона
npm install pm2 -g 

todo: перенести этот функционал на Docker
pm2 start npm --name "ShowerFrontend" -- start

check:
pm2 status

