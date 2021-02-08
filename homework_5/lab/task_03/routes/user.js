let express = require('express'); //подключаем модуль express
let router = express.Router(); //создаем новый роутер

router.post('/auth', (req, res, next) => {
    console.log('Параметры POST запроса: ' + JSON.stringify(req.body));
    res.send(JSON.stringify(req.body)); //Отправляем присланные параметры обратно клиенту
});

module.exports = router; //Экспортируем роутер из модуля