const posts = async ()=>{
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await response.json()
    return data
}

console.log(posts().length)


function User(name, lastname, age){
    this.name = name;
    this.lastname = lastname;
    this.age = age
    /*this.toString = function(){
       return  console.log(this.name + " " + this.lastname)
    }*/
}
const user = new User("Alex","Smit",18)
console.log(user.toString())