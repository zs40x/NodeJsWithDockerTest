(function (homeController) {

    homeController.init = function(app, entryModel) {

        app.get('/', function(req, res) {
            
            entryModel.nextEntry((err, entry) => {
                if(err) {
                    res.render('index', {message: err});
                } else {
                    res.render('index', {message: entry});
                }
            });
          });
    };

})(module.exports);