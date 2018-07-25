(function (entryModel) {

    var entries = [];

    entryModel.init = function(repository) {
        this.repository = repository;
    }

    entryModel.all = function() {
        return entries;
        /*repository.getAll(function (err, entries) {
            if(err) {
                next(err, null);
                return;
            }

            entries.map(x => x.entry);

        });*/
    }

    entryModel.append = function (newEntry) {
        entries.push(newEntry);
    }

})(module.exports);