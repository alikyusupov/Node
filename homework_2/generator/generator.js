
const charset ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function* generatePassword(limit) {
  let pwd = "";
  while (true) {
    for (let i = 0; i < limit; ++i) {
      pwd += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    yield pwd;
    pwd = ""
  }
}

let gen = generatePassword(12);

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
