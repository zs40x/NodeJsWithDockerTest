(function (controllers) {

    var homeController = require("./homeController");
    var entryController = require("./entryController")

    controllers.init = function(app, database, entryModel) {
        homeController.init(app, entryModel);
        entryController.init(app, database, entryModel);
    };
})(module.exports);