
# Installing
После установки указать пути к api, в файле /src/config/API_routes.json.

npm install
npm run build

## Для раздачи на сервере можно использовать этого демона
npm install pm2 -g 

todo: придумать как по другому запускать на сервере. А то этот способ сбрасывается каждый раз, после рестарта сервера.
pm2 start npm --name "ShowerFrontend" -- start

check:
pm2 status

