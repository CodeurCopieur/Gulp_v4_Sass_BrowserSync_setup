const gulp = require('gulp');
      sass = require('gulp-sass');
      autoprefixer = require('gulp-autoprefixer');
      notify = require('gulp-notify');
      csscomb = require('gulp-csscomb');
      cssbeautify = require('gulp-cssbeautify');
      sourcemaps = require('gulp-sourcemaps');
      browserSync = require('browser-sync').create();

const paths = {
    html : {
        dest: 'build/*.html'
    },
    css: {
        src : ['./src/scss/**/*.scss'],
        dest : 'build/assets/css'
    }
}


//compiler scss en css
function style(){
    //où est mon fichier scss
    return gulp.src(paths.css.src)
    /* ici les plugins Gulp à executer */
    .pipe(sourcemaps.init())
    //passer ce fichier par le compilateur sass
    .pipe(sass().on('error', sass.logError))
    //Réordonner les propriétés
    .pipe(csscomb())
    //Ajouter automatiquement les préfixes CSS3
    .pipe(autoprefixer('last 2 version', '> 1%', 'ie 9', 'ie 8'))
    .on("error", notify.onError({
        title: "stile"
    }))
    //Ré-indenter et reformater 
    .pipe(cssbeautify({indent: '  '}))
    //Où puis-je sauvegarder le scss compilé ?
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css.dest))
    //transférer les modifications sur tous les navigateurs
    .pipe(browserSync.stream());
}

const build = gulp.series(gulp.parallel(style, watch));

// Watch Sass & Serve
function watch() {
    browserSync.init({
        server: {
            baseDir: './build'
        },
        notify: true,
        port: 8001

    });
    gulp.watch(paths.css.src, style);
    gulp.watch(paths.html.dest).on('change', browserSync.reload);
}

exports.style = style;
exports.build = build;
exports.watch = watch;

gulp.task('default', build);