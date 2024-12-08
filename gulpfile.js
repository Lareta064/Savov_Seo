const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const watch = require("gulp-watch");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const del = require("del");
const gcmq = require("gulp-group-css-media-queries");
const formatHtml = require("gulp-format-html");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const ttf2woff2 = require("gulp-ttf2woff2");

// Задача для PUG
gulp.task("pug", function () {
    return gulp
        .src("./src/pug/pages/**/*.pug")
        .pipe(
            plumber({
                errorHandler: notify.onError((err) => ({
                    title: "Pug",
                    sound: false,
                    message: err.message,
                })),
            })
        )
        .pipe(
            pug({
                pretty: "\t",
            })
        )
        .pipe(gulp.dest("./build/"))
        .pipe(browserSync.stream());
});

gulp.task("pugUi", function () {
    return gulp
        .src("./src/pug/ui/**/*.pug")
        .pipe(
            plumber({
                errorHandler: notify.onError((err) => ({
                    title: "Pug",
                    sound: false,
                    message: err.message,
                })),
            })
        )
        .pipe(
            pug({
                pretty: "\t",
            })
        )
        .pipe(gulp.dest("./build/ui/"))
        .pipe(browserSync.stream());
});

// Задача для шрифтов
gulp.task("fonts", function () {
    return gulp
        .src("./src/fonts/*.{ttf,woff,woff2,otf}")
        .pipe(ttf2woff2())
        .pipe(gulp.dest("./build/fonts/"));
});

// Задача для SCSS
gulp.task("scss", function () {
    return gulp
        .src("./src/scss/main.scss")
        .pipe(
            plumber({
                errorHandler: notify.onError((err) => ({
                    title: "Styles",
                    sound: false,
                    message: err.message,
                })),
            })
        )
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: "expanded",
            })
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 4 versions"],
                cascade: false,
            })
        )
        .pipe(gcmq())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./build/css/"))
        .pipe(browserSync.stream());
});

// Задача для изображений
gulp.task("copy:img", function () {
    return gulp
        .src("./src/img/**/*.*")
        .pipe(imagemin()) // Оптимизация изображений
        .pipe(webp()) // Преобразование в WebP
        .pipe(gulp.dest("./build/img/"));
});

// Задачи для копирования других файлов
gulp.task("copy:libs", function () {
    return gulp.src("./src/libs/**/*.*").pipe(gulp.dest("./build/libs/"));
});

gulp.task("copy:js", function () {
    return gulp.src("./src/js/**/*.*").pipe(gulp.dest("./build/js/"));
});

gulp.task("copy:video", function () {
    return gulp.src("./src/video/**/*.*").pipe(gulp.dest("./build/video/"));
});

// Очистка папки build
gulp.task("clean:build", function () {
    return del("./build");
});

// Задача для форматирования HTML
gulp.task("html:prettify", function () {
    return gulp
        .src("build/**/*.html")
        .pipe(formatHtml())
        .pipe(gulp.dest("./build/"));
});

// Слежение за изменениями файлов
gulp.task("watch", function () {
    watch(["./build/js/**/*.*", "./build/img/**/*.*", "./build/libs/**/*.*", "./build/video/**/*.*"], browserSync.reload);

    watch("./src/scss/**/*.scss", function () {
        setTimeout(gulp.parallel("scss"), 500);
    });

    watch("./src/pug/**/*.pug", gulp.parallel("pug"));
    watch("./src/pug/ui/*.pug", gulp.parallel("pugUi"));

    watch("./src/img/**/*.*", gulp.parallel("copy:img"));
    watch("./src/js/**/*.*", gulp.parallel("copy:js"));
    watch("./src/libs/**/*.*", gulp.parallel("copy:libs"));
    watch("./src/video/**/*.*", gulp.parallel("copy:video"));
    watch("./src/fonts/**/*.*", gulp.parallel("fonts"));
});

// Запуск локального сервера
gulp.task("server", function () {
    browserSync.init({
        server: {
            baseDir: "./build/",
        },
    });
});

// Основная задача по умолчанию
gulp.task(
    "default",
    gulp.series(
        gulp.parallel("clean:build"),
        gulp.parallel("scss", "pug", "pugUi", "fonts", "copy:img", "copy:js", "copy:libs", "copy:video"),
        gulp.parallel("html:prettify"),
        gulp.parallel("server", "watch")
    )
);
