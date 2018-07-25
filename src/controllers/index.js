(function (controllers) {

    var homeController = require("./homeController");
    var entryController = require("./entryController")

    controllers.init = function(app, database, entryModel, entryRepository) {
        homeController.init(app, entryModel);
        entryController.init(app, database, entryModel, entryRepository);
    };
})(module.exports);