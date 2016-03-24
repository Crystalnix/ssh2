
var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var replace = require('gulp-replace');

var source_str = " this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);",
    target_str = "setTimeout(function(){this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);}.bind(this), 0);";


gulp.task("browserify", function() {
    browserify("./dist/ssh2.js")
        .bundle()
        .pipe(source('ssh2-build.js'))
        .pipe(gulp.dest("./dist/"))
});

gulp.task("improve", function(){
    // This task add setTimeout(func,0) in order to release base thread
    gulp.src(["./dist/ssh2-build.js"])
        .pipe(replace(source_str, target_str))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("default", ["browserify",], function() {});
gulp.task("build", ["improve"], function() {});
