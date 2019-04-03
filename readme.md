# Gulp v4 Sass BrowserSync


Configurer une construction gulp qui compilera Sass pour nous et synchronisera automatiquement toutes les modifications apportées au HTML, aux fichiers Sass lors de l'enregistrement à l'aide de BrowserSync.

Si vous venez d'une version précédente de Gulp, vous avez peut-être remarqué que la mise à niveau vers la v4 impliquait des modifications radicales, ce qui n'est jamais amusant. Au lieu de créer des tâches, nous créons maintenant des fonctions, mais à part cela, la plupart des choses sont toujours les mêmes, heureusement.

## Installation


Installez les dépendances (gulp, gulp-sass, browser-sync, gulp-autoprefixer, gulp-csscomb, gulp-cssbeautify, gulp-sourcemaps, gulp-notify)

```
$ npm install
```

## Run

Ceci surveillera vos fichiers sass, les compilera et exécutera votre serveur de développement à l' adresse http://localhost:8001/.

```
$ gulp build
```
