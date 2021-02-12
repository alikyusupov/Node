let express = require('express');
let crypto = require('crypto'); //подключаем нативный NodeJS модуль для шифрования
let route = express.Router();
let db = require('../model/users.js');
route.use((req, res, next)=>{
    /* !!Проверяем запрашивает ли пользователь панель администратора '/admin' или
    проверяем авторизован ли пользователь */
    if(req.originalUrl === '/admin' || req.session.isAuthenticated){
        next(); //Передаём управление следующим обработчикам
    } else {
        res.redirect('/admin'); /*в случае незнакомого пользователя перенаправляем
    клиента на страницу /admin */
    }
});
    /*Роут организующий отдачу странички аутентификации (если незнакомый пользователь) или
    непосредственно панель администратора. Полный путь: /admin/ */
route.get('/', (req, res, next)=>{
    if (req.session.isAuthenticated){ //!!проверяем авторизован ли пользователь
    /*Разрешение есть. Функция рендер наполняет шаблон (файл
    admin_panel.mustache) данными указанными вторым аргументом*/
        res.render('admin_panel', {});
    } else {
    /*функция рендер наполняет шаблон (файл auth.mustache) данными
    указанными вторым аргументом*/
        res.render('auth', {});
    }
});
    


route.post('/', (req, res, next)=>{
    //Проверяем наличие логина
    if (!req.body.login){
    //Не указан логин
    /*функция рендер наполняет шаблон (файл auth.mustache) данными
    указанными вторым аргументом (вернется сообщение об ошибке)*/
    res.render('auth', {message:true});
    return;
    }
    /*Запрашиваем в хранилище пользователей конкретного пользователя по присланному
    логину, в функцию обратного вызова вернёться ошибка или объект описывающий
    пользователя (переменная user) */
    db.findUser(req.body.login, (err, user)=>{
    //Проверяем наличие в хранилище пользователя
    if (!user)
    //Нет такого пользователя
    /*функция рендер наполняет шаблон (файл auth.mustache) данными
    указанными вторым аргументом (вернется сообщение об ошибке)*/
    return res.render('auth', {message:true});
    //Шифруем присланный пароль
    let passwordFromClient = crypto
    .createHash('sha512')
    .update('salt' + req.body.pass)
    .digest('hex');
    //Сравниваем шифрованный присланный пароль с хранящемся на сервере
    if (user.password !== passwordFromClient)
    //Неверный пароль
    /*функция рендер наполняет шаблон (файл auth.mustache) данными
    указанными вторым аргументом (вернется сообщение об ошибке)*/
    return res.render('auth', {message:true});
    //!!Авторизация пройдена устанавливаем флаг в объекте сессии пользователя
    req.session.isAuthenticated = true;
    res.redirect('/admin'); //перенаправляем клиента на: /admin
    });
});


    

route.post('/out', (req, res, next)=>{
    req.session.destroy(); //!!разрушаем сессию
    res.redirect('/admin'); //перенаправляем клиента на: /admin
});
    /*Роут организующий отдачу секретной информации. Полный путь: /admin/secret */
    
route.get('/secret', (req, res, next)=>{
    //Отдаём секретную информацию
    res.send('Секретная информация');
});
    
    

module.exports = route; //Экспортируем роутер из модуля
    