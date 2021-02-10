const https = require("https")

const cheerio = require("cheerio")

const fs = require("fs")

const URL = "https://robadras.herokuapp.com"


function httpsGet(url){
    return new Promise((resolve, reject)=>{
        https.get(url, function(res) {
            console.log("Got response: " + res.statusCode);
            let content = '';
            res.on('data', function(chunk) {
                content += chunk;
            });
            res.on('end', function() {
                console.log('Downloaded site: ' + url);
                resolve(content)
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
            reject(e)
        });
    })
}
httpsGet(URL + "/shop")
.then(res=>{
    $ = cheerio.load(res)
    let links = $('.card__image a').map(function(i,el){
        return {
            url:$(el).attr('href')
        }}).toArray();
    return links
})
.then(links=>{
    for (let i = 0; i < links.length; i++) {
        (function(index) {
            setTimeout(function() { 
                https.get(`${URL}${links[index].url}`, (res)=>{
                    let str = "";
                    res.on("data", chunk=>{
                        str+=chunk
                    })
                    res.on("error",(err)=>{
                        console.log(err)
                    })
                    res.on("end", ()=>{
                        $_ = cheerio.load(str);
                        let price = $_('h2 span').text()
                        fs.writeFile("./data/prices.txt", price + "\n", {encoding: "utf8",flag: "a"},err=>{
                            if(err)
                                console.log(err)
                            else{
                                console.log("Цена записана")
                            }
                        })
                    })
                })
            }, i * 2000);
        })(i);
    }
})

.catch(err=>{
    console.log(err)
})