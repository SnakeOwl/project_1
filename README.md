# Shower Пример Интернет-магазина на laravel + next

# ----- Installing -----
## до этого вы должны были создать БД
composer install

## в этот файл указать доступы к базе и url приложения
cp .env.example .env 

php artisan key:generate
php artisan storage:link
## Для работы приложения нужны валюты
//todo: протестировать, я же удалил старый фронт
php artisan migrate --seed 


# Для работы с nextjs в папке frontend есть свой README
cd frontend
