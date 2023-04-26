//router.js

const controller = require('./controller.js');
const utils = require('./utils.js');
const tasks = require('./taskmodel.js');
const fs = require('fs')
//{ Animal, animalsArray };



const router = async (req, res) => {

    // DELETE /api/photos/123456 usuniecie zdjecia o id = 123456
    // PATCH  /api/photos edycje danych zdjecia - dodanie jakiejstam funkcji XD
    if (req.url == '/api/photos' && req.method == 'GET') { // request all photos

    } else if (req.url == '/api/photos' && req.method == 'POST') { // add a new photo

    } else if (req.url.match(/\/api\/tasks\/([0-9]+)/g) && req.method == 'GET') { // get a single photo with given ID

    } else if (req.url.match(/\/api\/tasks\/([0-9]+)/g) && req.method == 'DELETE') { // delete a single photo with given ID

    } else if (req.url.match(/\/api\/tasks\/([0-9]+)/g) && req.method == 'PATCH') { //update a given photo with ID

    } else { // send an error with bad request

    }

    if (req.url == '/api/tasks' && req.method == "GET") {
        // DONE
        let allTasks = await controller.getall()//funkcja 
        allTasks = JSON.stringify(allTasks)
        res.setHeader("Content-Type", "application/json")
        res.end(allTasks)
    } else if (req.url.match(/\/api\/tasks\/([0-9]+)/g) && req.method == "GET") {
        //pobranie jednego wg id DONE
        const matches = req.url.matchAll(/\/api\/tasks\/([0-9]+)/g);
        let id = Array.from(matches)[0][1] //<-- kradnie
        let daneTasku = controller.getone(id)
        daneTasku = JSON.stringify(daneTasku)
        res.setHeader("Content-Type", "application/json")
        res.end(daneTasku)
    } else if (req.url == '/api/tasks' && req.method == "POST") {
        //utworzenie nowego taska
        let data = await utils(req)
        data = JSON.parse(data)
        console.log(data);
        controller.add(data.title, data.desription, data.status)
    } else if (req.url.match(/\/api\/tasks\/([0-9]+)/) && req.method == "DELETE") {
        //usuniecie jednego taska wg ig
        const matches = req.url.matchAll(/\/api\/tasks\/([0-9]+)/g);
        let id = Array.from(matches)[0][1] //<-- kradnie
        controller.delete(id)
    } else if (req.url == '/api/tasks' && req.method == 'PATCH') {
        //aktualizacja jednego taska wg id
        let data = await utils(req)
        data = JSON.parse(data)
        console.log(data);
        controller.update(data.id, data.title, data.desription, data.status)
        //controller.update(id, title, desription, status)
    } else {
        res.end(`HTTP/1.1 69 BAD REQUEST
        Connection: close
        Content-Length: 3`);
    }


    // switch (req.method) {
    //     case "GET":
    //         // strona views/index.html
    //         if (req.url == "/") {
    //             fs.readFile("./app/views/index.html", function (error, data) {
    //                 res.writeHead(200, { 'Content-Type': 'text/html' });
    //                 res.write(data);
    //                 res.end();
    //             })
    //         }
    //         if (req.url == '/getall') {
    //             let daneZwierzat = await controller.getall()//funkcja 
    //             daneZwierzat = JSON.stringify(daneZwierzat)
    //             res.setHeader("Content-Type", "application/json")
    //             res.end(daneZwierzat)
    //         }
    //         break;
    // case "POST":
    // if (req.url == "/add") {
    //     let data = await utils(req)
    //     data = JSON.parse(data)
    //     console.log(data);
    //     //ekstraktowac date
    //     controller.add(data.name, data.color)
    //     console.log(animals.animalsArray)
    // }
    // else if (req.url == "/delete") {
    //     let data = await utils(req)
    //     data = JSON.parse(data)
    //     console.log(data);
    //     //ekstraktowac date
    //     controller.delete(data.id)
    // }
    // else if (req.url == "/update") {
    //     let data = await utils(req)
    //     data = JSON.parse(data)
    //     console.log(data);
    //     //ekstraktowac date
    //     controller.update(data.id)
    // }
    //break;

}
//}

module.exports = router