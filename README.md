project 1

Тут есть 2 версии сайта.
1-я, та, что в папке resources/. Она сделана с помощью Моста Inertia. В ней доступна рабочая админка.
2-я, та, что в папке React. Она сделана на чистом React и в ней нет админки.

# ----- Installing -----
# до этого вы должны были создать БД
git clone https://github.com/SnakeOwl/project_1.git toFolder

# сюда указать доступы к базе и url приложения
cp .env.example .env 
composer install
npm install
php artisan key:generate
php artisan storage:link
php artisan migrate --seed

sudo find  /var/www/project_1 -type f -exec chmod 664 {} \; # права на файлы
sudo find  /var/www/project_1 -type d -exec chmod 775 {} \; # права на папки
sudo chmod -R 777 storage/ # без этого лог файл не создаётся
# после этого заработает первая версия сайта
npm run build 


# ----- Installing React only -----
npm create vite
cd React
npm install

npm install react-router-dom -S
npm install bootstrap@5.3.0-alpha1
npm i bootstrap-icons
npm install -S axios

npm run dev 


# ----- Публикация на сервер -----
# --- Reakt part ---
npm run build
# В папке React/dist будут скомпиленные файлы, их нужно залить на сервер


# ----- Настройка APACHE -----
https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-20-04-ru

https://youtu.be/qJq9ZMB2Was?t=9782