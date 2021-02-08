const fs = require('fs');

const path = require('path');

module.exports = function(directory, ext, callback) {
    ext = '.' + ext;
    fs.readdir(directory, function (err, files) {  
        if (err) {
            return callback(err)
        };
    
        let filteredList = [];
        files.forEach(function(file) {
            if (path.extname(file) === ext) {
                filteredList.push(file);
            };
        });
    
    return callback(null, filteredList);
    });
};