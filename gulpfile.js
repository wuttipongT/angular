var gulp = require('gulp');

var assetsDev = 'assets/';
var assetsProd = 'src/';

var appDev = 'dev/';
var appProd = 'app/';

/* Mixed */
var ext_replace = require('gulp-ext-replace');

/* CSS */
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');

/* JS & TS */
var jsuglify = require('gulp-uglify');

/* Images */
var imagemin = require('gulp-imagemin');



// โหลด package "browser-sync" มาใช้ (บรรทัดนี้ต้องใส่เวลาติดตั้ง plugin เสริม)
// var browserSync = require('browser-sync');

// สร้าง task ชื่อว่า "browser-sync" ขึ้นมา พร้อมกับระบุงานที่จะให้ task นี้ทำ
// gulp.task('browser-sync', function() {
//     browserSync({
//         server: {
//             baseDir: "./"
//         }
//     });
// });
gulp.task('build-css', function() {
    return gulp.src(assetsDev + 'scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(postcss([precss, autoprefixer, cssnano]))
        .pipe(sourcemaps.write())
        .pipe(ext_replace('.css'))
        .pipe(gulp.dest(assetsProd + 'css/'));
});

gulp.task('build-img', function() {
    return gulp.src(assetsDev + 'img/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(assetsProd + 'img/'));
});

gulp.task('build-html', function() {
    return gulp.src(appDev + '**/*.html')
        .pipe(gulp.dest(appProd));
});

gulp.task('watch', function() {
    gulp.watch(assetsDev + 'scss/**/*.scss', ['build-css']);
    gulp.watch(assetsDev + 'img/*', ['build-img']);
});

gulp.task('default', ['watch', 'build-css', 'browser-sync']);

// , function(){

//     // เมื่อไฟล์ html หรือ css มีการเปลี่ยนแปลง ก็ให้รีเฟรช web browser
//     gulp.watch(['**/*.html'], browserSync.reload);
//     gulp.watch(['css/**/*.css'], browserSync.reload);

// }