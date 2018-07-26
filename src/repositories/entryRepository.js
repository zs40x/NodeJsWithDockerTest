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
                    return err 
                        ? next(err, null)
                        : next(null, docs)
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
                return err
                    ? next(err, null)
                    : next(null, r.ops[0]);
            });
        }); 
    }

    deleteById(id, next) {
        this.database.getDb((err, db) => {
            if(err) {
                next(false, err);
                return;
            }

            db.entries.deleteOne({
                    _id : new mongodb.ObjectID(id)
                }, (err, r) => {
                    return err
                        ? next(false,err)
                        : r.deletedCount == 0
                            ? next(true, null)
                            : next(false, null);
                })
        });
    }
}

module.exports = EntryRepository;