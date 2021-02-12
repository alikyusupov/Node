var express = require('express'); /* подключаем модуль express */ 
var app = express(); /* создаем экземпляр приложения express */ 
var https = require("https")
var cors = require("cors")
app.use(express.static('public')); /* настраиваем экспресс на отдачу статического контента из 
папки public */ 
app.use(cors())
app.get('/getJson', function(req, res, next){
    https.get("https://api.exchangeratesapi.io/latest", resp=>{
        var body = '';
        resp.on('data', function(chunk){
            body += chunk;
        });
        resp.on('end', function(){
            res.send(body)
        });
        }).on('error', function(e){
            console.log("Got an error: ", e);
        })
}); 
app.listen(80);  /*настраиваем приложение слушать 80 порт*/ 