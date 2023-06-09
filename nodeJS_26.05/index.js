const http = require('http');
const router = require("./app/router")
const { starter } = require('./app/tagsModel')
const tagsRouter = require('./app/tagsRouter')
const filtersRouter = require('./app/filtersRouter')
const usersRouter = require('./app/usersRouter')
const profilesRouter = require('./app/profilesRouter')
require('dotenv').config();

http
    .createServer(async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', '*');

        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }

        if (req.url.search("/api/photos") != -1) {
            await router(req, res)
        } else if (req.url.search('/api/tags') != -1) {
            await tagsRouter(req, res)
        } else if (req.url.search('/api/filters') != -1) {
            await filtersRouter(req, res)
        } else if (req.url.search('/api/getfile') != -1) {
            await filtersRouter(req, res)
        } else if (req.url.search("/api/user") != -1) {
            await usersRouter(req, res)
        } else if (req.url.search("/api/profile") != -1) {
            await profilesRouter(req, res)
        }
    })
    .listen(process.env.APP_PORT, () => { console.log(`listen on ${process.env.APP_PORT}`); starter() })

/*
* testuser01 -> album
* poki nie ma funkcjonalnosci uzytkownikow, to bazuje na jednym userze

* albumy beda tworzone w momencie utworzenia uzytkownika
*/