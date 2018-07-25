(function (entryController) {

    entryController.init = function (app, database) {

        app.get("/entry", function(req,res) {
            database.getDb(function (err, db) {
                if(err) {
                res.status(500).json(err);
                return;
                }
            
                db.entries.find({}).toArray(function (err, docs) {
                if(err) {
                    res.status(500).json(err);
                    return;
                }
            
                res.status(200).json(docs);
                });
            });
        });
        
        app.post('/entry', function(req, res) {
            if (!req.body) return res.sendStatus(400)
            //LINES.push(req.body.entry);
            
            database.getDb(function (err, db) {
                if(err) {
                    res.status(500).json(err);
                    return;
                }
            
                var record ={
                    entry: req.body.entry,
                    created: Date()
                };
            
                db.entries.insertOne(record, function (err, r) {
                    if(err) {
                        res.status(500).json({
                            status: "Internal server error",
                            error: err
                        });
                        return;
                    }
                
                    res.status(201).json(req.body);
                });
            }); 
        });
    }
})(module.exports);