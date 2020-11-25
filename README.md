## Keep Up

An application to keep track of workout and find your gym buddies!

## Set Up
This project requires the system to have install [laravel](https://laravel.com/), [php](https://www.php.net/), and [mysql](https://www.mysql.com/). Please visit their website for installation.

- Clone down the repo
- run ``composer install`` and ``npm install`` to install the dependency packages

Laravel/Passport Set up
- create a new file call .env and copy everything from .env.example
- run ``php artisan passport:install`` to generate oauth keys for laravel passport authentication
- run ``php artisan passport:client --password`` to generate CLIENT_ID and CLIENT_SECRET
- create two new variable at the end of .env CLIENT_ID and CLIENT_SECRET and paste the keys you just generated respectively

Database Set Up
- create mysql database with the name "keepup" (make sure .env files DB_DATABASE=keepup)
- run ``php artisan migrate`` to create tables in the database
- run ``php artisan migrate:fresh --seed`` to seed the database

- run ``npm run start-dev`` to start the application on [localhost:8000](http://localhost:8000)


## Tech Stack
Front End
- [React](https://reactjs.org/)
- [React-Redux](https://react-redux.js.org/)
- [Material-UI](https://material-ui.com/)

Back End
- [Laravel](https://laravel.com/)
- [PHP](https://www.php.net)
- [MySql](https://www.mysql.com/)

## Deployment
The project currently host in the heroku. Please visit [https://keepupfsa.herokuapp.com/](https://keepupfsa.herokuapp.com).
