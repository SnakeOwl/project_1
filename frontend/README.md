
# Installing
После установки указать пути к api, в файле /src/config/API_routes.json.

npm install
npm run build

## Для раздачи на сервере можно использовать этого демона
npm install pm2 -g 

в папке с проектом:
pm2 start npm --name "ShowerFrontend-nextjs" -- start

check:
pm2 status

