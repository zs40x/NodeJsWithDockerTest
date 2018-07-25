(function (entryController) {

    var mongodb = require("mongodb");

    entryController.init = function (app, database, entryModel, repository) {

        app.get("/entry", function(req,res) {
            repository.allEntries(function (err, entries) {
                if(err) {
                    res.status(500).json(err);
                    return;
                }

                res.status(200).json(entries);
            });
        });
        
        app.post('/entry', function(req, res) {
            if (!req.body) return res.sendStatus(400);
            
            repository.appendEntry(req.body.entry, function(err, entry) {
                if(err) {
                    res.status(500).json({
                        status: "Internal server error",
                        error: err
                    });
                }

                res.status(201).json(entry);
            });
        });

        app.delete('/entry/:id', function (req, res) {

            database.getDb(function (err, db) {
                if(err) {
                    rs.status(500).json(err);
                    return;
                }

                db.entries.deleteOne({
                        _id : new mongodb.ObjectID(req.params.id)
                    }, function (err, r) {
                    if(err) {
                        rs.status(500).json(err);
                        return;
                    } 

                    if(r.deletedCount == 0) {
                        res.status(404).json({ 
                            status: "Not Found",
                            id: req.params.id
                        });
                    } else {
                        res.status(200).json({ status: "Ok" });
                    }
                })
            });
        });
    }
})(module.exports);