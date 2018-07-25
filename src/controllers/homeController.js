(function (homeController) {

    homeController.init = function(app, entryModel) {

        var lineIndex = 0;

        app.get('/', function(req, res) {
            var entries = entryModel.all();
            var message = entries[lineIndex];
          
            lineIndex += 1;
            if (lineIndex > entries.length) {
                lineIndex = 0;
            }
          
            res.render('index', {message: message});
          });
    };

})(module.exports);