(function(database) {

    var mongodb = require("mongodb");
    var mongoUrl = "mongodb://mongo:27017/myDatabase";
    var dbInstance = null;

    database.getDb = function(next) {
        if(!dbInstance) {
            mongodb.MongoClient.connect(mongoUrl, function(err, db) {
                if(err) {
                    next(err, null);
                } else {
                    var dbo = db.db("TestDb");
                    dbInstance ={
                        db: dbo,
                        entries: dbo.collection("entries")
                    };
                    next(null, dbInstance);
                }
            });
        } else {
            next(null, dbInstance);
        }
    };
})(module.exports);