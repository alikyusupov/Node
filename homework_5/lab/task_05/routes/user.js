let express = require('express'); //подключаем модуль express
let router = express.Router(); //создаем новый роутер

router.post('/auth', (req, res, next) => {
    res.render('output', { 
        name:   req.body.name,
        email:  req.body.mail,
        pwd:    req.body.pwd

    });
});

module.exports = router; //Экспортируем роутер из модуля