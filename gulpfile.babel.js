'use strict'

import path from 'path'
import gulp from 'gulp'
import del from 'del'
import runSequence from 'run-sequence'
import browserSync from 'browser-sync'
import gulpLoadPlugins from 'gulp-load-plugins'
import { outputDir, autoFix, autoPrefix } from './config.json'

const $ = gulpLoadPlugins()
const reload = browserSync.reload

gulp.task('lint', () =>
  gulp.src('app/scripts/**/*.js')
    .pipe($.eslint({
      fix: autoFix
    }))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failOnError()))
)

gulp.task('images', () =>
  gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(path.join(outputDir, 'images/')))
    .pipe($.size({ title: 'images' }))
)

gulp.task('copy', () =>
  gulp.src('app/root/*', {
    dot: true
  }).pipe(gulp.dest(outputDir))
    .pipe($.size({ title: 'copy' }))
)

gulp.task('styles', () => {
  return gulp.src('app/styles/**/*.scss')
    .pipe($.newer('.tmp/styles'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(autoPrefix))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.if(browserSync.active, browserSync.stream()))
})

gulp.task('styles:minify', ['styles'], () => {
  return gulp.src('.tmp/styles/**/*.css')
    .pipe($.cssnano())
    .pipe($.size({ title: 'styles' }))
    .pipe(gulp.dest(path.join(outputDir, 'styles')))
})

gulp.task('scripts', () =>
  gulp.src('./app/scripts/main.js')
    .pipe($.newer('.tmp/scripts'))
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/scripts'))
)

gulp.task('scripts:minify', ['scripts'], () =>
  gulp.src('.tmp/scripts/main.js')
    .pipe($.uglify({ preserveComments: 'some' }))
    .pipe($.size({ title: 'scripts' }))
    .pipe(gulp.dest(path.join(outputDir, 'scripts/')))
)

gulp.task('templates', () => {
  return gulp.src('app/templates/*.pug')
    .pipe($.pug({
      pretty: true
    }))
    .pipe(gulp.dest('.tmp'))
})

gulp.task('templates:minify', ['templates'], () => {
  return gulp.src('.tmp/*.html')
    .pipe($.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    }))
    .pipe($.size({ title: 'templates', showFiles: true }))
    .pipe(gulp.dest(outputDir))
})

gulp.task('clean', () => del(['.tmp', outputDir], { dot: true }))

gulp.task('serve', ['templates', 'scripts', 'styles', 'copy'], () => {
  browserSync({
    notify: false,
    logPrefix: 'SW',
    server: ['.tmp', 'app'],
    port: 3000,
    open: false
  })

  gulp.watch(['app/templates/**/*.pug'], ['templates', reload])
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles'])
  gulp.watch(['app/scripts/**/*.js'], ['lint', 'scripts', reload])
  gulp.watch(['app/images/**/*'], reload)
})

gulp.task('serve:output', ['default'], () =>
  browserSync({
    notify: false,
    logPrefix: 'SW',
    server: outputDir,
    port: 3001,
    open: false
  })
)

gulp.task('default', ['clean'], cb =>
  runSequence(
    'styles:minify',
    ['lint', 'templates:minify', 'scripts:minify', 'images', 'copy'],
    cb
  )
)
