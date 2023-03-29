//zadanie 3
const http = require("http");
const PORT = 3000;
const server = http.createServer((req, res) => { //req.url to dowolny adres w oknie url
    console.log(`adres żądania: ${req.url}`)
    res.writeHead(200, { "content-type": "application/json" })
    require("colors");
    res.end('Wpisz adres /R, /G lub /B i zobacz konsole')
    if (req.url == '/R') {
        console.log("kolorowe".red)
    } else if (req.url == '/G') {
        console.log("kolorowe".green)
    } else if (req.url == '/B') {
        console.log("kolorowe".blue)
    }
})


//req.url -> url

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});