(function (entryRepository) {

    entryRepository.init = function(database) {
        this.database = database;
    }

    entryRepository.allEntries = function (next) {
        this.database.getDb(function (err, db) {
            if(err) {
                next(err, null);
                return;
            }
            
            db.entries.find({}).toArray(function (err, docs) {
                if(err) {
                    next(err, null);
                    return;
                }
            
                next(null, docs)
            });
          });
    };

})(module.exports);