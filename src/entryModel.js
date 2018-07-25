(function (entryModel) {

    var entries = [];

    entryModel.all = function() {
        return entries;
    }

    entryModel.append = function (newEntry) {
        entries.push(newEntry);
    }

})(module.exports);