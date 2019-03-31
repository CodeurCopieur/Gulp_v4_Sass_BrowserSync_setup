const gulp = require('gulp');
      sass = require('gulp-sass');
      autoprefixer = require('gulp-autoprefixer');
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
    //passer ce fichier par le compilateur sass
    .pipe(sass({
        'include css': true
    }).on('error', sass.logError))
    //Ajouter automatiquement les préfixes CSS3
    .pipe(autoprefixer("last 2 versions", "> 1%", "Explorer 7", "Android 2"))
    //Où puis-je sauvegarder le scss compilé ?
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