const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');


// Compilando o sass
function compilaSass() {
    return gulp.src('scss/*.scss')
    // Comprime os arquivos do scss
    .pipe(sass({outputStyle: 'compressed'}))
    // Autoprefixer para funcionar em todos os navegadores
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
    }))
    // Joga os arquivos minificados dentro da pasta css
    .pipe(gulp.dest('css/'))
    // Injeta css diretamente no html para evitar ficar dando refresh na página do browser
    .pipe(browserSync.stream());
}

// Tarefa do sass
gulp.task('sass', compilaSass);

// Adicionando bibliotecas css externas no projeto.
function pluginsCSS() {
    return gulp
    .src('css/lib/*.css')
    .pipe(concat('plugins.css'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
}

gulp.task('plugincss', pluginsCSS);

// function que compila os arquivos JS e concatena na pasta all.js
function gulpJs() {
    return gulp.src('js/scripts/*.js')
    .pipe(concat('all.js'))
    // usando o babel para compilar aquivos do javascript moderno para navegadores antigos possam ler.
    .pipe(babel({
        presets: ['@babel/env']
    }))
    // Minificando arquivos JS
    .pipe(uglify())
    // Pasta de destino
    .pipe(gulp.dest('js/'))
    // Aplica o refresh na página, quando tiver alguma alteração
    .pipe(browserSync.stream());
}

gulp.task('alljs', gulpJs);


// Adicionando bibliotecas js externas ao projeto.
function pluginsJS() {
    return gulp
    .src(['./js/lib/aos.min.js', './js/lib/swiper.min.js', './js/lib/jquery-1.11.3.min.js'])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}

gulp.task('pluginjs', pluginsJS);

// function que utiliza o browserSync para criar um servidor local
function browser() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
}

// Tarefa do browser-sync
gulp.task('browser-sync', browser);

// Executa as tarefas sem ficar precisando rodar comando no terminal.
function watch() {
    gulp.watch('scss/*.scss', compilaSass);

    gulp.watch('css/lib/*.css', pluginsJS);
    
    gulp.watch('*.html').on('change', browserSync.reload);

    gulp.watch('js/scripts/*.js', gulpJs);

    gulp.watch('js/lib/*.js', pluginsJS);
}

// Tarefa do watch
gulp.task('watch', watch);


// Tarefas default que executa watch e browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'plugincss', 'alljs', 'pluginjs'));