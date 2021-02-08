const net  = require("net")

const server = net.createServer(socket=>{
    let date = new Date()
    let year = String(date.getFullYear())
    let month = String(date.getMonth() + 1).padStart(2,"0")
    let day = String(date.getDate()).padStart(2,"0")
    let hours = String(date.getHours()).padStart(2,"0")
    let minutes = String(date.getMinutes()).padStart(2,"0")
    let data = `${year}-${month}-${day} ${hours}:${minutes}`
    socket.write(data+"\n")
    socket.end()
})

const port = process.argv[2] || 3000

server.listen(port,()=>{
    console.log("Сервер запущен...")
})