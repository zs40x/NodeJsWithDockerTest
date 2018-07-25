(function (entryModel) {

    var entries = [
        "Hey, now, you're an All Star, get your game on, go play",
        "Hey, now, you're a Rock Star, get the show on, get paid",
        "And all that glitters is gold",
        "Only shooting stars break the mold",
      ];

    entryModel.all = function() {
        return entries;
    }

    entryModel.append = function (newEntry) {
        entries.push(newEntry);
    }

})(module.exports);