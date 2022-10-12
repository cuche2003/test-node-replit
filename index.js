const http = require("http");
const fs = require("fs");

const hostname = "localhost";
const port = 8080;

const allFiles = fs.readdirSync( "./", { withFileTypes: true } );
const htmlFilenames = allFiles.map(dirent => dirent.name)
                              .filter( name => name.endsWith(".html") && 
                                       name != "404.html" && 
                                       name != "index.html" )
                              .map( name => name.slice(0,-5) );

const server = http.createServer((req, res) => {

    const reqHtml = req.url?.slice(1);

    if ( !reqHtml ) {
        const file = fs.readFileSync("./index.html", {encoding: "utf-8"});
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(file);
        return;
    }

    if ( htmlFilenames.includes(reqHtml) ) {
        const file = fs.readFileSync(`./${reqHtml}.html`, {encoding: "utf-8"});
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(file);
        return;
    }

    if ( !htmlFilenames.includes(reqHtml) ) {
        const file = fs.readFileSync(`./404.html`, {encoding: "utf-8"});
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(file);
        return;
    }

});

server.listen(port, hostname, () => {

    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(htmlFilenames);

});