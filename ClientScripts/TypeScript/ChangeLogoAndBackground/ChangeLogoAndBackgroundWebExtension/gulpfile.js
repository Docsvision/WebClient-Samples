const gulp = require("gulp");
const docsvision = require("@docsvision/webclient-extension-build/gulpfile.js");
const { STYLES_DIR } = require("./copy-path");

var sources = { };
sources.src = "src";
sources.scss = sources.src + "/**/*.scss";

gulp.task("clean-styles", function() {
    return docsvision.cleanStyles(STYLES_DIR);
});

gulp.task("build-styles", function() {
    return docsvision.buildStyles(STYLES_DIR, sources.scss);
});

gulp.task("styles", gulp.series("clean-styles", "build-styles"));

gulp.task('watch', function(){
    gulp.watch([sources.scss], gulp.series('build-styles'));
});