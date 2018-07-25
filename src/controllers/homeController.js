(function (homeController) {

    homeController.init = function(app, entryModel) {

        var lineIndex = 0;

        app.get('/', function(req, res) {
            entryModel.all((err, entries) => {

                if(err) {
                    res.render('index', {message: err});
                    return;
                }
            
                var message = entries[lineIndex];
          
                lineIndex += 1;
                if (lineIndex > entries.length) {
                    lineIndex = 0;
                }
            
                res.render('index', {message: message});
            });
          });
    };

})(module.exports);