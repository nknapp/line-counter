var fs = require("fs");
var verb = require("verb");
var path = require("path");

verb.asyncHelper("inline_file", function (filepath, next) {
    var filename = require.resolve(filepath);
    var moduleName = this.context.name;
    return fs.readFile(filename, 'utf8', function(err, contents) {
        if (err) {
            return next(err);
        }
        // This is the module-name that is used by the example file, when
        // requiring the current module
        var requirePattern = path.relative(path.dirname(filename),__dirname);
        var requireRegex = new RegExp("require\\([\'\"]"+requirePattern+"/?[\'\"]\\)","g");
        next(null,contents.replace(requireRegex,"require('"+moduleName+"')"));
    });
});


verb.task('default', function () {
    verb.src(['.verb.md'])
        .pipe(verb.dest('./'));
});
