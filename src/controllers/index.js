(function (controllers) {

    var homeController = require("./homeController");
    var entryController = require("./entryController")

    controllers.init = function(app, entryModel, entryRepository) {
        homeController.init(app, entryModel);
        entryController.init(app, entryRepository);
    };
})(module.exports);