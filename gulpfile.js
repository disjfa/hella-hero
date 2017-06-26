const gulp = require('gulp');
const metalsmith = require('gulp-metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const collections = require('metalsmith-collections');
const webserver = require('gulp-webserver');
const sass = require('gulp-sass');
const permalinks = require('metalsmith-permalinks');
const ghPages = require('gulp-gh-pages');
const sassLint = require('gulp-sass-lint');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

gulp.task('default', ['metalsmith', 'sass', 'webserver', 'watch']);

gulp.task('metalsmith', () => {
  gulp.src('src/**/*')
    .pipe(metalsmith({
      clean: true,
      metadata: {
        sitename: 'Spec app',
        siteurl: 'http://spec-app.com/',
        description: 'An app with a spec.',
        generatorname: 'Metalsmith',
        generatorurl: 'http://metalsmith.io/',
      },
      use: [
        markdown(),
        permalinks(),
        collections({
          pages: {},
        }),
        layouts({ engine: 'handlebars' }),
      ],
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('sass', () => {
  const processors = [
    autoprefixer,
    cssnano,
  ];

  return gulp.src('./scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('sass-lint', () => gulp.src('./scss/**/*.s+(a|c)ss')
  .pipe(sassLint({
    configFile: '.sass-lint.yml',
  }))
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError()));

gulp.task('watch', () => {
  gulp.watch(['src/**', 'layouts/**'], ['metalsmith']);
  gulp.watch('scss/**', ['sass']);
});

gulp.task('webserver', () => {
  gulp.src('build')
    .pipe(webserver({
      host: '0.0.0.0',
      fallback: 'index.html',
      livereload: true,
      open: true,
    }));
});

gulp.task('deploy', () => gulp.src('./build/**/*')
  .pipe(ghPages()));
