const http = require('http');
const router = require("./app/router")

http
    .createServer(async (req, res) => {
        if (req.url.search("/api/photos") != -1) {
            await router(req, res)
        } else if (req.url.search('/api/photos') != -1) {
            await tagsRouter(req, res)
        }
    })
    .listen(3000, () => console.log("listen on 3000"))

/*
* testuser01 -> album
* poki nie ma funkcjonalnosci uzytkownikow, to bazuje na jednym userze

* albumy beda tworzone w momencie utworzenia uzytkownika
*/