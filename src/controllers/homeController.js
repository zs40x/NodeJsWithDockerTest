(function (homeController) {

    homeController.init = function(app) {

        var LINES = [
            "Hey, now, you're an All Star, get your game on, go play",
            "Hey, now, you're a Rock Star, get the show on, get paid",
            "And all that glitters is gold",
            "Only shooting stars break the mold",
          ];
        var lineIndex = 0;

        app.get('/', function(req, res) {
            var message = LINES[lineIndex];
          
            lineIndex += 1;
            if (lineIndex > LINES.length) {
                lineIndex = 0;
            }
          
            res.render('index', {message: message});
          });
    };

})(module.exports);