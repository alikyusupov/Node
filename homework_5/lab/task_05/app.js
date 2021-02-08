let express = require('express'); //подключаем модуль express
let mustacheExpress = require('mustache-express');
let app = express();//создаем приложение express
let bodyParser = require('body-parser'); /*подключаем модуль для обработки содержимого тела
post запроса */
app.use(bodyParser.urlencoded({ extended: false })); /*регистрируем модуль для обработки
содержимого тела post запроса в express */
app.use(express.static('public')); /* настраиваем статический сервер, для отдачи контента из папки
public */
app.set('views', __dirname + '/views'); //указываем расположение папки с шаблонами
app.engine('mustache', mustacheExpress()); //регистрируем шаблонизатор Mustache в Express
app.set('view engine', 'mustache'); //указываем использовать Mustache в качестве шаблонизатора

let route = require('./routes/user.js'); //подключаем файл с роутом
app.use('/user', route)

app.listen(3000); //Настраиваем express приложение слушать запросы на 80 порту
