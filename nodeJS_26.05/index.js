const http = require('http');
const router = require("./app/router")
const { starter } = require('./app/tagsModel')
const tagsRouter = require('./app/tagsRouter')
const filtersRouter = require('./app/filtersRouter')
require('dotenv').config();

http
    .createServer(async (req, res) => {
        if (req.url.search("/api/photos") != -1) {
            await router(req, res)
        } else if (req.url.search('/api/tags') != -1) {
            await tagsRouter(req, res)
        } else if (req.url.search('/api/filters') != -1) {
            await filtersRouter(req, res)
        } else if (req.url.search('/api/getfile') != -1) {
            await filtersRouter(req, res)
        }
    })
    .listen(process.env.APP_PORT, () => { console.log(`listen on ${process.env.APP_PORT}`); starter() })

/*
* testuser01 -> album
* poki nie ma funkcjonalnosci uzytkownikow, to bazuje na jednym userze

* albumy beda tworzone w momencie utworzenia uzytkownika
*/