(function (entryModel) {

    var currentIndex = 0;

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

    entryModel.nextEntry = function(next) {
        
        this.repository.allEntries((err, entries) => {
            if(err) next(err, null);

            const entryNames = entries.map(x => x.entry);
        
            currentIndex += 1;
            if (currentIndex > entryNames.length) {
                currentIndex = 0;
            }

            next(null, entryNames[currentIndex-1]);
        });
    }

    // ToDo: Delete
    entryModel.append = function (newEntry) {
        entries.push(newEntry);
    }

})(module.exports);