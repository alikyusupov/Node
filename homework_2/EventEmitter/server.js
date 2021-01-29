const EE = require("./EE.js")

const emitter = new EE();

emitter.on('eat', stringData => {
    console.log('Первым: Я кушаю  ' + stringData + '.');
});

emitter.on('eat', stringData => {
    console.log('Вторым: Я кушаю  ' + stringData + '.');
});

setTimeout(() => {
    emitter.emit('eat', 'бутерброд');
}, 3000);

setTimeout(() => {
    emitter.emit('eat', 'мясо');
}, 2000);

setTimeout(() => {
    emitter.emit('eat', 'яблочко');
}, 500);
