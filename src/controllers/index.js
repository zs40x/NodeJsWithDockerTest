(function (controllers) {

    var homeController = require("./homeController");
    var entryController = require("./entryController")

    controllers.init = function(app, database) {
        homeController.init(app);
        entryController.init(app, database);
    };
})(module.exports);