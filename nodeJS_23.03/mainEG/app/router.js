const controller = require('./controller.js');
const utils = require('./utils.js');
const animals = require('./model.js');
const fs = require('fs')
//{ Animal, animalsArray };

const router = async (req, res) => {

    switch (req.method) {
        case "GET":
            // strona views/index.html
            if (req.url == "/") {
                fs.readFile("./app/views/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                })
            }
            if (req.url == '/getall') {
                let daneZwierzat = await controller.getall()//funkcja 
                daneZwierzat = JSON.stringify(daneZwierzat)
                res.setHeader("Content-Type", "application/json")
                res.end(daneZwierzat)
            }
            break;
        case "POST":
            if (req.url == "/add") {
                let data = await utils(req)
                data = JSON.parse(data)
                console.log(data);
                //ekstraktowac date
                controller.add(data.name, data.color)
                console.log(animals.animalsArray)
            }
            else if (req.url == "/delete") {
                let data = await utils(req)
                data = JSON.parse(data)
                console.log(data);
                //ekstraktowac date
                controller.delete(data.id)
            }
            else if (req.url == "/update") {
                let data = await utils(req)
                data = JSON.parse(data)
                console.log(data);
                //ekstraktowac date
                controller.update(data.id)
            }
            break;

    }
}

module.exports = router