const mongodb = require("mongodb");

global.EntryRepository = class EntryRepository {

    constructor(database) {
        this.database = database;
    }

    allEntries(next) {
        this.database.getDb((err, db) => {
            if(err) {
                next(err, null);
                return;
            }
            
            db.entries
                .find({})
                .toArray( (err, docs) => {
                    if(err) {
                        next(err, null);
                        return;
                    }
                
                    next(null, docs)
                });
          });
    }

    appendEntry(entry, next) {
        this.database.getDb((err, db) => {
            if(err) {
                next(err, null);
                return;
            }
        
            var record ={
                entry: entry,
                created: Date()
            };
        
            db.entries.insertOne(record, (err, r) => {
                if(err) {
                    next(err, null);
                    return;
                }

                next(null, r.ops[0]);
            });
        }); 
    }

    deleteById(id, next) {
        this.database.getDb((err, db) => {
            if(err) {
                next(false, err);
            }

            db.entries.deleteOne({
                    _id : new mongodb.ObjectID(id)
                }, (err, r) => {
                    if(err) {
                        next(false, err);
                        return;
                    } 

                    return r.deletedCount == 0
                        ? next(true, null)
                        : next(false, null);
                })
        });
    }
}

module.exports = EntryRepository;