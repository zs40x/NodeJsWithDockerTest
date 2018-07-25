(function (entryRepository) {

    var mongodb = require("mongodb");

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

    entryRepository.appendEntry = function (entry, next) {
        this.database.getDb(function (err, db) {
            if(err) {
                next(err, null);
                return;
            }
        
            var record ={
                entry: entry,
                created: Date()
            };
        
            db.entries.insertOne(record, function (err, r) {
                if(err) {
                    next(err, null);
                    return;
                }

                next(null, r.ops[0]);
            });
        }); 
    };

    entryRepository.deleteById = function(id, next) {
        this.database.getDb(function (err, db) {
            if(err) {
                next(false, err);
            }

            db.entries.deleteOne({
                    _id : new mongodb.ObjectID(id)
                }, function (err, r) {
                if(err) {
                    next(false, err);
                    return;
                } 

                if(r.deletedCount == 0) {
                    next(true, null);
                } else {
                    next(false, null);
                }
            })
        });
    }

})(module.exports);