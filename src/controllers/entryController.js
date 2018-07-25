(function (entryController) {

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
            repository.deleteById(req.params.id, (notFound, error) => {

                if(notFound) {
                    res.status(404).json({ 
                        status: "Not Found",
                        id: req.params.id
                    });
                    return;
                }

                if(error) {
                    res.status(500).json(err);
                    return;
                }

                res.status(200).json({ status: "Ok" });
            });
        });
    }
})(module.exports);