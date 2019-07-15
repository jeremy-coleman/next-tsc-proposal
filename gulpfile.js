var gulp = require('gulp')
var cp = require('child_process')
var path = require('path')

const BASE_PATH = __dirname

const spawnBin = (binCommand, args) => {
  const getCommandPath = binCommand => {
    const cmd = process.platform === 'win32' ? `${binCommand}.cmd` : binCommand;
    return path.resolve(__dirname, 'node_modules', '.bin', cmd)
  }

  return cp.spawn(getCommandPath(binCommand), args, { 
    cwd: path.resolve(BASE_PATH),
    stdio: 'inherit' //['pipe', terminalStream, process.stderr]
  })
}

function copy() {
  return gulp.src(['src/**/*', '!src/**/*.{ts,tsx,js,jsx}'])
    .pipe(gulp.dest('app'))
}

gulp.task('copy:src', copy)


gulp.task('tsc:firstrun', function() {
  return spawnBin('tsc', ['-p', 'tsconfig.build.json'])
})

gulp.task('tsc:watch', async function() {
  return spawnBin('tsc', ['-p', 'tsconfig.build.json', "-w"])
})

gulp.task('start:tsc', gulp.series('tsc:firstrun', 'tsc:watch'))

gulp.task('start:nextjs', async function() {
   spawnBin('next', ['app'])
})


// this strategy allows your web app to request your ssr api from any source.
// this also means you can serve a ~1kb index.html to users immediately.
gulp.task('start:shell', async function() {
  spawnBin('webpack', ['--config', 'webpack.config.js'])
})


gulp.task('watch:copy', async function () {
  gulp.watch(['src/**/*', '!src/**/*.{ts,tsx,js,jsx}', '!src/app/**/*'], gulp.series(copy))
})

gulp.task('start:stage:1', gulp.parallel('copy:src', 'start:tsc'))

gulp.task('start:stage:2', gulp.parallel('start:nextjs', 'watch:copy'))

gulp.task('start', gulp.series('start:stage:1', 'start:stage:2', 'start:shell'))

