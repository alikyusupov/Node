const passport = require('passport'); //Подключаем модуль passport
const crypto = require('crypto'); //Подключаем модуль для шифрования
const LocalStrategy = require('passport-local').Strategy; //Подключаем класс локальной стратегии
//Подключаем модуль для работы с хранилищем пользователей
let db = require('../model/users.js');
//Объект с настройками в каком виде придёт информация с формы аутентификации
let options = {
    usernameField:"login", //Название ключа (input-а) из которого придёт имя пользователя
    passwordField:"pass" //Название ключа (input-а) из которого придёт пароль
};
//Найстройка сериализации, передаётся объект пользователя, а различает passport по логину
passport.serializeUser( (user, cb) =>{
    cb(null, user.login);
});

passport.deserializeUser( (login, cb)=> {
    db.findUser(login, cb);
});

function initPassport () {
    /* Задаём модулю паспорт по какой стратегии он будет работать и создаём новую
    локальную стратегию передавая опции и функцию, которая определяет три состояния:
    ошибка, пользователь не найден с таким логином и паролем и пользователь есть доступ
    разрешён */
    passport.use(new LocalStrategy(options,
    /* username – то что ввёл пользователь в качестве логина, password – то что
    пользователь ввёл в качестве пароля, функция обратного вызова */
    (username, password, done) => {
    /*Запрашиваем в хранилище пользователей конкретного пользователя по
    присланному логину, в функцию обратного вызова вернется ошибка или
    объект описывающий пользователя (переменная user) */
    db.findUser(username, (err, user) => {
    if (err) { //вернулась ошибка из хранилища
    //возвращаем в passport ошибку
    return done(err);
    }
    // Пользователь не найден
    if (!user) {
    console.log('Пользователь не найден');
    /* возвращаем в passport сигнал что доступа нет, так как
    логин не тот */
    return done(null, false);
    }
    //Шифруем присланный пароль
    let passwordFromClient = crypto
    .createHash('sha512')
    .update('salt' + password)
    .digest('hex');
    /*Проверяем на соответствие шифрованного пароля, тому что лежит
    в базе, и возвращаем в passport сигнал что доступа нет, так как
    пароль не тот, или весь объект описывающий пользователя как
    сигнал что всё норм */
    return (user.password !== passwordFromClient) ? done(null, false) : done(null, user);
    });
    }
    ));
}

//Подменяем экспортируемый объект полностью функцией
module.exports = initPassport;
    