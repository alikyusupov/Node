var express = require('express'); /* подключаем модуль express */ 
var app = express(); /* создаем экземпляр приложения express */ 
app.use(express.static('public')); /* настраиваем экспресс на отдачу статического контента из 
папки public */ 
app.get('/getWidgetData', function(req, res, next){ 
    fetch("https://api.exchangeratesapi.io/latest")
    .then(res=>{
        res.json()
    })
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
}); 
app.listen(80);  /*настраиваем приложение слушать 80 порт*/ 