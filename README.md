# Shower Пример Интернет-магазина на laravel + next

Тут есть 2 версии сайта.
- 1-я, та, что в папке resources/. Она сделана с помощью Моста Inertia. В ней доступна рабочая админка.
- 2-я, та, что в папке frontend. Она пока ещё в разработке.

# ----- Installing -----
## до этого вы должны были создать БД
composer install

## в этот файл указать доступы к базе и url приложения
cp .env.example .env 

php artisan key:generate
php artisan storage:link
## Для работы приложения нужны валюты
php artisan migrate --seed 


### если есть ошибка с доступом к файлам
sudo find  /var/www/project_1 -type f -exec chmod 664 {} \;     # права на файлы
sudo find  /var/www/project_1 -type d -exec chmod 775 {} \;     # права на папки
sudo chmod -R 777 storage/  # без этого лог файл не создаётся

## frontend на Inertia
npm install
npm run build 

## после этого заработает первая версия сайта


# Для работы с nextjs в папке frontend есть свой README
cd frontend


# Настройка APACHE
    https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-20-04-ru

# Настройка почты по smtp
    https://yandex.ru/support/mail/mail-clients/others.html