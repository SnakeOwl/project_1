# project 1

Тут есть 2 версии сайта.
- 1-я, та, что в папке resources/. Она сделана с помощью Моста Inertia. В ней доступна рабочая админка.
- 2-я, та, что в папке React. Она сделана на чистом React и в ней нет админки.

# ----- Installing -----
## до этого вы должны были создать БД
git clone https://github.com/SnakeOwl/project_1.git toFolder

## сюда указать доступы к базе и url приложения
cp .env.example .env 

composer install
npm install
php artisan key:generate
php artisan storage:link
php artisan migrate --seed

sudo find  /var/www/project_1 -type f -exec chmod 664 {} \;     # права на файлы
sudo find  /var/www/project_1 -type d -exec chmod 775 {} \;     # права на папки
sudo chmod -R 777 storage/  # без этого лог файл не создаётся

## после этого заработает первая версия сайта
npm run build 


# ----- Installing React part -----
cd React
npm install

## тут указать урлы для первой версии сайта (вторая версия работает через API пути от первого)
/React/.env.production

## После этого работает
npm run build

### Если при перезагрузке страницы (вторая версия сайта) apache выдаёт 404, то эта конфигурация помогает
    <VirtualHost *:8080>
        ServerName example.com
        DocumentRoot /var/www/httpd/example.com

        <Directory "/var/www/httpd/example.com">
            ...

            RewriteEngine On
            # Don't rewrite files or directories
            RewriteCond %{REQUEST_FILENAME} -f [OR]
            RewriteCond %{REQUEST_FILENAME} -d
            RewriteRule ^ - [L]
            # Rewrite everything else to index.html to allow html5 state links
            RewriteRule ^ index.html [L]
        </Directory>
    </VirtualHost> 

## В папке React/dist будут скомпиленные файлы, их нужно залить на сервер (или настроить сервер для восприятия этот папки как рутовой)


# ----- Настройка APACHE -----
    https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-20-04-ru

# Настройка почты по smtp
    https://yandex.ru/support/mail/mail-clients/others.html