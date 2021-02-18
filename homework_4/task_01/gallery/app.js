let express = require('express');
let bodyParser = require('body-parser'); //подключаем парсер тела запросов
let app = express();
let path = require("path");
let fs = require("fs");
let directoryPath = path.join(__dirname, 'public/images');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.get("/images", (req, res, next)=>{
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        let files_ = [];
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            files_.push("images/" +  file)
        });
        res.set({"Access-Control-Allow-Origin": "*"});
        res.json({data:files_})
    });
})
app.listen(3000,()=>{
    console.log("Сервер запущен")
});