# Blaise-Kévin-WebServices-API

School project with [AdonisJS](https://adonisjs.com/).

J'ai fait le choix de faire un projet avec AdonisJS, car c'est le seul framework back-end JS avec lequel j'avais de l'experience (même si c'était très limité, environ 4h).
Le résulatat est donc une API fonctionnelle, mais avec un code pas parfait et des fonctionnalités manquantes (gestion du cache, pas de service pour les call à la DB, pas de query builder propre pour les filtres/tris), car manque de temps pour apprendre et appliqué le framework. Au final je suis malgré tout content du résultat, car j'ai appris beaucoup de choses sur AdonisJS et je suis content de voir que j'ai réussi à faire une API fonctionnelle en si peu de temps.

## How to run the project

First you need to install all depedancies.

### `npm install`

Next copy the '.env.example' file and rename it to '.env', edit them with your informations.
After setup the database (you need to create an empty database before run this command).

### `node ace migration:run --seed`

Finally build the app.

### `npm run dev` or `npm run build`
