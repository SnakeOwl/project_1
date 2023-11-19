
# Installing
    После установки указать пути к api от project_1, в файле /src/config/API_routes.json.
    
    Для запуска:
    npm run build

    Использую этого демона
    npm install pm2 -g 

    
    в папке с проектом:
    pm2 start npm --name "ShowerFrontend-nextjs" -- start
    check:
    pm2 status


    Сайт будет доступен по порту 3000 (http://89.223.123.161:3000/en/catalog)
