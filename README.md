Reactive movies
=====================

Movie search site that uses [OMDb API](http://omdbapi.com/) to get movies from IMDb database.

### Technologies

* React
* Toast Grid
* Sass
* webpack

### Usage

```
git clone https://github.com/henrikra/reactive-movies
cd reactive-movies
npm install
(
apiKey process
  1. go to omdb and get an apikey
  2. go inside this project, find folder named src
  3. inside src folder create a file named apiKey.js
  4. write "export const apiKey = 'API_KEY';" inside the file. With your personal apikey replacing the word API_KEY.
)
npm start
open http://localhost:3000
```