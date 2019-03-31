const gulp = require('gulp');
      sass = require('gulp-sass');
      autoprefixer = require('gulp-autoprefixer');
      csscomb = require('gulp-csscomb');
      cssbeautify = require('gulp-cssbeautify');
      notify = require('gulp-notify');
      plumberNotifier = require('gulp-plumber-notifier');
      sourcemaps = require('gulp-sourcemaps');
      browserSync = require('browser-sync').create();

const paths = {
    html : {
        dest: 'build/*.html'
    },
    css: {
        src : 'src/scss/**/*.scss',
        dest : 'build/assets/css'
    }
}


//compiler scss en css
function style(){
    //où est mon fichier scss
    return gulp.src(paths.css.src)
    //
    .pipe(sourcemaps.init())
    //passer ce fichier par le compilateur sass
    .pipe(sass({
        'include css': true
    }).on('error', sass.logError))
    //Réordonner les propriétés
    .pipe(csscomb())
    //Ajouter automatiquement les préfixes CSS3
    .pipe(autoprefixer("last 2 versions", "> 1%", "Explorer 7", "Android 2", "Android 2.3",
    "Android >= 4",
    "Chrome >= 20",
    "Firefox >= 24", // Firefox 24 is the latest ESR
    "Explorer >= 8",
    "iOS >= 6",
    "Opera >= 12",
    "Safari >= 6"))
    //Ré-indenter et reformater 
    .pipe(cssbeautify({indent: '  '}))
    .pipe(plumberNotifier())
    .on('error', notify.onError(function (error) {
        return {
            title: 'Stylus',
            message: error.message
        };
    }))
    //Où puis-je sauvegarder le scss compilé ?
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css.dest))
    //transférer les modifications sur tous les navigateurs
    .pipe(browserSync.stream());
}

// Watch Sass & Serve
function watch() {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });
    gulp.watch(paths.css.src, style);
    gulp.watch(paths.html.dest).on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;