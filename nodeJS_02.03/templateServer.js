const http = require("http");
const PORT = 3000;
const server = http.createServer((req, res) => { //creates server
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});