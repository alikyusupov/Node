const http = require("http");

function httpGet(url) {

    return new Promise(function(resolve, reject) {
  
      http.get(url, res =>{
          let str = ""
          res.on("data",(chunk)=>{
              str += chunk
          })
          res.on("error",(err)=>{
            reject(err)
          })
          res.on("end", ()=>{
            resolve(str.toString())
          })
      })
    });

}

httpGet(process.argv[2])
.then(res=>{
    console.log(res)
    return httpGet(process.argv[3])
})
.then(res=>{
    console.log(res)
    return httpGet(process.argv[4])
})
.then(res=>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
})