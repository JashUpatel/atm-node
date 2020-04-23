const http = require("http");
const url = require('url');

const server =http.createServer((req,res)=>{
    res.end("hello world!");
    const urlobj = url.parse(req.url,true);
    console.log(urlobj.pathname);

    if(urlobj.pathname='/help'){
        res.end("this is help");
    }
});


server.listen(4242,()=>{
    console.log("server is running...");
});