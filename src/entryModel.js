(function (entryModel) {

    var entries = [];

    entryModel.init = function(repository) {
        this.repository = repository;
    }

    entryModel.all = function(next) {
        
        this.repository.allEntries(function (err, entries) {
            if(err) {
                next(err, null);
                return;
            }

            next(null, entries.map(x => x.entry));
        });
    }

    entryModel.append = function (newEntry) {
        entries.push(newEntry);
    }

})(module.exports);