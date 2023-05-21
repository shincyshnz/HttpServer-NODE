const fs = require("fs");
const http = require("http");

const userList = [
    { name: "Aysha" },
    { name: "Ravi" },
    { name: "Manu" },
    { name: "Seetha" },
    { name: "Don" },
    { name: "Jeni" },
]
let htmlFile;


const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    switch (req.url) {
        case "/":
            fs.readFile('./home.html', { encoding: "utf8" }, (err, data) => {
                htmlFile = err ? JSON.stringify(`"<h1>${err.message}</h1>"`) : data;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(htmlFile);
            });
            break;

        case "/users":
            if (req.method == "POST") {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString(); // convert Buffer to string
                });
                req.on('end', () => {
                    userList.push(JSON.parse(body));
                    res.statusCode = 201;
                    res.end();
                });
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(userList));
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("Page Not Found");
            break;
    }


});

const PORT = 3005;
server.listen(PORT, () => { console.log(`Server started in ${PORT}`); })