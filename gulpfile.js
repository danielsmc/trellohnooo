var bs  = require('browser-sync').create();
var del = require('del');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var inline = require('gulp-inline');
var gulpSequence = require('gulp-sequence');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus')
var uglify = require('gulp-uglify');
var pump = require('pump');
var named = require('vinyl-named');
var webpack = require('webpack-stream');

function pumpedTask(name,steps) {
  gulp.task(name, (cb) => {
    var stepsplus = steps();
    stepsplus.push(bs.stream());
    pump(stepsplus,cb);
  });
}

const dirs = {prod:"docs",dev:"build"};

gulp.task('clean', function() {
   return del(dirs.dev);
});

gulp.task('clean-prod', function() {
   return del(dirs.prod);
});

gulp.task('browser-sync', function() {
  bs.init({
    server: dirs.dev,
    ghostMode: false
  });
});

var babel_loader = {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            "presets": ["es2015", "react"],
            "plugins": [
              "transform-class-properties",
              "inline-json-import"
            ]
          }
        };

pumpedTask('scripts', () => [
    gulp.src('src/script/*.js'),
    named(),
    webpack({
      output: {
        filename: '[name].js',
        library: '[name]'
      },
      module: {
        loaders: [babel_loader]
      },
      devtool: "source-map"
    }
    ),
    gulp.dest(dirs.dev+'/js/')
]);

pumpedTask('scripts-prod', () => [
    gulp.src('src/script/*.js'),
    named(),
    webpack({
      output: {
        filename: '[name].js',
        library: '[name]'
      },
      module: {
        loaders: [babel_loader]
      }
    }),
    uglify(),
    gulp.dest(dirs.prod+'/js/')
]);

pumpedTask('styles', () => [
   gulp.src(['src/style/**/*.styl','!src/style/**/_*.styl']),
   sourcemaps.init(),
   stylus(),
   autoprefixer(),
   sourcemaps.write(),
   gulp.dest(dirs.dev+'/style')
]);

pumpedTask('styles-prod', () => [
   gulp.src(['src/style/**/*.styl','!src/style/**/_*.styl']),
   stylus({compress: true}),
   autoprefixer(),
   gulp.dest(dirs.prod+'/style')
]);

pumpedTask('markup', () => [
   gulp.src('src/markup/**/*'),
   gulp.dest(dirs.dev)
]);

pumpedTask('markup-prod', () => [
   gulp.src('src/markup/**/*'),
   gulp.dest(dirs.prod)
]);


gulp.task('watch',function() {
  var watches = {
    scripts: 'src/script/**/*',
    styles: 'src/style/**/*',
    markup: 'src/markup/**/*'
  }
  for (var task in watches) {
    gulp.watch(watches[task],[task]);
  };
});

gulp.task('default', gulpSequence('clean','watch',['scripts','markup','styles'],'browser-sync'));

gulp.task('prod', gulpSequence('clean-prod',['scripts-prod','markup-prod','styles-prod']));