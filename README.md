# BackUp is a backend application to serve the api calls from KeepUp (the front end application)

## Set Up
This project requires the system to have install [laravel](https://laravel.com/), [php](https://www.php.net/), and [mysql](https://www.mysql.com/)
- create mysql database with the name "keepup" (make sure .env files DB_DATABASE=keepup)
- run ``php artisan migrate`` to create tables in the database
- run ``php artisan serve`` to start the server on localhost: 8000

It require the frontend [KeepUp](https://github.com/FoodieFSA/keepup). Please go to the repo for frontend setup


