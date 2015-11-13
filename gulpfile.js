
var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');

gulp.task("browserify", function() {
    browserify("./dist/ssh2.js")
        .bundle()
        .pipe(source('ssh2-build.js'))
        .pipe(gulp.dest("./dist/"))
});

gulp.task("default", ["browserify",], function() {});
